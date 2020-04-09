const response = {
  module: 'tracks',
  status: 200,
  data: {}
};

class TracksDAO {
  constructor(db) {
    this.db = db;
  }

  // --------------------------------------------------------------------------
  // ----- getAll
  // -----
  // --------------------------------------------------------------------------
  getAll(callback) {
    response.data = this.db.tracks.data;
    callback(response);
  }

  // --------------------------------------------------------------------------
  // ----- getByID
  // -----
  // --------------------------------------------------------------------------
  getByID(id, callback) {
    let resData = {};

    for (let i = 0; i < this.db.tracks.data.length; i++) {
      const el = this.db.tracks.data[i];

      if (String(el.id) === id) {
        resData = el;
        break;
      }
    }

    response.data = resData;
    callback(response);
  }

  // --------------------------------------------------------------------------
  // ----- getSorted
  // -----
  // --------------------------------------------------------------------------
  getSorted(sortBy, callback) {
    const resData = this.db.tracks.data;

    if (sortBy === 'name') {
      resData.sort((a, b) => {
        // Case insensitive
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === 'duration') {
      resData.sort((a, b) => {
        const durationA = a.duration;
        const durationB = b.duration;

        if (durationA < durationB) {
          return -1;
        } else if (durationA > durationB) {
          return 1;
        }
        return 0;
      });
    }

    response.data = resData;
    callback(response);
  }
}

module.exports = TracksDAO;
