import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import Sala from './../../Models/Sala'

export default class SalasController {


    public async getSala({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('numero')
        try{
            const sala =  await Sala.findOrFail(numeroSala)
            response.status(200).send(sala)

        }catch(err){
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar o usuario'
            })
        }
    }  

    public async createSala({request, response}: HttpContextContract)
    {
        const data = request.only(['matricula_professor', 'capacidade_alunos', 'disponibilidade'])
        try{
            const retorno = Sala.create(data)

            response.status(200).send(retorno)

        }catch(err){
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar a sala'
            })
        }
    }

    public async deleteSala({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('numero')
        try{
            const sala =  await Sala.findOrFail(numeroSala)
            sala.delete()

            response.status(200).send({
                'status': 'sucesso',
                'msg': 'A sala foi deletada com sucesso'
            })

        }catch(err){
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar a sala'
            })
        }
    }

    public async updateSala({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('numero')
        const data = request.only(['matricula_professor', 'capacidade_alunos', 'disponibilidade'])
        try{

            const sala =  await Sala.findOrFail(numeroSala)

            if( sala.MatriculaProfessor != data.matricula_professor){
                response.status(400).send({
                    'status': 'erro',
                    'msg': 'O professor a alterar uma sala deve ser o mesmo que a cadastrou'
                })
            }
            sala.capacidade_alunos = data.capacidade_alunos
            sala.disponibilidade = data.disponibilidade

            response.status(200).send({
                'status': 'sucesso',
                'msg': 'O Usuário foi excluido com sucesso'
            })

            
            
        }catch(err){
            console.log(err)
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar o usuario'
            })
        }
    }

    public async addAluno({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('sala')
        const { matricula_professor, matricula_aluno} = request.body()
        try{
            const sala =  await Sala.findOrFail(numeroSala)

            if( !sala.disponibilidade ){
                response.status(400).send({
                    'status': 'erro',
                    'msg': 'Essa sala não está dispónivel para cadastrar alunos'
                })
            }

            if( sala.MatriculaProfessor != matricula_professor){
                response.status(400).send({
                    'status': 'erro',
                    'msg': 'O professor a inserir uma aluno na sala deve ser o mesmo que a cadastrou'
                })
            }

            const alunos = await sala.related('alunos').query()

            if(alunos.length >= sala.capacidade_alunos){
                response.status(400).send({
                    'status': 'erro',
                    'msg': 'Impossivel adicionar a sala já está cheia'
                })
            }

            alunos.forEach( (aluno) =>{
                if(aluno.matricula == matricula_aluno){
                    response.status(400).send({
                        'status': 'erro',
                        'msg': 'Esse Aluno já foi matriculado na sala'
                    }) 
                }
            })

            await sala.related('alunos').attach([matricula_aluno])

        }catch(err){
            console.log(err)
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar a sala'
            })
        }
    }

    public async removeAluno({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('sala')
        const { matricula_aluno} = request.body()
        try{
            const sala =  await Sala.findOrFail(numeroSala)

            const alunos = await sala.related('alunos').query()

            alunos.forEach( (aluno) =>{
                if(aluno.matricula == matricula_aluno){
                    response.status(400).send({
                        'status': 'erro',
                        'msg': 'Esse Aluno não pertence a essa sala'
                    }) 
                }
            })

            await sala.related('alunos').detach([matricula_aluno])

            response.status(200).send({
                'status': 'sucesso',
                'msg': 'O aluno foi removido com sucesso'
            }) 

        }catch(err){
            console.log(err)
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar a sala'
            })
        }
    }

    public async alunosSala({request, response}: HttpContextContract)
    {
        const numeroSala = request.param('sala')
        try{
            const sala =  await Sala.findOrFail(numeroSala)

            const alunos = await sala.related('alunos').query()
            
            response.status(200).send(alunos)

        }catch(err){
            console.log(err)
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar a sala'
            })
        }
    }


}
