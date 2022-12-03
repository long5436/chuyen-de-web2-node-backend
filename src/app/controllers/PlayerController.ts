import { Request, Response, NextFunction } from 'express';
import { SportmonksApi } from '~/app/services';
import { PlayerRepository, TeamRepository, TopScoreRepository } from '../repositories';
import utils from '../utils';

class PlayerController {
  async top(req: Request, res: Response, next: NextFunction) {
    const seasonId: string = req.params?.season ? req.params.season : '';

    const idsPlyer: number[] = [];
    const idsteam: number[] = [];
    const resData = await SportmonksApi.getTopscore(seasonId);
    const data = resData.goalscorers.data.splice(0, 10);
    data.map(async (item: any) => {
      idsPlyer.push(item.player_id);
      idsteam.push(item.team_id);
    });

    const resultId = await PlayerRepository.handleGetPlayers(idsPlyer);
    const playerData = await PlayerRepository.getAndSaveAllPlayer(resultId);
    await PlayerRepository.addPlayers(playerData);

    const resultIdTeam = await TeamRepository.handleGetTeams(idsteam);
    const teamData = await TeamRepository.getAndSaveAllTeam(resultIdTeam);
    await TeamRepository.addTeams(teamData);

    const resultData = await TopScoreRepository.getPlayers(data);

    // const data = await SportmonksApi.getTeam(180);

    res.send({ data: resultData });
  }

  async player(req: Request, res: Response, next: NextFunction) {
    const playerId: string = req.params?.id ? req.params.id : '';

    const idsPlyer: number[] = [];
    const idsteam: number[] = [];
    const resData = await SportmonksApi.getPlayer(playerId);
    const data = [resData];
    data.map(async (item: any) => {
      idsPlyer.push(item.player_id);
      idsteam.push(item.team_id);
    });

    const resultId = await PlayerRepository.handleGetPlayers(idsPlyer);
    const playerData = await PlayerRepository.getAndSaveAllPlayer(resultId);
    await PlayerRepository.addPlayers(playerData);

    const resultIdTeam = await TeamRepository.handleGetTeams(idsteam);
    const teamData = await TeamRepository.getAndSaveAllTeam(resultIdTeam);
    await TeamRepository.addTeams(teamData);

    const resultData = await TopScoreRepository.getPlayers(data);

    // const data = await SportmonksApi.getTeam(180);

    res.send({ data: resultData });
  }
}

export default new PlayerController();
