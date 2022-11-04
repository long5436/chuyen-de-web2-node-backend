import Country from '~/app/models/country';

class countryRepository {
  constructor() {}

  async addCountries(data: Array<any>) {
    console.log(data);

    await Country.sync({
      force: true,
    });

    if (data.length > 0) {
      data.map(async (e) => {
        await Country.create({
          force: true,
          country_name: e.name,
        });
      });
    }
  }
}

export default new countryRepository();
