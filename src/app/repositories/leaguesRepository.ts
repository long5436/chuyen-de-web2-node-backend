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
        const { name, country_slug, slug, image } = e;

        await Leagues.create({
          name,
          country_slug,
          slug,
          image,
        });
      });
    }
  }

  async getLeagues(page: number) {
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

  async getLeague(slug: string) {
    const data = await Leagues.findAndCountAll({ where: { country_slug: slug } });
    return data;
  }
}

export default new LeaguesRepository();
