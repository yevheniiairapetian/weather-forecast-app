import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Modal } from 'react-bootstrap';
import { DisplayDate } from '../display-date/display-date';
import sunny from './../../img/sunny.gif'
import cloudy from './../../img/cloudy.gif'

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);


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
        <button className="get-weather-button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} fade size="lg" style={{ color: "#fff", backgroundColor: "#74C0FC", "--fa-animation-iteration-count": "2" }} /></button>
      </form>
      {weatherData ? (
        <>
          <Card id="card" className='item card mb-3' >



            <Card.Body>

              <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{weatherData.name}
                <DisplayDate />
              </h2>
              </Card.Title>

              <Card.Title className="temp-info-container text-center pb-1" ><p className="temperature-info">{weatherData.main.temp}°C</p>

                {weatherData.weather[0].description === 'clear sky' &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={sunny}
                  />
                }

                {weatherData.weather[0].description === 'scattered clouds' &&
                  <Card.Img className='w-100 card-image' variant='top'
                    type="image/gif"
                    src={cloudy}
                  />
                }
              </Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="sky-info">{weatherData.weather[0].description}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="feels-like-info">Feels like : {weatherData.main.feels_like}°C</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="humidity-info">Humidity : {weatherData.main.humidity}%</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="pressure-info">Pressure : {weatherData.main.pressure}</p></Card.Title>
              <Card.Title className="item-info text-center pb-1" ><p className="wind-speed-info">Wind Speed : {weatherData.wind.speed}m/s</p></Card.Title>


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