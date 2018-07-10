module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/g-flow',
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-g-flow',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
}