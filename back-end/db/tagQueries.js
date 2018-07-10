const knex = require('../db/database-connection')

module.exports = {
    list() {
        return knex('tag')
    },
    read(id) {
        return knex('tag').where('id', id).first()
    },
    create(tag) {
        return knex('tag').insert(tag, '*')
    },
    update(id, tag) {
        return knex('tag').where('id', id).update(tag, '*')
    },
    delete(id) {
        return knex('tag').where('id', id).del()
    },
}