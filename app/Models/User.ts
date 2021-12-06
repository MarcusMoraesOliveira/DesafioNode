
import { BaseModel, column, hasOne,
  HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import Sala from './Sala'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public matricula: number

  @column()
  public nome: string;

  @column()
  public email: string;

  @column()
  public data_nascimento: Date;

  @column()
  public tipo_usuario: string;

  @hasOne(() => Sala)
  public criado: HasOne<typeof Sala>

  @manyToMany(() => Sala, {
    localKey: 'matricula',
    pivotForeignKey: 'matricula_aluno',
    relatedKey: 'numero',
    pivotRelatedForeignKey: 'numero_sala',
    pivotTable: 'sala_alunos'
  })
  public inscritos: ManyToMany<typeof Sala>
}

