module.exports = {
  serverPort: process.env.API_PORT,

  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,

  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgPort: process.env.PGPORT,
}
