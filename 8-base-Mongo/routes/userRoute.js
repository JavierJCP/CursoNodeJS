import { Router } from 'express'
import userModel from '../schemas/user-schema.js'

const usersRoute = Router()
//**Api de usuarios */
//get
usersRoute.get("/:_id", async (req, res) => {
  const { _id } = req.params
  const user = await userModel.findById(_id).exec()
  if(!user) return res.sendStatus(404)
  return res.send(user)
})
//post
usersRoute.post("/", async (req, res) => {
  const { _id, name } = req.body
  if(!_id || !name) return res.sendStatus(400)

  const user = await userModel.findById(_id).exec()
  if(user) return res.sendStatus(409)

  const newUser = new userModel({_id, name})
  await newUser.save();
 
  return res.send()
})
//put
usersRoute.put("/:_id", async (req, res) =>{
  const { _id } = req.params
  const { name } = req.body
  if(!name) return res.sendStatus(400)

  const user = await userModel.findById(_id).exec()

  if(!user) return res.sendStatus(404)
  user.name = name
  await user.save()
  return res.send()
})
//delete
usersRoute.delete("/:_id", async (req, res) => {
  const { _id } = req.params
  
  const user = await userModel.findById(_id).exec()

  if(!user) return res.sendStatus(404)
  
  await user.remove()
  await user.save()
  return res.send()
})

export default usersRoute