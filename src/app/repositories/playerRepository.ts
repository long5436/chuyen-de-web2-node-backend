import Country from '~/app/models/country';
import Player from '../models/player';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class playerRepository {
  constructor() {}

  // async addCountries(data: Array<any>, force?: boolean) {
  //   // console.log(data);

  //   await Country.sync({
  //     // force: true,
  //   });

  //   if (data.length > 0) {
  //     data.map(async (e) => {
  //       // await Country.create({
  //       //   force: true,
  //       //   country_name: e.name,
  //       //   image_url: e.flag,
  //       // });
  //       await Country.create({
  //         // force: true,
  //         id_country: e.id,
  //         country_name: e.name,
  //         image_url: e.image_path ? e.image_path : '',
  //       });

  //       // console.log(e.name);
  //     });
  //   }
  // }
  async getplayer(page: number) {
    console.log((page - 1) * 20);

    const data = await Player.findAndCountAll({
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

  async getAllPlayer() {
    const data = await Player.findAndCountAll();
    return data;
  }
}

export default new playerRepository();
