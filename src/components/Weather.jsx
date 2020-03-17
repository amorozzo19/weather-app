import React from "react";

const Weather = ({
  city,
  temp_min,
  temp_max,
  temp_fahrenheit,
  icon,
  description
}) => {
  return (
    <div className="container">
      <div className="cards pt-4">
        <h1>{city}</h1>
        <h5 className="py-4">
          <i className={`wi ${icon} display-1`}>
            {icon ? "" : <div class="spinner-border text-success"></div>}
          </i>
        </h5>
        {temp_fahrenheit ? (
          <h1 className="py-2">{temp_fahrenheit}&deg;</h1>
        ) : null}
        {minMaxTemp(temp_min, temp_max)}

        <h4 className="py-3">{description}</h4>
      </div>
    </div>
  );
};

function minMaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
