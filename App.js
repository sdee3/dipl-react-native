import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { API_KEY } from "./utils/WeatherAPIKey";
import weatherCondition from "./utils/WeatherConditions";
import WeatherInfo from "./components/WeatherInfo";

export default class App extends React.Component {
  state = {
    isLoading: false,
    discoveredCityName: "",
    discoveredCountryCode: "",
    temperature: 0,
    error: null,
    weatherCondition: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        this.setState({
          error: "Error Fetching Weather Condtions"
        });
      }
    );
  }

  setCity = city => {
    if (city.length > 3) {
      this.fetchWeather(city);
    }
  };

  fetchWeather(cityName) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        if (json.main) {
          this.setState(() => ({
            temperature: json.main.temp,
            weatherCondition: json.weather[0].main,
            discoveredCityName: json.name,
            discoveredCountryCode: json.sys.country,
            isLoading: false
          }));

          this.fetchForecast(cityName);
        }
      });
  }

  fetchForecast = cityName => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}&units=metric&cnt=24`
    )
      .then(res => res.json())
      .then(json => {
        let { list } = json;

        if (list.length) {
          list.forEach(listItem => {
            console.log(listItem.dt_txt, parseInt(listItem.main.temp));
          });
        }
      });
  };

  render() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        this.setState({
          error: "Error Fetching Weather Condtions"
        });
      }
    );

    const {
      weatherCondition,
      temperature,
      discoveredCityName,
      discoveredCountryCode
    } = this.state;

    const condition = weatherCondition
      ? "It's currently " +
        parseInt(temperature) +
        " degrees Celsius with " +
        weatherCondition +
        " in " +
        discoveredCityName +
        ", " +
        discoveredCountryCode
      : "No results";

    return (
      <React.Fragment>
        <Text style={styles.heading}>React Native</Text>
        <View style={styles.container}>
          <TextInput
            onChangeText={city => this.setCity(city)}
            placeholder="Enter city name..."
            style={styles.input}
            value={this.state.city}
          />
          <WeatherInfo content={condition} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50
  },

  heading: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#111",
    marginLeft: 10,
    marginRight: 10
  }
});
