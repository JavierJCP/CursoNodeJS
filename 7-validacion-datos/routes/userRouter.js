import { Router } from 'express'
import { USERS } from '../data/userDB.js'

const userRouter = Router()
//**Api de usuarios */
//get
userRouter.get("/:_id", (req, res) => {
  const { _id } = req.params
  const user = USERS.find((user) => user._id === _id)
  if(!user) return res.sendStatus(404)
  return res.send(user)
})
//post
userRouter.post("/", (req, res) => {
  const { _id, name } = req.body
  if(!_id || !name) return res.sendStatus(400)
  const user = USERS.find((user) => user._id === _id)
  if(user) return res.sendStatus(409)
  USERS.push({
    _id,
    name,
  })
  return res.send()
})
//put
userRouter.put("/:_id", (req, res) => {
  const { _id } = req.params
  const { name } = req.body
  if(!name) return res.sendStatus(400)
  const user = USERS.find((user) => user._id === _id)
  if(!user) return res.sendStatus(404)
  user.name = name
  return res.send()
})
//delete
userRouter.delete("/:_id", (req, res) => {
  const { _id } = req.params
  const userIndex = USERS.findIndex((user) => user._id === _id)
  if(userIndex === -1) return res.sendStatus(404)
  USERS.splice(userIndex, 1)
  return res.send()
})
export default userRouter