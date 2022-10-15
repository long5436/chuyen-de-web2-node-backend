import User from '~/app/models/User';
import axios from 'axios';

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

    const url = 'https://www.livescore.com/api/leftmenu/soccer/vietnam';

    try {
      const resp = await axios(url);

      res.json({
        data: resp.data,
      });
    } catch (error) {
      res.send(error);
    }
  }
}

export default new ApiController();
