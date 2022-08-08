// const operaciones = require('./operaciones');
// const usurario = require('./user.json')

// const user = require('jsonwebtoken')

// console.log(operaciones)
// console.log(usurario)
// console.log(user)

import { suma } from './operaciones.js'  //con modulo type module (import ) es nesario poner la extension
//**importamos desde el export defautl */
import jose from './operaciones.js' //podemos renombrar la funcion importada 

console.log(suma(3,4))

console.log(jose(3,4))

//! no existe __dirname ni __filename
// console.log(__dirname) no existe en es module
console.log(import.meta.url)


//! tampoco se puede importar archivos json
// import users from "./user.json"
// console.log(users)

//**lo que podemos hacer es exportar el require */ */

import {createRequire} from "module"
const require = createRequire(import.meta.url)
const users = require('./user.json');
console.log(users)