import React from "react";

import "./index.scss";

export default function Result({ value, name }) {
  return (
    <div className="result">
      <div className="result-value-container">{value}</div>
      <div className="result-description-container">{name}</div>
    </div>
  );
}
