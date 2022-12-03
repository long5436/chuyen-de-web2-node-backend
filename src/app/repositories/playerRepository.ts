import Player from '~/app/models/player';
import { SportmonksApi } from '~/app/services';
import Utils from '../utils';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class playerRepository {
  constructor() {}

  async addPlayers(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Player.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        await Player.create({
          player_id: e?.player_id,
          team_id: e?.team_id,
          country_id: e?.country_id,
          common_name: e?.common_name,
          display_name: e?.display_name,
          birthdate: e?.birthdate,
          birthcountry: e?.birthcountry,
          image_path: e?.image_path,
        });
      });
    }
  }

  async getPlayer(id: number) {
    try {
      const data = await Player.findOne({ where: { player_id: id } });
      return data;
    } catch (error) {
      return null;
    }
  }

  async handleGetPlayers(arrIds: number[]) {
    const resultArr: number[] = []; //tra ve id chua co trong databse
    const promies = arrIds.map(async (e: number) => {
      const pr: any = await this.getPlayer(e);

      if (!pr) {
        resultArr.push(e);
      }
    });

    await Promise.all(promies);
    return resultArr;
  }

  async getAndSaveAllPlayer(arrIds: number[]) {
    const imgUrl: string[] = [];
    const playerData: any[] = [];
    const promise = arrIds.map(async (e: number) => {
      const data = await SportmonksApi.getPlayer(e.toString());
      const temp: string = data?.image_path.split('/');
      const imgname = temp[temp.length - 1];
      playerData.push({ ...data, image_path: Utils.getImageUrl(imgname, data.image_path, imgUrl) });
    });

    await Promise.all(promise);
    await Utils.saveAllFile(imgUrl);

    return playerData;
  }

  // async getCountries(page: number) {
  //   console.log((page - 1) * 20);

  //   const data = await Country.findAndCountAll({
  //     offset: (page - 1) * 20,
  //     limit: 20,
  //   });

  //   const resp: DataResponse = {
  //     totalPage: Math.ceil(data.count / 20),
  //     currentPage: page,
  //     data: data.rows,
  //   };

  //   return resp;
  // }

  //   async getAllCountries() {
  //     const data = await Country.findAndCountAll();
  //     return data;
  //   }
}

export default new playerRepository();
