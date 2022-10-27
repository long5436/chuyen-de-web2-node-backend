import axios from 'axios';
// import Country from '~/app/models/country';
import { CountriesRepository } from '~/app/repositories';

class ApiController {
  async index(req, res, next) {
    const url = 'https://www.livescore.com/api/leftmenu/soccer';

    try {
      const resp = await axios(url);

      CountriesRepository.addCountries(resp.data);
    } catch (error) {
      res.send(error);
    }
  }

  async test(req, res, next) {
    const data = await Country.findAndCountAll({
      offset: 10,
      limit: 5,
    });

    res.send({ data });
  }

  async test2(req, res, next) {
    const url =
      'https://prod-public-api.livescore.com/v1/api/app/date/soccer/20221026/7?MD=1';
    const data = await axios.get(url);

    const result = data.data.Stages.map((item) => {
      return {
        groupStage: item.Snm,
        company: item.CompN,
        Events: {
          startData: item.Events[0].Esd,
          club1: item.Events[0].T1,
          club2: item.Events[0].T2,
        },
      };
    });

    res.json({ data: result });
  }
}

export default new ApiController();
