import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Modal } from 'react-bootstrap';
import { DisplayDate } from '../display-date/display-date';
import sunny from './../../img/clear-day.svg'
import moon from './../../img/clear-night.svg'
import { Footer } from '../footer/footer';
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
import { faXRay } from '@fortawesome/free-solid-svg-icons/faXRay';

const Weather = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20

  function clearInput() {

    document.querySelector(".city-search-input").value = "";
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=37a59afb38bdce13cc1d95a3e10551e5
`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDaily = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=37a59afb38bdce13cc1d95a3e10551e5`
      );
      setDailyWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchData();
    fetchDaily();
  }, [city]);





  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    fetchDaily();
  };



  return (
    <div className='container'>
      <div className='form-heading-container'>
        <h1 className="app-heading">Better Wetter</h1>
        <form className="weather-form" onSubmit={handleSubmit}>

          <input
            className="city-search-input"
            type="text"
            placeholder="Search by city name"
            value={city}
            onChange={handleInputChange}
          />
          <button className="get-weather-button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
          <button onClick={clearInput} className="clear-input-button" type="button"> <FontAwesomeIcon icon={faX} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
        </form>
      </div>

      {weatherData ? (
        <>
          <Card id="card" className='item card ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{weatherData.name}, {weatherData.sys.country}
                <DisplayDate />
              </h2>
              </Card.Title>

              <Card.Title className="temp-info-container text-center pb-1" ><p className="temperature-info" style={{ color: "whitesmoke" }}>{Math.trunc(weatherData.main.temp)}°C</p>

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
              <Card.Title className="item-info pb-1 " ><p className="feels-like-info" style={{ color: "whitesmoke" }}>Feels like : {Math.trunc(weatherData.main.feels_like)}°C</p>
                {/* {(weatherData.main.feels_like >= -30 && weatherData.main.feels_like <= -4) &&
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
                } */}
              </Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{ color: "whitesmoke" }}>Humidity : {weatherData.main.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info" style={{ color: "whitesmoke" }}>Pressure : {weatherData.main.pressure}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed : {weatherData.wind.speed}m/s</p></Card.Title>


            </Card.Body>


          </Card>







        </>
      ) : (
        <div style={{ height: "100vh" }}>
          <p className="pre-request-text">
            <FontAwesomeIcon icon={faCircleInfo} beatFade size="lg" style={{ color: "#337cb4", }} />
            <span className='pre-request-text-span'>Start by typing the city...</span>
          </p>
        </div>
      )}

      {dailyWeatherData ? (
        <>
        <h3 className='day-7-heading'>3-hour weather forecast for <span className='day-7-location-span'>{weatherData.name}, {weatherData.sys.country}</span></h3>
        <div className='weather-7-container'>
          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[0].dt_txt}
                
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[0].weather[0].description}</p>
</Card.Title>
          <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[0].main.temp)}°C</p>

              {(dailyWeatherData.list[0].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[0].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[0].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[0].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[0].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[0].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[1].dt_txt}
                
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[1].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[1].main.temp)}°C</p>

              {(dailyWeatherData.list[1].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[1].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[1].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[1].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[1].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[1].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[2].dt_txt}
                
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[2].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[2].main.temp)}°C</p>

              {(dailyWeatherData.list[2].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[2].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[2].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[2].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[2].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[2].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[3].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[3].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[3].main.temp)}°C</p>

              {(dailyWeatherData.list[3].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[3].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[3].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[3].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[3].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[3].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>


          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[4].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[4].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[4].main.temp)}°C</p>

              {(dailyWeatherData.list[4].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[4].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[4].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[4].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[4].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[4].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[5].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[5].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[5].main.temp)}°C</p>

              {(dailyWeatherData.list[5].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[5].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[5].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[5].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[5].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[5].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[6].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[6].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[6].main.temp)}°C</p>

              {(dailyWeatherData.list[6].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[6].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[6].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[6].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[6].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[6].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[7].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[7].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[7].main.temp)}°C</p>

              {(dailyWeatherData.list[7].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[7].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[7].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[7].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[7].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[7].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>

          <Card id="card" className='item card-7-forecast ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{dailyWeatherData.list[8].dt_txt}
                {/* <DisplayDate /> */}
              </h2>
              </Card.Title>
              <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{dailyWeatherData.list[8].weather[0].description}</p>
</Card.Title>
              <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.trunc(dailyWeatherData.list[8].main.temp)}°C</p>

              {(dailyWeatherData.list[8].weather[0].description === 'clear sky' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={sunny}
                  />
                }

                {(dailyWeatherData.list[8].weather[0].description === 'clear sky' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moon}
                  />
                }

                {(dailyWeatherData.list[8].weather[0].description === 'scattered clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'scattered clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={cloudy}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'heavy intensity rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'heavy intensity rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 heavy-rain' variant='top'
                    type="image/gif"
                    src={heavyIntensityRain}
                  />
                }



                {(dailyWeatherData.list[8].weather[0].description === 'broken clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenClouds}
                  />
                }

                {(dailyWeatherData.list[8].weather[0].description === 'broken clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7 broken-clouds' variant='top'
                    type="image/svg"
                    src={brokenCloudsNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'overcast clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastDay}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'overcast clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={overcastNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'thunderstorm' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormDay}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'thunderstorm' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={thunderstormNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'haze' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeDay}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'haze' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={hazeNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'light rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'light rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={lightRain}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'moderate rain' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'moderate rain' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={moderateRain}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'few clouds' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewClouds}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'few clouds' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={fewCloudsNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'mist' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'mist' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={mist}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'fog' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogDay}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'fog' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/svg"
                    src={fogNight}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'heavy snow' && isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                {(dailyWeatherData.list[8].weather[0].description === 'heavy snow' && !isDayTime) &&
                  <Card.Img className='w-100 card-image-7' variant='top'
                    type="image/gif"
                    src={heavySnow}
                  />
                }
                </Card.Title>
            </Card.Body>
          </Card>
          </div>
          {/* <Card.Title className="temp-info-container text-center pb-1" ><p className="temperature-info" style={{ color: "whitesmoke" }}>{Math.trunc(weatherData.main.temp)}°C</p> */}

          {/* {(weatherData.weather[0].description === 'clear sky' && isDayTime) &&
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
                } */}
          {/* </Card.Title> */}
          {/* <Card.Title className="item-info text-center pb-1 " ><p className="sky-info" style={{ color: "whitesmoke" }}>{weatherData.weather[0].description}</p>

              </Card.Title> */}
          {/* <Card.Title className="item-info pb-1 " ><p className="feels-like-info" style={{ color: "whitesmoke" }}>Feels like : {Math.trunc(weatherData.main.feels_like)}°C</p> */}
          {/* {(weatherData.main.feels_like >= -30 && weatherData.main.feels_like <= -4) &&
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
                } */}
          {/* </Card.Title> */}
          {/* <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{ color: "whitesmoke" }}>Humidity : {weatherData.main.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info" style={{ color: "whitesmoke" }}>Pressure : {weatherData.main.pressure}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed : {weatherData.wind.speed}m/s</p></Card.Title> */}


          {/* </Card.Body> */}


          {/* </Card> */}







        </>
      ) : (
        // <div style={{height:"100vh"}}>
        // <p className="pre-request-text">
        //   <FontAwesomeIcon icon={faCircleInfo} beatFade size="lg" style={{color: "#337cb4",}} />
        //   <span className='pre-request-text-span'>Start by typing the city...</span>
        // </p>
        // </div>
        ""
      )}

      <Footer />
    </div>
  );
};

export default Weather;