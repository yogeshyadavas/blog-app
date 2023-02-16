import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const More = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <div id="state1">
      <div id="more">
        <div>
          <h1  style={{textAlign:"center"}}>{location.state.heading}</h1>
        </div>

        <div>
          <h5 style={{textAlign:"center"}} >{location.state.date}</h5>
        </div>

        <div id="more-content">
          <h3>{location.state.content}</h3>
        </div>
      </div>

      <div>
        <button
          onClick={toHome}
          type="button"
          className="btn btn-danger me-md-2 button3"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default More;
