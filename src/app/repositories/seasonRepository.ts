import Season from '~/app/models/seasons';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class seasonRepository {
  constructor() {}

  async addSeason(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Season.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        // await Country.create({
        //   force: true,
        //   country_name: e.name,
        //   image_url: e.flag,
        // });
        await Season.create({
          // force: true,
          id_season: e.id,
          season_name: e.name,
          league_id: e.league_id,
        });

        // console.log(e.name);
      });
    }
  }
  async getSeason(page: number) {
    console.log((page - 1) * 20);

    const data = await Season.findAndCountAll({
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

  // async getSeason() {
  //   const data = await Country.findAndCountAll();
  //   return data;
  // }
}

export default new seasonRepository();
