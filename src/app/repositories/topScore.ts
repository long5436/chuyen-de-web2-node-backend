import teamRepository from './teamRepository';
import playerRepository from './playerRepository';

class TopScoreRepository {
  constructor() {}

  async getPlayers(ids: any[]) {
    const result: any[] = [];

    const promise = ids.map(async (item: any) => {
      const data = await playerRepository.getPlayer(item?.player_id);
      const dataTeam = await teamRepository.getTeam(item?.team_id);
      result.push({ ...item, player: data, team: dataTeam });
    });

    await Promise.all(promise);
    return result;
  }
}

export default new TopScoreRepository();
