const knex = require('../db/database-connection')

module.exports = {
    list() {
        return knex('comment')
    },
    read(id) {
        return knex('comment').where('id', id).first()
    },
    create(comment) {
        return knex('comment').insert(comment, '*')
    },
    update(id, comment) {
        return knex('comment').where('id', id).update(comment, '*')
    },
    delete(id) {
        return knex('comment').where('id', id).del()
    },
}