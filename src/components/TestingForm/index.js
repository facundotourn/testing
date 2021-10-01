import React, { useState } from "react";
import { halstead, calcularComplejidadCiclomatica } from "../../util";
import CodeInput from "../CodeInput";
import Result from "../Result";
import Results from "../Results";
import SubmitButton from "../SubmitButton";
import Title from "../Title";

import "./index.scss";

const FORM_STATES = {
  WAITING_INPUT: 1,
  INPUT_LOADED: 2,
  SHOW_RESULTS: 3,
};

export default function TestingForm() {
  const [cantLineasTotales, setcantLineasTotales] = useState(0);
  const [complejidadCiclomatica, setcomplejidadCiclomatica] = useState(0);
  const [longitudHalstead, setlongitudHalstead] = useState(0);
  const [volumenHalstead, setvolumenHalstead] = useState(0);
  const [comentariosSimples, setcomentariosSimples] = useState(0);

  const [currentState, setCurrentState] = useState(FORM_STATES.WAITING_INPUT);

  const outputs = [
    {
      name: "cantidad de líneas",
      value: cantLineasTotales,
    },
    {
      name: "cantidad de líneas de código",
      value: cantLineasTotales - comentariosSimples,
    },
    {
      name: "cantidad de líneas comentadas",
      value: comentariosSimples,
    },
    {
      name: "porcentaje de líneas comentadas",
      value:
        comentariosSimples > 0 && cantLineasTotales > 0
          ? (comentariosSimples / cantLineasTotales) * 100
          : 0,
    },
    {
      name: "complejidad ciclomática",
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

    if (e.target.value.length) setCurrentState(FORM_STATES.INPUT_LOADED);
    else setCurrentState(FORM_STATES.WAITING_INPUT);
  };

  const handleHalsteadResult = (
    cantidadOperadoresUnicos,
    cantidadOperandosUnicos,
    cantidadOperadoresTotales,
    cantidadOperandosTotales
  ) => {
    setlongitudHalstead(
      cantidadOperadoresUnicos <= 0 || cantidadOperandosUnicos <= 0
        ? "-"
        : parseInt(
            cantidadOperadoresUnicos * Math.log2(cantidadOperadoresUnicos) +
              cantidadOperandosUnicos * Math.log2(cantidadOperandosUnicos)
          )
    );
    setvolumenHalstead(
      cantidadOperadoresUnicos + cantidadOperandosUnicos > 0
        ? "-"
        : (cantidadOperadoresTotales + cantidadOperandosTotales) *
            Math.log2(cantidadOperadoresUnicos + cantidadOperandosUnicos)
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

    setCurrentState(FORM_STATES.SHOW_RESULTS);
  };

  return (
    <>
      <Title>Herramienta de testing</Title>

      <CodeInput code={code} onCodeChange={handleCodeChange} />
      <Results
        className={
          currentState === FORM_STATES.SHOW_RESULTS ? "div-show" : "div-hide"
        }
      >
        {outputs.map((output) => (
          <Result key={output.name} {...output} />
        ))}
      </Results>
      {currentState === FORM_STATES.INPUT_LOADED && (
        <SubmitButton style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Calcular
        </SubmitButton>
      )}
    </>
  );
}
