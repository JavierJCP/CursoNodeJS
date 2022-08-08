console.clear();

import {createServer} from 'http'

const httpServer = createServer((req, res) => {

  console.log("Peticion Recibida");

  //*nos falta poner el verbo o metodo (crud) para indicar que es lo que quiere el cliente *//
  //console.log(req.method); 
  //**nos falta la ruta/path para identificar el recurso */
  //console.log(req.url);
  //**nos falta las cabeceras */
  //console.log(req.headers);
  //**nos falta el body/payload */
  //no existe un metodo que devuelva el body, debido a que el body pueden ser GB de memoria, por lo tanto lo que podemos hacer es obtener un representacion del body a travez de un evento por ejemplo
  let data = "";
  let chunkIndex = 0;
  //**lo que se hace es recortar cada cierto  */
  req.on('data', (chunk) => {
    data += chunk;
    chunkIndex++;
    console.log(chunkIndex)
  });

  req.on('end', () => {
    //console.log(data)
  });

  res.end("Recibido colega")
});

httpServer.listen(3000);