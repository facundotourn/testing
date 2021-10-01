import React from "react";

import "./index.scss";

export default function Title({ children }) {
  return (
    <div className="result-title-container">
      <p>{children}</p>
    </div>
  );
}
