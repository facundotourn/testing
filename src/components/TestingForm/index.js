import React, { useState } from "react";
import { halstead, calcularComplejidadCiclomatica } from "../../util";

import "./index.scss";

export default function TestingForm() {
  const [cantLineasTotales, setcantLineasTotales] = useState(0);
  const [complejidadCiclomatica, setcomplejidadCiclomatica] = useState(0);
  const [longitudHalstead, setlongitudHalstead] = useState(0);
  const [volumenHalstead, setvolumenHalstead] = useState(0);
  const [comentariosSimples, setcomentariosSimples] = useState(0);

  const [code, setCode] = useState("");
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleHalsteadResult = (
    cantidadOperadoresUnicos,
    cantidadOperandosUnicos,
    cantidadOperadoresTotales,
    cantidadOperandosTotales
  ) => {
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

  const handleComplejidadCiclomaticaResult = (result) => {
    setcomplejidadCiclomatica(result + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setcantLineasTotales(code.split("\n").length);
    setcomentariosSimples(code.split("//").length - 1);

    calcularComplejidadCiclomatica(code, handleComplejidadCiclomaticaResult);
    halstead(code, handleHalsteadResult);
  };

  return (
    <div>
      GRUPO 3
      <div className="codigo-container">
        <textarea
          id="code"
          placeholder="codigo a evaluar"
          className="codigo"
          value={code}
          onChange={handleCodeChange}
        />
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
