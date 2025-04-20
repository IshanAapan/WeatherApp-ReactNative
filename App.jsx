import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './components/Card';


const API_KEY = '40587d7e81870ea717a1f649d426dadf';

const getData = async (city, setTemp, setDesc, setFeelLike, setHumidity, setSeaLevel, setPressure, setMaxTemp, setMinTemp, setSunRise, setSunSet, setVisibility) => {
  try {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    console.log('Resp', resp);
    setTemp(resp.data.main.temp);
    setDesc(resp.data.weather[0].description);
    setFeelLike(resp.data.main.feels_like);
    setHumidity(resp.data.main.humidity);
    setPressure(resp.data.main.pressure);
    setSeaLevel(resp.data.main.sea_level);
    setMaxTemp(resp.data.main.temp_max);
    setMinTemp(resp.data.main.temp_min);
    setSunRise(resp.data.sys.sunrise);
    setSunSet(resp.data.sys.sunset);
    setVisibility(resp.data.visibility);
  } catch (error) {
    console.log('error', error);
  }
};

const image = require('./photos/weather2.jpg');

const App = () => {

  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Delhi');
  const [desc, setDesc] = useState('');
  const [feel_like, setFeelLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [seaLevel, setSeaLevel] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [sunRise, setSunRise] = useState(0);
  const [sunSet, setSunSet] = useState(0);
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    getData(city, setTemp, setDesc, setFeelLike, setHumidity, setPressure, setSeaLevel, setMaxTemp, setMinTemp, setSunRise, setSunSet, setVisibility);
  }, [city]);


  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatSunRise = formatTime(sunRise);
  const formatSunSet = formatTime(sunSet);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.subContainer}>
          <TextInput placeholder="Enter City Name" onChangeText={(text) => setCity(text)} value={city} style={styles.input} />
          <Text style={styles.cityName}>{city.toUpperCase()}</Text>
          <View style={styles.tempContainer}>
            <Icon style={styles.sunnyWeather} name="weather-sunny" size={30} color="#fff" />
            <Text style={styles.temp}>{temp}°C</Text>
          </View>
          <Text style={styles.desc}>{desc.toUpperCase()}</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardWrapper}>
            <Card data1={feel_like} data2={humidity} namee1="Feel Like" namee2="Humidity" icon1="thermometer" icon2="water-percent"
              iconLib1="MaterialCommunityIcons"
              iconLib2="MaterialCommunityIcons" />
            <Card data1={pressure} data2={seaLevel} namee1="Pressure" namee2="Sea Level" icon1="gauge"
              icon2="waves"
              iconLib1="MaterialCommunityIcons"
              iconLib2="MaterialCommunityIcons" />
          </View>

          <View style={styles.cardWrapper}>
            <Card data1={`${maxTemp}°C`} data2={`${minTemp}°C`} namee1="Max Temp" namee2="Min Temp" />
            <Card data1={formatSunRise} data2={formatSunSet} namee1="sunrise" namee2="sunset" icon1="weather-sunset-up"
              icon2="weather-sunset-down"
              iconLib1="MaterialCommunityIcons"
              iconLib2="MaterialCommunityIcons" />
          </View>
          <View style={styles.lastCard}>
            <Card data1={`${visibility / 1000} km`} namee1= "Visibility" icon1="eye"
              iconLib1="Feather" />
          </View>


        </View>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({

  lastCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  cardContainer: {
    marginBottom: 50,
    flexDirection: 'column',
    gap: 15,
  },

  cardWrapper: {
    flexDirection: 'row',
    // marginBottom: 400,
    marginLeft: 17,
    gap: 20,
  },


  image: {
    height: '100%',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 18,
    marginTop: 40,
  },
  cityName: {
    fontSize: 45,
    color: '#fff',
    marginTop: 30,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunnyWeather: {
    marginTop: 7,
    marginRight: 3,
  },
  temp: {
    fontSize: 35,
    color: '#fff',
    marginTop: 5,
  },
  desc: {
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
  },
});
