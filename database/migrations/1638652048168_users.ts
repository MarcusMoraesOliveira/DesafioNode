import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('matricula')
      table.string('nome', 120).notNullable()
      table.string('email', 80).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('tipo_usuario', 2).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
