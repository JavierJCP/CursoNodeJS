import express from 'express';
import { USERS } from '../bdjson.js';

const cuentaRouter = express.Router();

//*Middleware*//
cuentaRouter.use((req, res, next) => {
  console.log(req.ip);
  next()
})

//**Api de una cuenta**//
//obtener los datos de una cuenta
cuentaRouter.get('/:guid', (req,res) => {
  const { guid } = req.params;
  const user = USERS.find((user) => user.guid === guid)
  if(!user) return res.status(404).send();
  return res.send(user);
})
//crear una nueva cuenta
cuentaRouter.post('/', (req,res) => {
  const {guid, name} = req.body;
  if(!guid || !name) return res.status(400).send();
  const user = USERS.find((user) => user.guid === guid)
  if(user) return res.status(409).send();

  USERS.push({
    guid,
    name,
  })

  return res.send();
})
//actualizar el nombre de una cuenta
cuentaRouter.put('/:guid', (req,res) => {
  const {guid} = req.params;
  const {name} = req.body;
  const user = USERS.find((user) => user.guid === guid);
  if(!name) return res.status(400).send();
  user.name = name;
  return res.send();
})
//eliminar una cuenta
cuentaRouter.delete('/:guid', (req,res) => {
  const { guid } = req.params;
  const userIndex = USERS.findIndex((user) => user.guid === guid);
  if(userIndex === -1) return res.status(404).send()

  USERS.splice(userIndex, 1);
  return res.send()
})

export default cuentaRouter;