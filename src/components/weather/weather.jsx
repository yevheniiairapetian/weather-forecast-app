import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherAlert } from '../weather-alert/weather-alert';
import { Navbar, Container, Row, Col, Nav, Image } from "react-bootstrap";
import imgLogo from './img/img-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo, faCircleQuestion, faFloppyDisk, faGear, faSun, faMoon, faWind, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';
import useDarkMode from "./../../hooks/useDarkMode";
import leaf from './img/leaf.svg';
import fallenLeaf from './img/fallenLeaf.svg';
import sunglasses from './img/sunSunglasses.svg';
import orangeLeaf from './img/orangeLeaf.svg';
import redLeaf from './img/redLeaf.svg';
import cactus from './img/cactus.svg';
import umbrella from './img/umbrella.svg';
import fire from './img/fire.svg';
import violetLeaf from './img/violetLeaf.svg';
import rain from './img/rain.png';
import barometer from './img/barometer.svg';
import { ScrollToAnchor } from "../scroll-to-anchor/scroll-to-anchor";
import { Button, Card, CarouselItem, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

import { Footer } from '../footer/footer';
import { GetDay } from '../get-day/get-day';
import { GetTodayDay } from '../get-today-day copy/get-today-day';
import { GetTomorrowDay } from '../get-tomorrow-day copy/get-tomorrow-day';
import { GetAfterTomorrowDay } from '../get-after-tomorrow-day/get-after-tomorrow-day';
import { GetThirdDay } from '../get-third-day/get-third-day';
import { GetFourthDay } from '../get-fourth-day/get-fourth-day';
import { GetFifthDay } from '../get-fifth-day/get-fifth-day';
import { GetLastDay } from '../get-last-day/get-last-day';
import useSound from 'use-sound';
import Click from './src/click.mp3';


const Weather = () => {
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showDarkModal, setShowDarkModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const handleShowLightModal = () => setShowLightModal(true);
  const handleShowDarkModal = () => setShowDarkModal(true);
  const handleCloseLightModal = () => setShowLightModal(false);
  const handleCloseDarkModal = () => setShowDarkModal(false);
  const [expanded, setExpanded] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [weekWeatherData, setWeekWeatherData] = useState(null);
  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20
  const [showCityModal, setShowCityModal] = useState(false);
  const handleShowCityModal = () => setShowCityModal(true);
  const handleCloseCityModal = () => setShowCityModal(false);
  const [showImperialModal, setShowImperialModal] = useState(false);
  const handleShowImperialModal = () => setShowImperialModal(true);
  const handleCloseImperialModal = () => setShowImperialModal(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const handleShowMetricModal = () => setShowMetricModal(true);
  const handleCloseMetricModal = () => setShowMetricModal(false);
  const [showFailedCityModal, setShowFailedCityModal] = useState(false);
  const handleShowFailedCityModal = () => setShowFailedCityModal(true);
  const handleCloseFailedCityModal = () => setShowFailedCityModal(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCelcToggled, setIsCelcToggled] = useState(() => {
    const saved = localStorage.getItem('isCelcToggled');
    return saved !== null ? JSON.parse(saved) : false;
  });

  function clearInput() {

    document.querySelector(".city-search-input").value = "";
  }



  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=b6b68ae835d04defa94134215242409&q=${city}&days=1&aqi=yes&alerts=yes
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

  function toggleCelcBGColor() {

    document.querySelector(".temp-measure-select-button:first-child").style.backgroundColor = "yellow";
    document.querySelector(".temp-measure-select-button:first-child").style.transition = "all 0.2s ease-in";
    document.querySelector(".temp-measure-select-button:last-child").style.backgroundColor = "lightgrey";
    document.querySelector(".temp-measure-select-button:last-child").style.transition = "all 0.2s ease-in";

  }

  function toggleFahrBGColor() {
    document.querySelector(".temp-measure-select-button:first-child").style.backgroundColor = "lightgrey";
    document.querySelector(".temp-measure-select-button:first-child").style.transition = "all 0.2s ease-in";
    document.querySelector(".temp-measure-select-button:last-child").style.backgroundColor = "yellow";
    document.querySelector(".temp-measure-select-button:last-child").style.transition = "all 0.2s ease-in";

  }

  const fetchHourly = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=b6b68ae835d04defa94134215242409&q=${city}&days=1&aqi=yes&alerts=yes

`
      );
      setHourlyWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  const WeatherAlert = () => {


    useEffect(() => {
      // const alertClosed = localStorage.getItem('alertClosed');
      // if (alertClosed) {
      //   setIsVisible(false);
      // }
    }, []);

    const handleClose = () => {
      setIsVisible(false);
      // localStorage.setItem('alertClosed', 'true');
    };

    // if (!isVisible) return null;

    return (
      <>


        {(hourlyWeatherData.current.air_quality.pm2_5 >= 35 || hourlyWeatherData.current.air_quality.pm10 >= 45 || hourlyWeatherData.current.air_quality.no2 >= 25) && (
          <Alert variant="danger" onClose={handleClose} dismissible>


            <Alert.Heading> <FontAwesomeIcon icon={faCircleInfo} beatFade size="md" style={{ color: "#337cb4", }} /> Air Quality Alert</Alert.Heading>
            <p>High air pollution in <strong><em>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</em></strong>! The levels of air pollutants have exceeded safe limits. For your health and safety, it is advised to stay indoors. Please keep windows closed and use air purifiers if available. Avoid outdoor activities, especially if you have respiratory conditions or other health concerns.
            </p>
            <div className="d-flex justify-content-end">
              {/* <Button onClick={handleClose} variant="outline-danger">
                Close
              </Button> */}
            </div>
          </Alert>
        )}
      </>
    );
  };

  const UVAlert = () => {


    useEffect(() => {
      // const alertClosed = localStorage.getItem('alertClosed');
      // if (alertClosed) {
      //   setIsVisible(false);
      // }
    }, []);

    const handleUVClose = () => {
      setIsVisible(false);
      // localStorage.setItem('alertClosed', 'true');
    };

    // if (!isVisible) return null;

    return (
      <>


        {(hourlyWeatherData.current.uv >= 6 && hourlyWeatherData.current.uv < 10) && (
          <Alert className="alert-modal" variant="danger" onClose={handleUVClose} dismissible>


            <Alert.Heading> <FontAwesomeIcon icon={faCircleInfo} beatFade size="md" style={{ color: "#337cb4", }} /><img className="air-uv-icons" src={umbrella} alt="Umbrella icon" /> UV Index Alert <img className="air-uv-icons" src={umbrella} alt="Umbrella icon" /></Alert.Heading>
            <p>The UV index in <strong><em>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</em></strong> is currently <strong><em>{hourlyWeatherData.current.uv}</em></strong>, indicating high levels of UV radiation. </p>

            <p>Please take the following protective measures:</p>
            <ol>
              <li>Wear protective clothing, including a wide-brimmed hat and sunglasses.</li>
              <li>Apply broad-spectrum sunscreen with SPF 30 or higher every 2 hours.
              </li>
              <li>Limit outdoor activities during peak sun hours (10 AM - 4 PM).
              </li>

            </ol>
            <p>Stay safe and protect your skin! 🌤️</p>






          </Alert>
        )}
      </>
    );
  };

  const ExtremeUVAlert = () => {


    useEffect(() => {
      // const alertClosed = localStorage.getItem('alertClosed');
      // if (alertClosed) {
      //   setIsVisible(false);
      // }
    }, []);

    const handleExtremeUVClose = () => {
      setIsVisible(false);
      // localStorage.setItem('alertClosed', 'true');
    };

    // if (!isVisible) return null;

    return (
      <>


        {(hourlyWeatherData.current.uv >= 10) && (
          <Alert variant="danger" onClose={handleExtremeUVClose} dismissible>


            <Alert.Heading> <FontAwesomeIcon icon={faCircleInfo} beatFade size="md" style={{ color: "#337cb4", }} /> ⚠️ UV Alert: Very High UV Index! ⚠️</Alert.Heading>
            <p>The UV index in <strong><em>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</em></strong> is currently at 10 or higher, indicating a very high risk of harm from unprotected sun exposure. </p>

            <p>Please take the following precautions:</p>
            <ol>
              <li>Wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.</li>
              <li>Apply broad-spectrum sunscreen with SPF 30+ every 2 hours, even on cloudy days.
              </li>
              <li>Seek shade between 10 a.m. and 4 p.m.
              </li>
              <li>Stay hydrated and avoid strenuous outdoor activities.</li>

            </ol>
            <p>Stay safe and protect your skin! 🌤️</p>






          </Alert>
        )}
      </>
    );
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


  useEffect(() => {
    const savedCity = localStorage.getItem('defaultCity');
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isCelcToggled', JSON.stringify(isCelcToggled));
  }, [isCelcToggled]);






  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  function saveCity() {
    let input = document.querySelector(".city-search-input");

    if (input.value == '' || input.value == 'undefined' || input.value == 'null') {

      handleShowFailedCityModal();

    }
    else if (city) {
      localStorage.setItem('defaultCity', city);
      handleShowCityModal();
    }


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    fetchDaily();
    fetchHourly();
    fetchWeekly();
  };

  const SaveMyCity = () => {
    return <button title="Save the city" onClick={() => { saveCity(); }
    } className="button-save-city">
      <FontAwesomeIcon className="save-icon" style={{ "--fa-animation-iteration-count": "1" }} icon={faFloppyDisk} fade size="lg" />
      <span className='save-city-span'>Save City</span></button>

  };

  const ClickThemeDark = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn pl-3" onClick={() => { play(); setDarkMode(!isDarkMode); handleShowLightModal(); setExpanded(false) }}>

      <FontAwesomeIcon size="2xl" className="sun" title='Switch the light mode on' icon={faSun} fade style={{ color: "#FFD43B", "--fa-animation-iteration-count": "2" }} />
    </button>
    // onClick={() => {setVisible(!visible)}}
  };


  const ClickThemeLight = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn pl-3" onClick={() => { play(); setDarkMode(!isDarkMode); handleShowDarkModal(); setExpanded(false) }}>
      <FontAwesomeIcon size="2xl" className="moon" title='Switch the dark mode on' icon={faMoon} fade style={{ color: "#000000", "--fa-animation-iteration-count": "2" }} />
    </button>
    // onClick={() => {setVisible(!visible)}}
  };

  return (
    <div className='contain'>


      <Navbar expanded={expanded} className="page-header" expand="xl" id="navigation">
        <Container className="navigation">
          <ScrollToAnchor />
          <Navbar.Brand className="p-2 brand" as={Link} to="/" expand="lg">
            {/* <Nav.Link className="" as={Link} to='/'> */}
            <h1 onClick={() => setExpanded(false)}
              className="app-heading">Better Wetter<img className="img-logo" src={imgLogo} alt="Better Wetter App Logo" /></h1>


          </Navbar.Brand>
          <Navbar.Toggle id="tgl" onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <div className='form-heading-container'>
              <form className="weather-form" onSubmit={handleSubmit}>

                <input
                  className="city-search-input"
                  type="text"
                  placeholder="Search by city name"
                  value={city.charAt(0).toUpperCase() + city.slice(1)}
                  onChange={handleInputChange}
                />
                <SaveMyCity />

                <button title="Clear the search field" onClick={clearInput} className="clear-input-button" type="button"> <FontAwesomeIcon className="clear-input-icon" icon={faX} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
                {/* <Nav.Link title="User guide" onClick={() => setExpanded(false)} className="text-light pe-4" as={Link} to='/guide'>
      <FontAwesomeIcon className='question-icon' icon={faCircleQuestion} size="lg" />
							</Nav.Link> */}

              </form>
              <div className="measurement-systems">

                <div className="temp-measure-select">
                  <button title="Switch to the metric system" className="temp-measure-select-button" onClick={() => { setIsCelcToggled(true); toggleCelcBGColor(); handleShowMetricModal() }}>SI</button>
                  <button title="Switch to the imperial system" className="temp-measure-select-button" onClick={() => { setIsCelcToggled(false); toggleFahrBGColor(); handleShowImperialModal() }}>IMP</button>

                </div>

              </div>
              {isDarkMode ? (
                <ClickThemeDark />) : (
                <ClickThemeLight />

              )}
            </div>

          </Navbar.Collapse>


        </Container>
      </Navbar>


      {hourlyWeatherData ? (
        <>
          <Card id="card" className='item main-weather-card card ' >

            <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
              <div className='air-info-container'>
                <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city">{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country} as of <span style={{ color: '#fbbc04' }}> <GetDay />, {hourlyWeatherData.location.localtime} </span>
                </h2>
                </Card.Title>
                <div className='weather-air-uv-container'>
                <Card.Title className="temp-info-container text-center pb-1" >
                  {(isCelcToggled) && <p className="temperature-info" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.current.feelslike_c) + '°C'}</p>}  {(!isCelcToggled) && <p className="temperature-info" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.current.feelslike_f) + '°F'}</p>}

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
                <Card.Title className="item-info text-center pb-1" ><p className="humidity-info" style={{ color: "whitesmoke" }}>Humidity : <FontAwesomeIcon icon={faHandHoldingDroplet} style={{color: "#FFD43B",}} /> {hourlyWeatherData.current.humidity}%</p></Card.Title>
                <Card.Title className="item-info text-center" >
                  {(isCelcToggled) && <p className="pressure-info" style={{ color: "whitesmoke" }}>Pressure: <img className="barometer-icon" src={barometer} alt="Barometer icon" /> {Math.round(hourlyWeatherData.current.pressure_mb) + ' mbar'}</p>} {(!isCelcToggled) && <p className="wind-speed-info" style={{ color: "whitesmoke" }}>Pressure: <img className="barometer-icon" src={barometer} alt="Barometer icon" /> {Math.round(hourlyWeatherData.current.pressure_in) + ' inHg'}</p>}

                </Card.Title>
                <Card.Title className="item-info text-center pb-1" >
                  {(isCelcToggled) && <p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed: <FontAwesomeIcon icon={faWind} fade style={{color: "#e3db0d",}} /> {Math.round(hourlyWeatherData.current.wind_kph) + ' km/h'}</p>} {(!isCelcToggled) && <p className="wind-speed-info" style={{ color: "whitesmoke" }}>Wind Speed: <FontAwesomeIcon icon={faWind} fade style={{color: "#e3db0d",}} /> {Math.round(hourlyWeatherData.current.wind_kph) + ' Mi/h'}</p>}


                </Card.Title>
                <Card.Title className="item-info text-center pb-1" ><p className="uv-info" style={{ color: "whitesmoke" }}>UV Index :
                  {hourlyWeatherData.current.uv <= 2 && <><span className=''>{" " + (hourlyWeatherData.current.uv)}</span><span className='co2-polution-good '> <span >🌞</span> Good </span></>}
                  {(hourlyWeatherData.current.uv >= 3 && hourlyWeatherData.current.uv <= 5) && <><span className=''>{" " + (hourlyWeatherData.current.uv)}</span><span className='co2-polution-moderate'> <img className="air-uv-icons" src={sunglasses} alt="Sun with sunglasses icon" /> Moderate</span></>}
                  {(hourlyWeatherData.current.uv >= 6 && hourlyWeatherData.current.uv <= 7) && <><span className=''>{" " + (hourlyWeatherData.current.uv)}</span><span className='co2-polution-unhealthy'> <img className="air-uv-icons" src={umbrella} alt="Sun umbrella icon" /> High</span></>}
                  {(hourlyWeatherData.current.uv >= 8 && hourlyWeatherData.current.uv <= 10) && <><span className=''>{" " + (hourlyWeatherData.current.uv)}</span><span className='co2-polution-very-unhealthy'> <img className="air-uv-icons" src={cactus} alt="Cactus icon" /> Very High</span></>}
                  {(hourlyWeatherData.current.uv >= 11) && <><span className=''>{" " + (hourlyWeatherData.current.uv)}</span><span className='co2-polution-hazard'> <img className="air-uv-icons" src={fire} alt="Fire icon" /> Extreme</span></>}
                </p>
                </Card.Title>
                <Card.Title className="item-info text-center pb-1 air-polution-header"><h3 className="air-polution-heading" >Air Polution</h3></Card.Title>

                <Card.Title className="item-info text-center" ><p className="co-info" style={{ color: "whitesmoke" }}>CO<sub>2</sub>:
                  {hourlyWeatherData.current.air_quality.co <= 700 && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-good'><img className="air-uv-icons" src={leaf} alt="Green leaf icon" /> Good 
                    
                    </span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 701 && hourlyWeatherData.current.air_quality.co <= 800) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-moderate'> <img className="air-uv-icons" src={fallenLeaf} alt="Yellow leaf icon" /> Moderate</span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 801 && hourlyWeatherData.current.air_quality.co <= 1100) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-poor'> <img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" /> Poor</span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 1101 && hourlyWeatherData.current.air_quality.co <= 1500) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-unhealthy'><img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" /> Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 1501 && hourlyWeatherData.current.air_quality.co <= 2000) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-very-unhealthy'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Very Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 2001 && hourlyWeatherData.current.air_quality.co <= 3000) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-hazard'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Hazardous</span></>}
                  {(hourlyWeatherData.current.air_quality.co >= 3001 && hourlyWeatherData.current.air_quality.co <= 5000) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.co)}</span><span className='co2-polution-extreme'> <img className="air-uv-icons" src={violetLeaf} alt="Violet leaf icon" /> Extreme</span></>}
                </p>
                </Card.Title>

                <Card.Title className="item-info text-center pb-1" ><p className="pm25-info" style={{ color: "whitesmoke" }}>PM2.5:
                  {hourlyWeatherData.current.air_quality.pm2_5 <= 12 && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-good'> <img className="air-uv-icons" src={leaf} alt="Green leaf icon" /> Good 
                                    </span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 12 && hourlyWeatherData.current.air_quality.pm2_5 <= 35) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-moderate'> <img className="air-uv-icons" src={fallenLeaf} alt="Green leaf icon" /> Moderate</span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 35 && hourlyWeatherData.current.air_quality.pm2_5 <= 56) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-poor'> <img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" /> Poor</span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 56 && hourlyWeatherData.current.air_quality.pm2_5 <= 150) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-unhealthy'> <img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" /> Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 150 && hourlyWeatherData.current.air_quality.pm2_5 <= 250) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-very-unhealthy'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Very Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 250 && hourlyWeatherData.current.air_quality.pm2_5 <= 300) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-hazard'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Hazardous</span></>}
                  {(hourlyWeatherData.current.air_quality.pm2_5 > 300 && hourlyWeatherData.current.air_quality.pm2_5 <= 500) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm2_5)}</span><span className='co2-polution-extreme'> <img className="air-uv-icons" src={violetLeaf} alt="Violet leaf icon" /> Extreme</span></>}
                </p>
                </Card.Title>


                <Card.Title className="item-info text-center pb-1" ><p className="pm10-info" style={{ color: "whitesmoke" }}>PM10:
                  {hourlyWeatherData.current.air_quality.pm10 <= 54 && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-good'> <img className="air-uv-icons" src={leaf} alt="Green leaf icon" /> Good </span></>}
                  {(hourlyWeatherData.current.air_quality.pm10 > 54 && hourlyWeatherData.current.air_quality.pm10 <= 154) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-moderate'> <img className="air-uv-icons" src={fallenLeaf} alt="Green leaf icon" /> Moderate</span></>}
                  {(hourlyWeatherData.current.air_quality.pm10 >= 155 && hourlyWeatherData.current.air_quality.pm10 <= 254) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-unhealthy'> <img className="air-uv-icons" src={orangeLeaf} alt="Green leaf icon" /> Unhealthy (certain senstive groups may be affected)</span></>}
                  {(hourlyWeatherData.current.air_quality.pm10 >= 255 && hourlyWeatherData.current.air_quality.pm10 <= 354) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-unhealthy'><img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" />  Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.pm10 >= 355 && hourlyWeatherData.current.air_quality.pm10 <= 424) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-hazard'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Very Unhealthy</span></>}
                  {(hourlyWeatherData.current.air_quality.pm10 >= 425) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.pm10)}</span><span className='co2-polution-very-unhealthy'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Hazardous</span></>}
                </p>
                </Card.Title>

                <Card.Title className="item-info text-center pb-1" ><p className="no2-info" style={{ color: "whitesmoke" }}>NO2:
                  {hourlyWeatherData.current.air_quality.no2 <= 40 && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-good'><img className="air-uv-icons" src={leaf} alt="Green leaf icon" /> Good 
                  </span></>}
                  {(hourlyWeatherData.current.air_quality.no2 > 40 && hourlyWeatherData.current.air_quality.no2 <= 80) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-satisfactory'> <img className="air-uv-icons" src={leaf} alt="Green leaf icon" /> Satisfactory</span></>}
                  {(hourlyWeatherData.current.air_quality.no2 > 80 && hourlyWeatherData.current.air_quality.no2 <= 180) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-moderate'> <img className="air-uv-icons" src={fallenLeaf} alt="Green leaf icon" /> Moderate</span></>}
                  {(hourlyWeatherData.current.air_quality.no2 > 180 && hourlyWeatherData.current.air_quality.no2 <= 280) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-poor'> <img className="air-uv-icons" src={orangeLeaf} alt="Orange leaf icon" /> Poor</span></>}
                  {(hourlyWeatherData.current.air_quality.no2 > 280 && hourlyWeatherData.current.air_quality.no2 <= 400) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-unhealthy'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Very Poor</span></>}
                  {(hourlyWeatherData.current.air_quality.no2 > 400) && <><span className=''>{" " + Math.round(hourlyWeatherData.current.air_quality.no2)}</span><span className='co2-polution-very-unhealthy'> <img className="air-uv-icons" src={redLeaf} alt="Red leaf icon" /> Severe</span></>}
                </p>

                </Card.Title>
                </div>
              </div>
              <UVAlert />

              <ExtremeUVAlert/>

              <WeatherAlert />




            </Card.Body>


          </Card>







        </>
      ) : (
        <div style={{ height: "100vh" }}>

          <div className="pre-request-text">
            <FontAwesomeIcon icon={faCircleInfo} beatFade size="lg" style={{ color: "#337cb4", }} />
            <span className='pre-request-text-span'>Start by typing a <span className='city-name-pre'>city name</span>, a <span className='postal-code-pre'>postal code</span> or a <span className='postal-code-pre'>latitude/longitude pair</span> in the search field above. </span><br />
            <span className='pre-request-text-example'>For example:</span><br />
            <p>
              <ol className='pre-request-text-list'>
                <li><em className="city-name-pre">Berlin</em></li>
                <li><em className="postal-code-pre">10001</em></li>
                <li><em className="postal-code-pre">48.8567,2.3508</em></li>

              </ol>
            </p>

          </div>





        </div>
      )}


      {
        hourlyWeatherData ? (
          <>
            <h3 className='day-24-heading'>24-hour weather forecast for <span className='day-7-location-span'>{hourlyWeatherData.location.name}  {hourlyWeatherData.location.country}</span></h3>
            <h4 className='before-midday'>Before Midday, <span className='day-7-location-span'>{hourlyWeatherData.location.name}, <GetDay />, {hourlyWeatherData.forecast.forecastday[0].date}</span></h4>


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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[0].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[0].temp_f) + '°F'}</p>}



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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[1].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[1].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[2].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[2].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[3].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[3].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[4].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[4].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[5].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[5].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[6].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[6].temp_f) + '°F'}</p>}

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
                        <Card.Title className="item-info-7 text-center pb-1 " >
                          <p className="sky-info-7" style={{ color: "whitesmoke" }}>{hourlyWeatherData.forecast.forecastday[0].hour[7].condition.text}</p>
                        </Card.Title>
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[7].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[7].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[8].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[9].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[9].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[10].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[10].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[11].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[11].temp_f) + '°F'}</p>}

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
            <h4 className='before-midday'>After Midday, <span className='day-7-location-span'>{hourlyWeatherData.location.name}, <GetDay />, {hourlyWeatherData.forecast.forecastday[0].date}</span></h4>


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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[12].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[12].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[13].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[13].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[14].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[14].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[15].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[15].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[16].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[16].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[17].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[17].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[18].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[18].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[19].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[19].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[20].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[20].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[21].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[22].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[22].temp_f) + '°F'}</p>}

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
                        <Card.Title className="temp-7-info-container text-center pb-1" >
                          {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[23].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(hourlyWeatherData.forecast.forecastday[0].hour[23].temp_f) + '°F'}</p>}

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
        )
      }

      {
        weekWeatherData ? (
          <>

          </>
        ) : (
          ""
        )
      }


      {
        weekWeatherData ? (
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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetTodayDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[0].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].day.avgtemp_f) + '°F'}</p>}


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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetTomorrowDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[1].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].day.avgtemp_f) + '°F'}</p>}

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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetAfterTomorrowDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[2].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].day.avgtemp_f) + '°F'}</p>}

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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetThirdDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[3].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].day.avgtemp_f) + '°F'}</p>}

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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetFourthDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[4].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].day.avgtemp_f) + '°F'}</p>}

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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetFifthDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[5].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].day.avgtemp_f) + '°F'}</p>}

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

                      <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetLastDay /></span>

                        {/* <DisplayDate /> */}
                      </h2>
                      </Card.Title>
                      <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[6].day.condition.text}</p>
                      </Card.Title>
                      <Card.Title className="temp-7-info-container text-center pb-1" >
                        {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].day.avgtemp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].day.avgtemp_f) + '°F'}</p>}

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
        )
      }

      <Footer />
      <Modal

        className="favorite-modal" show={showCityModal} onHide={handleCloseCityModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Default city set to </span>
          {hourlyWeatherData && (<span className='default-city'>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</span>)}
        </Modal.Body>
        <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseCityModal}>OK</Button>

      </Modal>

      <Modal

        className="favorite-modal" show={showFailedCityModal} onHide={handleCloseFailedCityModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Please first type a city name</span> </Modal.Body>

        <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseFailedCityModal}>OK</Button>

      </Modal><Modal

        className="favorite-modal" show={showMetricModal} onHide={handleCloseMetricModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Info is now displayed in the metric system</span>  </Modal.Body>

        <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseMetricModal}>OK</Button>

      </Modal>

      <Modal

        className="favorite-modal" show={showImperialModal} onHide={handleCloseImperialModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>Info is now displayed in the imperial system</span> </Modal.Body>

        <Button title="Confirm" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseImperialModal}>OK</Button>

      </Modal>

      <Modal

        className="favorite-modal" show={showDarkModal} onHide={handleCloseDarkModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /> You are now in dark mode</Modal.Body>

        <Button title="Close the notification window" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseDarkModal}>OK</Button>

      </Modal>

      <Modal

        className="favorite-modal" show={showLightModal} onHide={handleCloseLightModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-dark bg-white"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /> You are now in light mode

        </Modal.Body>

        <Button title="Close the notification window" className="got-it-button light-modal-button" onClick={handleCloseLightModal}>OK</Button>
      </Modal>

    </div >
  );
};

export default Weather;