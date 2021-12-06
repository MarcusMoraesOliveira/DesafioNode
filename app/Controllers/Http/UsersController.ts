 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import  User  from './../../Models/User'

export default class UsersController {


    public async getUser({request, response}: HttpContextContract)
    {
        const matriculaAluno = request.param('matricula')
        try{
            const user =  await User.findOrFail(matriculaAluno)
            response.status(200).send(user)

        }catch(err){
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar o usuario'
            })
        }
    }  

    public async createUser({request, response}: HttpContextContract)
    {
        const data = request.only(['nome', 'email', 'data_nascimento', 'tipo_usuario'])
        try{
            data.data_nascimento = Date.parse(data.data_nascimento)
            const retorno = User.create(data)

            response.status(200).send(retorno)

        }catch(err){
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar o usuario'
            })
        }
    }  

    public async removeUser({request, response}: HttpContextContract)
    {
        const matriculaAluno = request.param('matricula')
        try{

            const user =  await User.findOrFail(matriculaAluno)
            user.delete()

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

    public async updateUser({request, response}: HttpContextContract)
    {
        const matriculaAluno = request.param('matricula')
        const data = request.only(['nome', 'email', 'data_nascimento', 'tipo_usuario'])
        try{

            const user =  await User.findOrFail(matriculaAluno)
            user.nome = data.nome
            user.email = data.email
            user.data_nascimento = new Date(Date.parse(data.data_nascimento))
            user.tipo_usuario = data.tipo_usuario

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


    public async getSalas({request, response}: HttpContextContract)
    {
        const matriculaAluno = request.param('matricula')
        try{

            const user =  await User.findOrFail(matriculaAluno)
            const salas = await user.related('inscritos').query().select('matricula_professor', 'numero')

            const resposta : object = {}
            resposta['aluno'] = user.nome
            resposta['salas'] = salas

            response.status(200).send(resposta)

        }catch(err){
            console.log(err)
            response.status(500).send({
                'status': 'erro',
                'msg': 'ocorreu um erro no servidor impossibilitando de cadastrar o usuario'
            })
        }
    }

}
