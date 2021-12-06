/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/createUser', 'UsersController.createUser')
Route.delete('/deleteUser/:matricula', 'UsersController.removeUser')
Route.put('/updateUser/:matricula', 'UsersController.updateUser')
Route.get('/getSalas/:matricula', 'UsersController.getSalas')
Route.get('/getUser/:matricula', 'UsersController.getUser')


Route.get('/getSala/:numero', 'SalasController.getSala')
Route.post('/createSala', 'SalasController.createSala')
Route.delete('/deleteSala/:numero', 'SalasController.deleteSala')
Route.put('/updateSala', 'SalasController.updateSala')
Route.post('/addAluno/:sala', 'SalasController.addAluno')
Route.delete('/removeAluno/:sala', 'SalasController.removeAluno')
Route.get('/getAlunos/:sala', 'SalasController.alunosSala')
