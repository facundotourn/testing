import { CONDICIONALES_JAVA, OPERADORES_JAVA } from "../constants";

export const halstead = (texto, callback) => {
  //Operadores + - = * ; int double float return
  let textosSinComentarios = texto.replace(
    /(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm,
    ""
  );
  let cantidadOperadoresTotales = 0;
  let cantidadOperandosTotales = 0;
  let cantidadOperadoresUnicos = 0;
  let cantidadOperandosUnicos = 0;

  //var operadores = document.getElementById("operadores").value.split(',');
  let operandosUnicos = [];

  //OPERADORES UNICOS Y TOTALES.
  for (let i = 0; i < OPERADORES_JAVA.length; i++) {
    if (textosSinComentarios.indexOf(OPERADORES_JAVA[i]) !== -1)
      cantidadOperadoresUnicos++;
    cantidadOperadoresTotales += texto.split(OPERADORES_JAVA[i]).length - 1;
  }

  //OPERADORES TOTALES

  //OPERANDOS UNICOS Y TOTALES.
  let aAnalizar = textosSinComentarios.split(" ");
  let hasta = textosSinComentarios.split(" ").length;
  for (let j = 0; j < hasta; j++) {
    //Si no es un operador y todavia no esta en el array de operandos unicos.
    if (
      OPERADORES_JAVA.indexOf(aAnalizar[j]) === -1 &&
      operandosUnicos.indexOf(aAnalizar[j]) === -1
    ) {
      operandosUnicos.push(aAnalizar[j]);
      cantidadOperandosUnicos++;
    }
    //Si no es un operador.
    if (OPERADORES_JAVA.indexOf(aAnalizar[j]) === -1)
      cantidadOperandosTotales++;
  }

  console.log({
    cantidadOperadoresUnicos,
    cantidadOperandosUnicos,
    cantidadOperadoresTotales,
    cantidadOperandosTotales,
  });

  callback(
    cantidadOperadoresUnicos,
    cantidadOperandosUnicos,
    cantidadOperadoresTotales,
    cantidadOperandosTotales
  );
};

export const calcularComplejidadCiclomatica = (code, callback) => {
  let result = 0;
  const codeSplited = code.split(" ");

  codeSplited.forEach((c) => {
    if (c in CONDICIONALES_JAVA) {
      ++CONDICIONALES_JAVA[c];
    }
  });

  Object.values(CONDICIONALES_JAVA).forEach((e) => {
    result = result + e;
  });

  callback(result);
};
