import React from "react";

import "./index.scss";

export default function SubmitButton({ onClick, style, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      <button onClick={onClick} className="submit-button">
        {children}
      </button>
    </div>
  );
}
