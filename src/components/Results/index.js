import React from "react";

import "./index.scss";

export default function Results({ children }) {
  return (
    <div className="results-container">
      <div className="result-title-container">
        <p>Resultados</p>
      </div>
      {children}
    </div>
  );
}
