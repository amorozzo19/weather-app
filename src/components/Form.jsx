import React from "react";
import "./form.style.css";

const Form = props => {
  return (
    <div className="container">
      <div>{props.error ? error("error") : null}</div>
      <div>{props.cod_error ? error() : null}</div>
      <form onSubmit={props.loadWeather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              name="city"
              autoComplete="off"
              placeholder="City"
            />
            ""
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="country"
              autoComplete="off"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

function error(error) {
  return error === "error" ? (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country
    </div>
  ) : (
    <div className="alert alert-danger mx-5" role="alert">
      Invalid City or Country Code
    </div>
  );
}

export default Form;
