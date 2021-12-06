import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('numero')
      table.integer('matricula_professor').unsigned().references('users.matricula').onDelete('cascade').notNullable()
      table.integer('capacidade_alunos').unsigned().notNullable()
      table.boolean('disponibilidade').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
