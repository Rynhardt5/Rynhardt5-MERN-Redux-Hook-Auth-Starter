import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={asOverlay && `lds-ring-overlay`}>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
