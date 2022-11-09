class Utils {
  convertDataSequelize(data: Object) {
    return {
      count: data.count,
      rows: data.rows.map((items) => items.toJSON()),
    };
  }
}

export default new Utils();
