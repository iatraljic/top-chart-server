const response = {
  module: 'tracks',
  status: 200,
  data: {}
};

class TracksDAO {
  constructor(db) {
    this.db = db;
  }

  getAll(callback) {
    response.data = this.db;
    callback(response);
  }

  getByID(id, callback) {
    let resData = {};

    for (let i = 0; i < this.db.tracks.data.length; i++) {
      const el = this.db.tracks.data[i];
      console.log(el.id, id);

      if (String(el.id) === id) {
        resData = el;
        break;
      }
    }

    response.data = resData;
    callback(response);
  }

  getSorted(sortBy, callback) {
    let resData = { sortBy };

    response.data = resData;
    callback(response);
  }
}

module.exports = TracksDAO;
