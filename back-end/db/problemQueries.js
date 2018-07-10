const knex = require('../db/database-connection')

module.exports = {
    list() {
        return knex('problem')
    },
    read(id) {
        return knex('problem').where('id', id).first()
    },
    create(problem) {
        return knex('problem').insert(problem, '*')
    },
    update(id, problem) {
        return knex('problem').where('id', id).update(problem, '*')
    },
    delete(id) {
        return knex('problem').where('id', id).del()
    },
}