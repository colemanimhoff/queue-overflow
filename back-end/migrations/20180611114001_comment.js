exports.up = (knex, Promise) => {
    return knex.schema.createTable('comment', (table) => {
        table.increments().primary()
        table.integer('problem_id')
            .notNullable()
            .references('id')
            .inTable('problem')
            .onDelete('CASCADE')
            .index()
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index()
        table.date('date')
        table.text('comment_text')
        table.integer('points')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('comment')
}