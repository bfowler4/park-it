const config = require(`../config`).database;

module.exports = {

  development: {
    client: `pg`,
    connection: {
      host: `127.0.0.1`,
      user: config.user,
      password: config.password,
      database: config.database,
      charset: `utf8`
    },
    migrations: {
      directory: __dirname + `/db/migrations`
    },
    seeds: {
      directory: __dirname + `/db/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
