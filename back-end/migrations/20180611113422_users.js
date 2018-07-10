exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments().primary()
        table.text('user_name')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users')
}
