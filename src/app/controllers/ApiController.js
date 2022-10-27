import axios from 'axios';
import Country from '~/app/models/country';

class ApiController {
  async index(req, res, next) {
    // const url =
    //   'https://prod-public-api.livescore.com/v1/api/app/date/soccer/20221008/7?MD=1';

    // try {
    //   const resp = await axios.get(url);

    //   const data = resp.data.Stages;

    //   const arr = data.map((e) => {
    //     // console.log(e);
    //     return {
    //       tournaments: e.CompN,
    //       contry: e.CompST,
    //       events: e.Events.map((e) => {
    //         return {
    //           evenStartDate: e.Esd,
    //           footballTeam: {
    //             t1: e.T1[0].Nm,
    //             t2: e.T2[0].Nm,
    //           },
    //         };
    //       }),
    //     };
    //   });

    const url = 'https://www.livescore.com/api/leftmenu/soccer';

    try {
      const resp = await axios(url);

      await Country.sync({
        force: true,
      });

      resp.data.map(async (e) => {
        await Country.create({
          force: true,
          country_name: e[1],
        });
      });

      res.json({
        data: resp.data.map((e) => e[1]),
      });
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
