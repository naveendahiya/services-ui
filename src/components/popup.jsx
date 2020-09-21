import React from "react";
import "../styles/popup.scss";

const Error = (props) => {
  return (
    <>
      <div class="isa isa_error">
        {props.error}
      </div>
    </>
  );
};

export default Error;
