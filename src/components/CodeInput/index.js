import React from "react";

import "./index.scss";

export default function CodeInput({ code, onCodeChange }) {
  return (
    <div className="codigo-container">
      <textarea
        id="code"
        placeholder="codigo a evaluar"
        className="codigo"
        value={code}
        onChange={onCodeChange}
      />
    </div>
  );
}
