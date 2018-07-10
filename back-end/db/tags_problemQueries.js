const knex = require('../db/database-connection')

module.exports = {
    list() {
        return knex('tag_problem')
    },
    read(id) {
        return knex('tag_problem').where('id', id).first()
    },
    create(tag_problem) {
        return knex('tag_problem').insert(tag_problem, '*')
    },
    update(id, tag_problem) {
        return knex('tag_problem').where('id', id).update(tag_problem, '*')
    },
    delete(id) {
        return knex('tag_problem').where('id', id).del()
    },
}