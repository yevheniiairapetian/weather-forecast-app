import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Modal } from 'react-bootstrap';
import { DisplayDate } from '../display-date/display-date';
import sunny from './../../img/clear-day.svg'
import moon from './../../img/clear-night.svg'
import cloudyMoon from './../../img/scatteredMoon.gif'
import coolWeather from './../../img/cool-weather.gif'
import freezing from './../../img/love.gif'
import colderWeather from './../../img/colder-weather.gif'
import warmWeather from './../../img/warm-weather.gif'
import hotWeather from './../../img/hot-weather.gif'
import brokenClouds from './../../img/partly-cloudy-day.svg'
import brokenCloudsNight from './../../img/partly-cloudy-night.svg'
import cloudy from './../../img/overcast.svg'
import overcastDay from './../../img/overcast-day.svg'
import overcastNight from './../../img/overcast-night.svg'
import thunderstormDay from './../../img/thunderstorms-day.svg'
import thunderstormNight from './../../img/thunderstorms-night.svg'
import hazeDay from './../../img/haze-day.svg'
import hazeNight from './../../img/haze-night.svg'
import mist from './../../img/mist.svg'
import fogDay from './../../img/fog-day.svg'
import fogNight from './../../img/fog-night.svg'
import fewClouds from './../../img/fewClouds.gif'
import fewCloudsNight from './../../img/fewCloudsNight.gif'
import lightRain from './../../img/rain.svg'
import moderateRain from './../../img/moderate-rain.svg'
import heavyIntensityRain from './../../img/heavyIntensityRain.gif'
import heavySnow from './../../img/heavySnow.gif'

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



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{weatherData.name}
                <DisplayDate />
              </h2>
              </Card.Title>

              <Card.Title className="temp-info-container text-center pb-1" ><p className="temperature-info" style={{ color: "whitesmoke" }}>{weatherData.main.temp}°C</p>

                {(weatherData.weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(weatherData.weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(weatherData.weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(weatherData.weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
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



                {(weatherData.weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(weatherData.weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(weatherData.weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(weatherData.weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(weatherData.weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(weatherData.weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(weatherData.weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(weatherData.weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(weatherData.weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(weatherData.weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(weatherData.weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(weatherData.weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
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
                {(weatherData.weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(weatherData.weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(weatherData.weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(weatherData.weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(weatherData.weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(weatherData.weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
              </Card.Title>
              <Card.Title className="item-info text-center pb-1 " ><p className="sky-info" style={{ color: "whitesmoke" }}>{weatherData.weather[0].description}</p>

              </Card.Title>
              <Card.Title className="item-info text-center pb-1 temp-info-container" ><p className="feels-like-info" style={{ color: "whitesmoke" }}>Feels like : {weatherData.main.feels_like}°C</p>
              {(weatherData.main.feels_like >= -30 && weatherData.main.feels_like <= -4) &&
                  <Card.Img className='' variant='top'
                    type="image/gif"
                    style={{ height: "330px"}}
                    src={freezing}
                  />
                }
              {(weatherData.main.feels_like >= -5 && weatherData.main.feels_like <=5) &&
                  <Card.Img className='' variant='top'
                    type="image/gif"
                    style={{ height: "330px"}}
                    src={colderWeather}
                  />
                }                
                {(weatherData.main.feels_like > 5 && weatherData.main.feels_like < 19) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    style={{ height: "190px", width:"160px"}}

                    src={coolWeather}
                  />
                }
                {(weatherData.main.feels_like >= 19 && weatherData.main.feels_like < 26) &&
                  <Card.Img className='' variant='top'
                    type="image/gif"
                    style={{ height: "230px"}}
                    src={warmWeather}
                  />
                }
                {(weatherData.main.feels_like >= 26 && weatherData.main.feels_like < 45) &&
                  <Card.Img className='' variant='top'
                    type="image/gif"
                    style={{ height: "330px"}}
                    src={hotWeather}
                  />
                }
                </Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{ color: "whitesmoke" }}>Humidity : {weatherData.main.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info" style={{ color: "whitesmoke" }}>Pressure : {weatherData.main.pressure}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed : {weatherData.wind.speed}m/s</p></Card.Title>


            </Card.Body>


          </Card>







        </>
      ) : (
        <p>
          {/* Loading weather data... */}
        </p>
      )}
    </div>
  );
};

export default Weather;