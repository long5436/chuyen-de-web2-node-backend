import teamRepository from './teamRepository';
import playerRepository from './playerRepository';
import Utils from '../utils';

class TopScoreRepository {
  constructor() {}

  async getPlayers(ids: any[]) {
    const result: any[] = [];
    const imgUrl: string[] = [];

    const promise = ids.map(async (item: any) => {
      let temp: string[] = [];
      let imgname: string = '';
      if (item?.image_path) {
        temp = item?.image_path?.split('/');
        imgname = temp[temp.length - 1];
      }
      const data = await playerRepository.getPlayer(item?.player_id);
      const dataTeam = await teamRepository.getTeam(item?.team_id);
      result.push({
        ...item,
        image_path: item?.image_path ? Utils.getImageUrl(imgname, item.image_path, imgUrl) : null,
        player: data,
        team: dataTeam,
      });
    });

    await Promise.all(promise);
    await Utils.saveAllFile(imgUrl);
    return result;
  }
}

export default new TopScoreRepository();
