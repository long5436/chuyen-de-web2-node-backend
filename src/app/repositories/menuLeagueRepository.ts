import MenuLeague from '~/app/models/menuLeague';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class MenuLeagueRepository {
  constructor() {}

  async addMenuLeague(data: Array<any>, force?: boolean) {
    // console.log(data);

    await MenuLeague.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        await MenuLeague.create({
          name: e.name,
          image: e.image ? e.image : '',
          slug: e.slug,
        });
      });
    }
  }
  async getMenuLeague(page: number) {
    console.log((page - 1) * 20);

    const data = await MenuLeague.findAndCountAll({
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

  async getAllMenuLeague() {
    const data = await MenuLeague.findAndCountAll();
    return data;
  }
}

export default new MenuLeagueRepository();
