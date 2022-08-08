console.clear()

import express from 'express';
const app = express();

//! midleware se vera en otra aplicacion
app.use(express.json())



app.get("/cuenta/:idcuenta", (req, res) => {
  console.log(req.params.idcuenta)
  //res.send("Tu cuenta personal");  
  //console.log(req.headers);

  //**tambien podemos generar mensajes de error */
  // res.status(401).send({
  //   errorMessage: "No autorizado"
  // })
})

app.post("/cuenta/:idcuenta", (req, res) => {
  console.log(req.body)
  res.send();
})

const port = 3000;

app.listen(port, () => {
  console.log(`App lista en: http://localhost:${port}`)
})

