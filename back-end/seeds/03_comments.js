const comments = require('../lib/comments')
exports.seed = (knex, Promise) => {

  return knex('comment').del()
    .then(() => {
      return knex('comment').insert(comments)
    })
  //future implementation -  alter sequence
  // .then(() => knex.raw('DELETE FROM "user"; ALTER SEQUENCE comment_id_seq RESTART WITH 2;'))
}
