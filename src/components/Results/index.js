import React from "react";
import Title from "../Title";

import "./index.scss";

export default function Results({ children }) {
  return (
    <div className="results-container">
      <Title>Resultados</Title>
      <div className="cards-container">{children}</div>
    </div>
  );
}
