import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SalaAlunos extends BaseSchema {
  protected tableName = 'sala_alunos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('matricula_aluno').unsigned().references('users.matricula')
      table.integer('numero_sala').unsigned().references('salas.numero')
      table.unique(['matricula_aluno', 'numero_sala'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
