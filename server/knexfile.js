module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/db.sqlite`
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'example'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

}
