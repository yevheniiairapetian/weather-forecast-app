import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';
import rain from './img/rain.png';

import { WeekSlider } from '../week-forecast-slider/week-forecast-slider';
import { Button, Card, CarouselItem, Modal } from 'react-bootstrap';
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
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [weekWeatherData, setWeekWeatherData] = useState(null);
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

  const fetchHourly = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=b6b68ae835d04defa94134215242409&q=${city}&days=1&aqi=no&alerts=no
`
      );
      setHourlyWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };


  const fetchWeekly = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=b6b68ae835d04defa94134215242409&q=${city}&days=7&aqi=no&alerts=no

`
      );
      setWeekWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDaily();
    fetchHourly();
    fetchWeekly();
  }, [city]);





  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    fetchDaily();
    fetchHourly();
    fetchWeekly();
  };

  

  return (
    <div className='contain'>
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
          <button className="get-weather-button" type="submit"><FontAwesomeIcon className="get-weather-icon" icon={faMagnifyingGlass} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
          <button onClick={clearInput} className="clear-input-button" type="button"> <FontAwesomeIcon className="clear-input-icon" icon={faX} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
        </form>
      </div>

      {hourlyWeatherData ? (
        <>
          <Card id="card" className='item card ' >



            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country} as of <span style={{color:'#fbbc04'}}>{hourlyWeatherData.location.localtime}</span>
              </h2>
              </Card.Title>

              <Card.Title className="temp-info-container text-center pb-1" >
                <p className="degCelcius temperature-info" style={{ color: "whitesmoke" }}>{(hourlyWeatherData.current.feelslike_c)}°C</p>

                {(isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={hourlyWeatherData.current.condition.icon}

                  />
                }

                {(!isDayTime) &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/svg"
                    src={hourlyWeatherData.current.condition.icon}
                  />
                }


              </Card.Title>
              <Card.Title className="item-info text-center pb-1" ><h2 className="sky-info" style={{ color: "whitesmoke" }}>{hourlyWeatherData.current.condition.text}</h2></Card.Title><br />
              <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{ color: "whitesmoke" }}>Humidity : {hourlyWeatherData.current.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info" style={{ color: "whitesmoke" }}>Pressure : {hourlyWeatherData.current.pressure_mb}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed : {hourlyWeatherData.current.wind_kph}km/h</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="uv-info" style={{ color: "whitesmoke" }}>UV Index : {hourlyWeatherData.current.uv}</p></Card.Title>


            </Card.Body>


          </Card>







        </>
      ) : (
        <div style={{ height: "100vh" }}>
          <p className="pre-request-text">
            <FontAwesomeIcon icon={faCircleInfo} beatFade size="lg" style={{ color: "#337cb4", }} />
            <span className='pre-request-text-span'>Start by typing the city above...</span>
          </p>
        </div>
      )}


      {hourlyWeatherData ? (
        <>
          <h3 className='day-24-heading'>24-hour weather forecast for <span className='day-7-location-span'>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</span></h3>
          <h4 className='before-midday'>Before Midday, <span className='day-7-location-span'>{hourlyWeatherData.location.name}, {hourlyWeatherData.forecast.forecastday[0].date}</span></h4>
          
          
          <div className='weather-7-container'>

          <Carousel 
          
          fade>
            <CarouselItem>
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[0].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[0].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[0].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].day.condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].day.condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[0].chance_of_rain}%</span>
<img className="rain-icon" src={rain} alt="rain" />
              </Card.Body>
            </Card>
      
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[1].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[1].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[1].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[1].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[1].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[1].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[2].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[2].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[2].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[2].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[2].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[2].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
      </Stack>
      </CarouselItem>
      <CarouselItem>
<Stack
direction="horizontal"
className="h-100 justify-content-center align-items-center"
gap={3}
>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[3].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[3].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[3].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[3].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[3].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[3].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[4].time.split(" ")[1]} AM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[4].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[4].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[4].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[4].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[4].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[5].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[5].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[5].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[5].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[5].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[5].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
            </Stack>
            </CarouselItem>
            <CarouselItem>
      <Stack
      direction="horizontal"
      className="h-100 justify-content-center align-items-center"
      gap={3}
      >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[6].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[6].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[6].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[6].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[6].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[6].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
       
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[7].time.split(" ")[1]} AM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[7].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[7].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[7].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[7].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[7].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[8].time.split(" ")[1]} AM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[8].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[8].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[8].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[8].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[8].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>


      </Stack>
      </CarouselItem>
      <CarouselItem>
      <Stack
      direction="horizontal"
      className="h-100 justify-content-center align-items-center"
      gap={3}
      >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[9].time.split(" ")[1]} AM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[9].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[9].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[9].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[9].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[9].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[10].time.split(" ")[1]} AM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[10].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[10].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[10].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[10].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[10].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[11].time.split(" ")[1]} AM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[11].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[11].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[11].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[11].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[11].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
</Stack>  
</CarouselItem>          
</Carousel>
            


          </div>



          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <h4 className='before-midday'>After Midday, <span className='day-7-location-span'>{hourlyWeatherData.location.name}, {hourlyWeatherData.forecast.forecastday[0].date}</span></h4>


          <div className='weather-7-container'>

          <Carousel fade>
      <Carousel.Item>
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[12].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[12].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[12].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[12].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[12].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[12].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[13].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[13].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[13].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[13].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[13].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[13].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[14].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[14].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[14].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[14].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[14].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[14].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
            </Stack>
      </Carousel.Item>


      <Carousel.Item>
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[15].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[15].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[15].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[15].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[15].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[15].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>

        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[16].time.split(" ")[1]} PM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[16].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[16].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[16].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[16].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[16].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[17].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[17].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[17].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[17].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[17].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[17].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
            </Stack>
      </Carousel.Item>


      <Carousel.Item>
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[18].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[18].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[18].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[18].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[18].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[18].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[19].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[19].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[19].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[19].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[19].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[19].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[20].time.split(" ")[1]} PM

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[20].condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[20].temp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[20].condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={hourlyWeatherData.forecast.forecastday[0].hour[20].condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[20].chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
</Stack>
      </Carousel.Item>


      <Carousel.Item>
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[21].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[21].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[21].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[21].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[21].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[21].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[22].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[22].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[22].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[22].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[22].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[22].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Card id="card" className='item card-7-forecast ' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{hourlyWeatherData.forecast.forecastday[0].hour[23].time.split(" ")[1]} PM

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[23].condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[23].temp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[23].condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={hourlyWeatherData.forecast.forecastday[0].hour[23].condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{hourlyWeatherData.forecast.forecastday[0].hour[23].chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
            </Stack>
      </Carousel.Item>

    </Carousel>
         
          </div>




        </>
      ) : (
        
        ""
      )}

{weekWeatherData ? (
        <>
          
        </>
      ) : (
        ""
      )}


      {weekWeatherData ? (
        <>
          <h3 className='week-7-heading'>One week weather forecast for <span className='day-7-location-span'>{weekWeatherData.location.name}, {weekWeatherData.location.country}</span></h3>

    <Carousel className="weekly-carousel " fade>
    <CarouselItem className="week-4-days">
      <Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={4}
  >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Card id="" className=' card-7-forecast week-forecast' >



              <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[0].date}

                  {/* <DisplayDate /> */}
                </h2>
                </Card.Title>
                <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[0].day.condition.text}</p>
                </Card.Title>
                <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</p>

                  {(isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={weekWeatherData.forecast.forecastday[0].day.condition.icon}
                    />
                  }

                  {(!isDayTime) &&
                    <Card.Img className='w-100 card-image-7' variant='top'
                      // type="image/svg"
                      src={weekWeatherData.forecast.forecastday[0].day.condition.icon}
                    />
                  }

                </Card.Title>
                <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                <img className="rain-icon" src={rain} alt="rain" />

              </Card.Body>
            </Card>
      <Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[1].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[1].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[1].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[1].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[1].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[1].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>



      <Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[2].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[2].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[2].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[2].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[2].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[2].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>

      

      
      
  


      <Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[3].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[3].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[3].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[3].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[3].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[3].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>

</Stack>
</CarouselItem>
<Carousel.Item className='week-3-days'>

<Stack
    direction="horizontal"
    className="h-100 justify-content-center align-items-center"
    gap={3}>



      <Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[4].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[4].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[4].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[4].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[4].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[4].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>






<Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[5].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[5].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[5].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[5].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[5].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[5].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>






<Card id="card" className=' card-7-forecast week-forecast' >



<Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>

  <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7">{weekWeatherData.forecast.forecastday[6].date}

    {/* <DisplayDate /> */}
  </h2>
  </Card.Title>
  <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[6].day.condition.text}</p>
  </Card.Title>
  <Card.Title className="temp-7-info-container text-center pb-1" ><p className="temperature-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[6].day.avgtemp_c}°C</p>

    {(isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[6].day.condition.icon}
      />
    }

    {(!isDayTime) &&
      <Card.Img className='w-100 card-image-7' variant='top'
        // type="image/svg"
        src={weekWeatherData.forecast.forecastday[6].day.condition.icon}
      />
    }

  </Card.Title>
  <h4 className="chance-of-rain">Chance of rain: </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[6].day.daily_chance_of_rain}%</span>
  <img className="rain-icon" src={rain} alt="rain" />

</Card.Body>
</Card>
</Stack>
</Carousel.Item>

    </Carousel>
  



          
          <div className='week-container'>
            
           




            

          </div>




        </>
      ) : (
        
        ""
      )}

      <Footer />
    </div>
  );
};

export default Weather;