import React from "react";

import "./index.scss";

export default function Result({ value, name }) {
  return (
    <div className="resultado">
      <input
        value={
          document.getElementById("code") &&
          document.getElementById("code").value
            ? value
            : null
        }
        placeholder={name}
        readOnly={true}
      />
    </div>
  );
}
