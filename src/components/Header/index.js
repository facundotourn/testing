import React from "react";

import "./index.scss";

export default function Header() {
  return (
    <header className="App-header">
      <div className="container">
        <div>
          <img
            src="https://miel.unlam.edu.ar/vista/imagenes/logo_unlam_34.png"
            className="unlam-logo"
            alt="logo unlam"
          />
        </div>
        <div>
          <p>Grupo 3</p>
        </div>
      </div>
    </header>
  );
}
