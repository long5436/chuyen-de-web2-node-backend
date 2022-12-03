import Team from '~/app/models/team';
import { SportmonksApi } from '~/app/services';
import Utils from '../utils';

type DataResponse = {
  data: Array<Object>;
  totalPage: number;
  currentPage: number;
};

class TeamRepository {
  constructor() {}

  async addTeams(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Team.sync({
      // force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        await Team.create({
          team_id: e?.id,
          legacy_id: e?.legacy_id,
          name: e?.name,
          country_id: e?.country_id,
          logo_path: e?.logo_path,
        });
      });
    }
  }

  async getTeam(id: number) {
    try {
      const data = await Team.findOne({ where: { team_id: id } });
      return data;
    } catch (error) {
      return null;
    }
  }

  async handleGetTeams(arrIds: number[]) {
    const resultArr: number[] = []; //tra ve id chua co trong databse
    const promies = arrIds.map(async (e: number) => {
      const pr: any = await this.getTeam(e);
      console.log({ pr });

      if (!pr) {
        resultArr.push(e);
      }
    });

    await Promise.all(promies);
    return resultArr;
  }

  async getAndSaveAllTeam(arrIds: number[]) {
    const imgUrl: string[] = [];
    const TeamData: any[] = [];
    const promise = arrIds.map(async (e: number) => {
      const data = await SportmonksApi.getTeam(e);
      const temp: string = data?.logo_path.split('/');
      const imgname = temp[temp.length - 1];
      TeamData.push({ ...data, logo_path: Utils.getImageUrl(imgname, data.logo_path, imgUrl) });
    });

    await Promise.all(promise);
    await Utils.saveAllFile(imgUrl);

    return TeamData;
  }

  async getTeams(ids: any[]) {
    const result: any[] = [];

    const promise = ids.map(async (item: any) => {
      const data = await this.getTeam(item?.Team_id);
      result.push({ ...item, Team: data });
    });

    await Promise.all(promise);
    return result;
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

export default new TeamRepository();
