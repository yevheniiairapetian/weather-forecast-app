import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Modal } from 'react-bootstrap';
import { DisplayDate } from '../display-date/display-date';
import sunny from './../../img/sunny.gif'
import moon from './../../img/moon.gif'
import cloudy from './../../img/cloudy.gif'
import cloudyMoon from './../../img/scatteredMoon.gif'
import brokenClouds from './../../img/brokenClouds.gif'
import brokenCloudsNight from './../../img/brokenCloudsNight.gif'
import overcast from './../../img/overcast.gif'
import thunderstorm from './../../img/thunderstorm.gif'
import thunderstormNight from './../../img/thunderstormNight.gif'
import haze from './../../img/haze.gif'
import hazeNight from './../../img/hazeNight.gif'
import fewClouds from './../../img/fewClouds.gif'
import fewCloudsNight from './../../img/fewCloudsNight.gif'
import lightRain from './../../img/lightRain.gif'
import moderateRain from './../../img/moderateRain.gif'
import heavyIntensityRain from './../../img/heavyIntensityRain.gif'

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=62d722126e1c32d2ffdf817f3681a7b0`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          className="city-search-input"
          type="text"
          placeholder="Search by city name"
          value={city}
          onChange={handleInputChange}
        />
        <button className="get-weather-button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
      </form>
      {weatherData ? (
        <>
          <Card id="card" className='item card mb-3' >



            <Card.Body className={isDayTime? "card-body moving-background-light":"card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{weatherData.name}
                <DisplayDate />
              </h2>
              </Card.Title>

              <Card.Title className="temp-info-container text-center pb-1" ><p className="temperature-info" style={{color:"whitesmoke"}}>{weatherData.main.temp}°C</p>

                {(weatherData.weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={sunny}
                  />
                }

                {(weatherData.weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={moon}
                  />
                }

                {(weatherData.weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={cloudy}
                  />
                }
                {(weatherData.weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(weatherData.weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }


                {(weatherData.weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={cloudyMoon}
                  />
                }
                {(weatherData.weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image broken-clouds' variant='top'
                    type="image/gif"
                    src={brokenClouds}
                  />
                }

                {(weatherData.weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image broken-clouds' variant='top'
                    type="image/gif"
                    src={brokenCloudsNight}
                  />
                }
                {(weatherData.weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={overcast}
                  />
                }
                {(weatherData.weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={overcast}
                  />
                }
                {(weatherData.weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={thunderstorm}
                  />
                }
                {(weatherData.weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={thunderstormNight}
                  />
                }
                {(weatherData.weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={haze}
                  />
                }
                {(weatherData.weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={hazeNight}
                  />
                }
                {(weatherData.weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={lightRain}
                  />
                }
                {(weatherData.weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={lightRain}
                  />
                }
                 {(weatherData.weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={moderateRain}
                  />
                }
                {(weatherData.weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={moderateRain}
                  />
                }
                {(weatherData.weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(weatherData.weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
              </Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="sky-info" style={{color:"whitesmoke"}}>{weatherData.weather[0].description}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="feels-like-info" style={{color:"whitesmoke"}}>Feels like : {weatherData.main.feels_like}°C</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{color:"whitesmoke"}}>Humidity : {weatherData.main.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info" style={{color:"whitesmoke"}}>Pressure : {weatherData.main.pressure}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info" style={{color:"whitesmoke"}}>Wind Speed : {weatherData.wind.speed}m/s</p></Card.Title>


            </Card.Body>


          </Card>







        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;