import React, { useState } from "react";
import { OPERADORES_JAVA, CONDICIONALES_JAVA } from "../../constants";

export default function TestingForm() {
  const [cantLineasTotales, setcantLineasTotales] = useState(0);
  const [complejidadCiclomatica, setcomplejidadCiclomatica] = useState(0);
  const [longitudHalstead, setlongitudHalstead] = useState(0);
  const [volumenHalstead, setvolumenHalstead] = useState(0);
  const [comentariosSimples, setcomentariosSimples] = useState(0);

  const halsteadMetodo = (texto) => {
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
    setlongitudHalstead(
      parseInt(
        cantidadOperadoresUnicos * Math.log2(cantidadOperadoresUnicos) +
          cantidadOperandosUnicos * Math.log2(cantidadOperandosUnicos)
      )
    );
    setvolumenHalstead(
      parseFloat(
        (cantidadOperadoresTotales + cantidadOperandosTotales) *
          Math.log2(cantidadOperadoresUnicos + cantidadOperandosUnicos)
      ).toFixed(2)
    );
  };

  const calcularCOmplejidadCiclomatica = (code) => {
    let result = 0;
    const codeSplited = code.split(" ");
    codeSplited.map((c) => {
      if (c in CONDICIONALES_JAVA) {
        ++CONDICIONALES_JAVA[c];
      }
    });

    Object.values(CONDICIONALES_JAVA).map((e) => {
      result = result + e;
    });
    console.log(result);
    setcomplejidadCiclomatica(result + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = document.getElementById("code").value;
    console.log(code);
    setcantLineasTotales(code.split("\n").length);

    calcularCOmplejidadCiclomatica(code);
    setcomentariosSimples(code.split("//").length - 1);
    halsteadMetodo(code);
  };

  return (
    <div>
      <div className="codigo-container">
        GRUPO 3
        <textarea id="code" placeholder="codigo a evaluar" className="codigo" />
      </div>

      <div className="resul-container">
        <div className="resultado">
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? cantLineasTotales
                : null
            }
            id="cantLineas"
            placeholder="cantidad de lienas"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label">Lineas de codigo</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? cantLineasTotales - comentariosSimples
                : null
            }
            placeholder="cantidad de lienas de codigo"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label">Lineas comentadas</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? comentariosSimples
                : null
            }
            placeholder="cantidad de lienas comentadas"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label">Porcentaje de lineas comentadas</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? comentariosSimples > 0 && cantLineasTotales > 0
                  ? (comentariosSimples / cantLineasTotales) * 100
                  : 0
                : null
            }
            placeholder="pocentaje de lienas comentadas"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label"> Complejidad ciclomatica</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? complejidadCiclomatica
                : null
            }
            placeholder="complejidad ciclomatica"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label">Halstead Longitud</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? longitudHalstead
                : null
            }
            placeholder="longitud de Halstead"
            readOnly={true}
          />
        </div>
        <div className="resultado">
          {/* <p className="label">Halstead Volumen</p> */}
          <input
            value={
              document.getElementById("code") &&
              document.getElementById("code").value
                ? volumenHalstead
                : null
            }
            placeholder="volumen de Halstead"
            readOnly={true}
          />
        </div>
      </div>

      <button onClick={handleSubmit} class="button">
        Calcular
      </button>
    </div>
  );
}
