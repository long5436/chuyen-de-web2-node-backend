import Country from '~/app/models/country';

class countryRepository {
  constructor() {}

  async addCountries(data: Array<any>, force?: boolean) {
    // console.log(data);

    await Country.sync({
      force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        // await Country.create({
        //   force: true,
        //   country_name: e.name,
        //   image_url: e.flag,
        // });
        await Country.create({
          // force: true,
          id_country: e.id,
          country_name: e.name,
          image_url: e.image_path ? e.image_path : '',
        });

        // console.log(e.name);
      });
    }
  }
  async getCountries() {
    const data = await Country.findAndCountAll({});

    return data;
  }
}

export default new countryRepository();
