import React, { useState } from "react";
import { halstead, calcularComplejidadCiclomatica } from "../../util";
import CodeInput from "../CodeInput";
import Result from "../Result";
import Results from "../Results";

import "./index.scss";

export default function TestingForm() {
  const [cantLineasTotales, setcantLineasTotales] = useState(0);
  const [complejidadCiclomatica, setcomplejidadCiclomatica] = useState(0);
  const [longitudHalstead, setlongitudHalstead] = useState(0);
  const [volumenHalstead, setvolumenHalstead] = useState(0);
  const [comentariosSimples, setcomentariosSimples] = useState(0);

  const outputs = [
    {
      name: "cantidad de lineas",
      value: cantLineasTotales,
    },
    {
      name: "cantidad de lineas de código",
      value: cantLineasTotales - comentariosSimples,
    },
    {
      name: "cantidad de lienas comentadas",
      value: comentariosSimples,
    },
    {
      name: "pocentaje de lienas comentadas",
      value:
        comentariosSimples > 0 && cantLineasTotales > 0
          ? (comentariosSimples / cantLineasTotales) * 100
          : 0,
    },
    {
      name: "complejidad ciclomatica",
      value: complejidadCiclomatica,
    },
    {
      name: "longitud de Halstead",
      value: longitudHalstead,
    },
    {
      name: "volumen de Halstead",
      value: volumenHalstead,
    },
  ];

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
      <CodeInput code={code} onCodeChange={handleCodeChange} />
      <Results>
        {outputs.map((output) => (
          <Result {...output} />
        ))}
      </Results>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} class="button">
          Calcular
        </button>
      </div>
    </div>
  );
}
