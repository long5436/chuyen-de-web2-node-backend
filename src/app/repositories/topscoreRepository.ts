import Season from '~/app/models/seasons';
import Player from '../models/player';
import Topscore from '../models/topscore';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class seasonRepository {
  constructor() {}

  async addTopscore(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Topscore.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        // await Country.create({
        //   force: true,
        //   country_name: e.name,
        //   image_url: e.flag,
        // });
        await Topscore.create({
          // force: true,
          id_season: e.season_id,
          id_player: e.player_id,
          id_team: e.team_id,
          id_stage: e.stage_id,
          goals: e.goals,
          penalty_goals: e.penalty_goals,
        });

        // console.log(e.name);
      });
    }
  }
  async getTopscore(page: number) {
    console.log((page - 1) * 20);

    const data = await Topscore.findAndCountAll({
      offset: (page - 1) * 20,
      limit: 20,
    });

    const resp: DataResponse = {
      totalPage: Math.ceil(data.count / 20),
      currentPage: page,
      data: data.rows,
    };

    return resp;
  }

  async getAllplayer() {
    const data = await Topscore.findAndCountAll();
    return data;
  }
}

export default new seasonRepository();
