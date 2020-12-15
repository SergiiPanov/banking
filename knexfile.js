module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "serg",
      user: "sergii",
      password: 59095909,
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: "./seeds",
      loadExtensions: [".js"],
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: "./seeds",
      loadExtensions: [".js"],
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
  },
};
