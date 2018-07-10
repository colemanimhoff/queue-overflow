exports.up = function (knex, Promise) {
    return knex.schema.createTable('tag_problem', (table) => {
        table.increments().primary()
        table.integer('problem_id')
            .notNullable()
            .references('id')
            .inTable('problem')
            .onDelete('CASCADE')
            .index()
        table.integer('tag_id')
            .notNullable()
            .references('id')
            .inTable('tag')
            .onDelete('CASCADE')
            .index()
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tag_problem')
}