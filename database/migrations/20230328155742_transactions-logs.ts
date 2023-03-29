import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (database) => {
    database.uuid('id').primary()
    database.text('title').notNullable()
    database.decimal('amount', 10, 2).notNullable()
    database.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}