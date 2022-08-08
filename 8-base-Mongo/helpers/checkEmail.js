import { USERS } from "../data/usersDB.js"

export default function checkEmail(email, password) {
  const user = USERS.find((user) => user.email === email)
  if(!user) throw new Error(404)
  if(user.password !== password) throw new Error(401)
  return user
}