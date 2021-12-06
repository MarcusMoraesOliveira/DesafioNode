
import { BaseModel, BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import User from "./User"

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public numero: number

  @column()
  public MatriculaProfessor: number;

  @column()
  public capacidade_alunos: number;

  @column()
  public disponibilidade: boolean;

  @belongsTo(() => User)
  public professor: BelongsTo<typeof User>

  @manyToMany(() => User, {
    localKey: 'numero',
    pivotForeignKey: 'numero_sala',
    relatedKey: 'matricula',
    pivotRelatedForeignKey: 'matricula_aluno',
    pivotTable: 'sala_alunos'
  })
  public alunos: ManyToMany<typeof User>
}
