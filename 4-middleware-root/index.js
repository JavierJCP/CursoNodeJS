import express from 'express';
import cuentaRouter from './routes/cuenta.js';
import dotenv from 'dotenv';
dotenv.config();

//**crear el servidor**//
const PORT = process.env.PORT;
const app = express();
 
//*Middleware*//
//para entender el body en formato json y text
app.use(express.json()); 
app.use(express.text());

//**Roots**//
app.use("/cuenta",cuentaRouter);

//**levantar servidor **/
app.listen(PORT, () => {
  console.log(`App lista en servidor: http://localhost:${PORT}`)
})