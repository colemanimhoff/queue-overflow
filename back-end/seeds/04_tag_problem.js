const tagProblems = require('../lib/tag_problem')
exports.seed = (knex, Promise) => {

  return knex('tag_problem').del()
    .then(() => {
      return knex('tag_problem').insert(tagProblems)
    })
  //future implementation -  alter sequence
  // .then(() => knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 4;'))
}

