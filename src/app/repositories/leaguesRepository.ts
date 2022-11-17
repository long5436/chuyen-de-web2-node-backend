import Leagues from '~/app/models/leagues';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class LeaguesRepository {
  constructor() {}

  async addLeagues(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Leagues.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        await Leagues.create({
          // force: true,
          id_leagues: e.id,
          id_country: e.country_id,
          leagues_name: e.name,
          image_url: e.logo_path,
          current_season_id: e.current_season_id,
          current_round_id: e.current_round_id,
          current_stage_id: e.current_stage_id,
        });
      });
    }
  }
  async getLeagues(page: number) {
    console.log((page - 1) * 20);

    const data = await Leagues.findAndCountAll({
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
}

export default new LeaguesRepository();
