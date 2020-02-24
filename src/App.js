import React from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import "./App.css";

// api call to api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "16d0872c4b80b49afb536685aef8a2e6";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "thunderstorm",
      Drizzle: "sleet",
      Rain: "storm-showers",
      Snow: "snow",
      Atmosphere: "fog",
      Clear: "sunny",
      Clouds: "alt-cloudy"
    };
  }

  calFahrenheit(kalvin) {
    return Math.floor((kalvin - 273.15) * 1.8 + 32);
  }

  getWeatherIcon(icons, rangeId, iconNum) {
    const dayOrNight = iconNum.search("n") < 0 ? "day" : "night";
    this.setState({ time: dayOrNight });

    switch (true) {
      case rangeId >= 200 && rangeId <= 232: {
        this.setState({
          icon: this.weatherIcon.Thunderstorm
        });
        break;
      }
      case rangeId >= 300 && rangeId <= 321: {
        this.setState({
          icon: this.weatherIcon.Drizzle
        });
        break;
      }
      case rangeId >= 500 && rangeId <= 531: {
        this.setState({
          icon: this.weatherIcon.Rain
        });
        break;
      }
      case rangeId >= 600 && rangeId <= 622: {
        this.setState({
          icon: this.weatherIcon.Snow
        });
        break;
      }
      case rangeId >= 701 && rangeId <= 781: {
        this.setState({
          icon: this.weatherIcon.Atmosphere
        });
        break;
      }
      case rangeId >= 801 && rangeId <= 804: {
        this.setState({
          time: iconNum.search("n") === -1 ? "day" : "night",
          icon: this.weatherIcon.Clouds
        });

        break;
      }
      default:
        this.setState({
          icon: this.weatherIcon.sunny
        });
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name},${response.sys.country}`,
        main: this.calFahrenheit(response.main.temp),
        celcius: this.calFahrenheit(response.main.temp),
        temp_max: this.calFahrenheit(response.main.temp_max),
        temp_min: this.calFahrenheit(response.main.temp_min),
        description: response.weather[0].description
      });

      this.getWeatherIcon(
        this.weatherIcon,
        response.weather[0].id,
        response.weather[0].icon
      );
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          temp_fahrenheit={this.state.celcius}
          icon={`wi-${this.state.time}-${this.state.icon}`}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
