import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet, Text, View , Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screen/home'
import Weather from './src/screen/mainScreen'
import SplashScreen from 'react-native-splash-screen'
import { API_KEY } from './utils/WeatherAPIKey';

const Stack = createStackNavigator();

export default class App extends React.Component{

  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    time: 0,
    error: null,
    location: null,
    dummy: 0
  };

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }
fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
          var timestamp = json.dt
          var date=new Date(timestamp);
          var hours = date.getHours(); 
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          var formattedTime = hours + ':' + minutes + ':' + seconds;
        console.log("json---->", json)
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
          time: formattedTime,
          location: json.name,
          dummy: 1
        })
      });
      var timestamp = json.timezone
      console.log("timestamp--->" )
  }
render() {
  return (
      <View style={styles.container}>
        {this.state.isLoading ? <Text>Fetching The Weather</Text> : 
          <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} time={this.state.time} name={this.state.location}/>}
          <Button  title="Refresh Screen" onClick={this.fetchWeather} />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});


