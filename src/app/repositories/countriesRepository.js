import Country from '~/app/models/country';

class countryRepository {
  constructor() {}

  async addCountries(data) {
    console.log(data);

    await Country.sync({
      force: true,
    });

    data.map(async (e) => {
      await Country.create({
        force: true,
        country_name: e[1],
      });
    });
  }
}

export default new countryRepository();
