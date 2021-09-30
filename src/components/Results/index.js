import React from "react";

import "./index.scss";

export default function Results({ children }) {
  return (
    <>
      <div className="result-title-container">
        <p>Resultados</p>
      </div>
      <div className="results-container">{children}</div>
    </>
  );
}
