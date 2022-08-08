export const suma = (numA, numB) => {
  return numA + numB;
};

export const resta = (numA, numB) => {
  return numA - numB;
};

export const multiplicacion = (numA, numB) => {
  return numA * numB;
};

// module.exports = {suma, resta, multiplicacion}


//** tambien podemos usar export default */
export default suma
//el problema es que no permite desestructurar 

// export { resta, multiplicacion };//tri shaking esta es la mas comun porque las operacione que no se importen desde otro archivo no se exportara 