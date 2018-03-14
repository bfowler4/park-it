const bookshelf = require(`./bookshelf`);

class Space extends bookshelf.Model {
  get tableName() { return `spaces`; }
  get hasTimestamps() { return false; }

  user() {
    return this.belongsTo(`User`);
  }

  address() {
    return this.belongsTo(`Address`);
  }
}

module.exports = bookshelf.model(`Space`, Space);