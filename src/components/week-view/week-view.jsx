import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherAlert } from '../weather-alert/weather-alert';
import { Navbar, Container, Row, Col, Nav, Image } from "react-bootstrap";
import imgLogo from './img/img-logo.png';
import Cookies from "js-cookie";
import { TempMeasureSelect } from '../temp-measure-select/temp-measure-select';
import { useGeolocated } from "react-geolocated";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo, faCircleQuestion, faLocationDot, faFloppyDisk, faGear, faSun, faMoon, faWind, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';
import useDarkMode from "./../../hooks/useDarkMode";
import leaf from './img/leaf.svg';
import fallenLeaf from './img/fallenLeaf.svg';
import north from './img/north.svg';
import south from './img/south.svg';
import west from './img/west.svg';
import east from './img/east.svg';
import northEast from './img/northEast.svg';
import southEast from './img/southEast.svg';
import northWest from './img/northWest.svg';
import southWest from './img/southWest.svg';
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

export const WeekView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showDarkModal, setShowDarkModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const handleShowLightModal = () => setShowLightModal(true);
  const handleShowDarkModal = () => setShowDarkModal(true);
  const handleShowLocationModal = () => setShowLocationModal(true);
  const handleCloseLightModal = () => setShowLightModal(false);
  const handleCloseDarkModal = () => setShowDarkModal(false);
  const handleCloseLocationModal = () => setShowLocationModal(false);
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
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
   const [isCelcToggled, setIsCelcToggled] = useState(true);
  

  function clearInput() {

    document.querySelector(".city-search-input").value = "";
  }


  function FetchUserLocation() {

    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : coords ? (
      setCity(coords.latitude + ',' + coords.longitude)



    ) : (
      <div>Getting your location&hellip; </div>
    );
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

  const fetchWeekly = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=b6b68ae835d04defa94134215242409&q=${city}&days=7&aqi=yes&alerts=yes
    
    
    `
      );
      setWeekWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

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


  };
  useEffect(() => {
    fetchData();
    // fetchDaily();
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
    // fetchData();
    // fetchDaily();
    fetchHourly();
    // fetchWeekly();
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

  const SetMyLocation = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn location pl-3" onClick={() => { play(); FetchUserLocation(); handleShowLocationModal(); setExpanded(false) }}>
      <FontAwesomeIcon size="2xl" className="moon location_btn" title='Set my current location' icon={faLocationDot} bounce style={{ color: "whitesmoke", "--fa-animation-iteration-count": "1" }} />
    </button>

  }
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
                  value={city}
                  onChange={handleInputChange}
                />
                <SaveMyCity />

                <button title="Clear the search field" onClick={clearInput} className="clear-input-button" type="button"> <FontAwesomeIcon className="clear-input-icon" icon={faX} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>


              </form>
              <div className="measurement-systems">

                               <TempMeasureSelect setIsCelcToggled={setIsCelcToggled} />
                
              </div>
              <div className='toggle-location-container'>

                <SetMyLocation />

                {isDarkMode ? (
                  <ClickThemeDark />) : (
                  <ClickThemeLight />

                )}
              </div>
            </div>
            <div className='weather-forecast-options'>
              <Link className="weather-forecast-option" onClick={() => setExpanded(!expanded)} to={"/"}  >
                <span className="weather-forecast-option-text">All</span></Link>
              <Nav.Link className="weather-forecast-option" as={Link} nClick={() => setExpanded(!expanded)} to={"./../current-view"}  >
                <span className="weather-forecast-option-text">Now</span></Nav.Link>

              <Nav.Link className="weather-forecast-option" as={Link} nClick={() => setExpanded(!expanded)} to={"./../complete-day-view"}  >
                <span className="weather-forecast-option-text">Today</span></Nav.Link>

              <Nav.Link className="weather-forecast-option" as={Link} nClick={() => setExpanded(!expanded)} to={"./"}  >
                <span className="weather-forecast-option-text">Week</span></Nav.Link>


            </div>

          </Navbar.Collapse>



        </Container>

      </Navbar>

      {
        hourlyWeatherData ? (
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
          <>
            {(city) &&
              <div className="preloader" style={{ opacity: 1 }}>
                <svg version="1.1" id="sun" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xmlSpace="preserve" style={{ opacity: 1, marginLeft: "0px", marginTop: "0px" }}>
                  <g>
                    <path fill="none" d="M6.942,3.876c-0.4-0.692-1.146-1.123-1.946-1.123c-0.392,0-0.779,0.104-1.121,0.301c-1.072,0.619-1.44,1.994-0.821,3.067C3.454,6.815,4.2,7.245,5,7.245c0.392,0,0.779-0.104,1.121-0.301C6.64,6.644,7.013,6.159,7.167,5.581C7.321,5,7.243,4.396,6.942,3.876z M6.88,5.505C6.745,6.007,6.423,6.427,5.973,6.688C5.676,6.858,5.34,6.948,5,6.948c-0.695,0-1.343-0.373-1.69-0.975C2.774,5.043,3.093,3.849,4.024,3.312C4.32,3.14,4.656,3.05,4.996,3.05c0.695,0,1.342,0.374,1.69,0.975C6.946,4.476,7.015,5,6.88,5.505z"></path>
                    <path fill="none" d="M8.759,2.828C8.718,2.757,8.626,2.732,8.556,2.774L7.345,3.473c-0.07,0.041-0.094,0.132-0.053,0.202C7.319,3.723,7.368,3.75,7.419,3.75c0.025,0,0.053-0.007,0.074-0.02l1.211-0.699C8.774,2.989,8.8,2.899,8.759,2.828z"></path>
                    <path fill="none" d="M1.238,7.171c0.027,0.047,0.077,0.074,0.128,0.074c0.025,0,0.051-0.008,0.074-0.02l1.211-0.699c0.071-0.041,0.095-0.133,0.054-0.203S2.574,6.228,2.503,6.269l-1.21,0.699C1.221,7.009,1.197,7.101,1.238,7.171z"></path>
                    <path fill="none" d="M6.396,2.726c0.052,0,0.102-0.026,0.13-0.075l0.349-0.605C6.915,1.976,6.89,1.885,6.819,1.844c-0.07-0.042-0.162-0.017-0.202,0.054L6.269,2.503C6.228,2.574,6.251,2.666,6.322,2.706C6.346,2.719,6.371,2.726,6.396,2.726z"></path>
                    <path fill="none" d="M3.472,7.347L3.123,7.952c-0.041,0.07-0.017,0.162,0.054,0.203C3.2,8.169,3.226,8.175,3.25,8.175c0.052,0,0.102-0.027,0.129-0.074l0.349-0.605c0.041-0.07,0.017-0.16-0.054-0.203C3.603,7.251,3.513,7.276,3.472,7.347z"></path>
                    <path fill="none" d="M3.601,2.726c0.025,0,0.051-0.007,0.074-0.02C3.746,2.666,3.77,2.574,3.729,2.503l-0.35-0.604C3.338,1.828,3.248,1.804,3.177,1.844C3.106,1.886,3.082,1.976,3.123,2.047l0.35,0.604C3.5,2.7,3.549,2.726,3.601,2.726z"></path>
                    <path fill="none" d="M6.321,7.292c-0.07,0.043-0.094,0.133-0.054,0.203l0.351,0.605c0.026,0.047,0.076,0.074,0.127,0.074c0.025,0,0.051-0.006,0.074-0.02c0.072-0.041,0.096-0.133,0.055-0.203l-0.35-0.605C6.483,7.276,6.393,7.253,6.321,7.292z"></path>
                    <path fill="none" d="M2.202,5.146c0.082,0,0.149-0.065,0.149-0.147S2.284,4.851,2.202,4.851H1.503c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147H2.202z"></path>
                    <path fill="none" d="M8.493,4.851H7.794c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147l0,0h0.699c0.082,0,0.148-0.065,0.148-0.147S8.575,4.851,8.493,4.851L8.493,4.851z"></path>
                    <path fill="none" d="M5.146,2.203V0.805c0-0.082-0.066-0.148-0.148-0.148c-0.082,0-0.148,0.066-0.148,0.148v1.398c0,0.082,0.066,0.149,0.148,0.149C5.08,2.352,5.146,2.285,5.146,2.203z"></path>
                    <path fill="none" d="M4.85,7.796v1.396c0,0.082,0.066,0.15,0.148,0.15c0.082,0,0.148-0.068,0.148-0.15V7.796c0-0.082-0.066-0.148-0.148-0.148C4.917,7.647,4.85,7.714,4.85,7.796z"></path>
                    <path fill="none" d="M2.651,3.473L1.44,2.774C1.369,2.732,1.279,2.757,1.238,2.828C1.197,2.899,1.221,2.989,1.292,3.031l1.21,0.699c0.023,0.013,0.049,0.02,0.074,0.02c0.051,0,0.101-0.026,0.129-0.075C2.747,3.604,2.722,3.514,2.651,3.473z"></path>
                    <path fill="none" d="M8.704,6.968L7.493,6.269c-0.07-0.041-0.162-0.016-0.201,0.055c-0.041,0.07-0.018,0.162,0.053,0.203l1.211,0.699c0.023,0.012,0.049,0.02,0.074,0.02c0.051,0,0.102-0.027,0.129-0.074C8.8,7.101,8.776,7.009,8.704,6.968z"></path>
                  </g>
                </svg>

                <svg version="1.1" id="cloud" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xmlSpace="preserve">
                  <path fill="none" d="M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z"></path>
                </svg>

                <div className="rain">
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                  <span className="drop"></span>
                </div>

                <div className="text">
                  CHECKING THE WEATHER FOR YOU... JUST A MOMENT
                </div>
              </div>
            }
            {(!city) &&
              <div style={{ height: "100vh" }}>

                <div className="pre-request-text">
                  <FontAwesomeIcon icon={faCircleInfo} beatFade size="lg" style={{ color: "#337cb4", }} />
                  <span className='pre-request-text-span'>Start by typing a <span className='city-name-pre'>city name</span>, a <span className='postal-code-pre'>postal code</span> or a <span className='postal-code-pre'>latitude / longitude pair</span> in the search field or clicking on the <em className='city-name-pre'>map icon </em>above. </span><br />
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
            }
          </>


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

        className="favorite-modal" show={showLocationModal} onHide={handleCloseLocationModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" />
          <span className=''> The weather is being shown for your location: </span> <br />{hourlyWeatherData && (<span className='default-city'>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</span>)}
        </Modal.Body>

        <Button title="Close the notification window" className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseLocationModal}>OK</Button>

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




  )
}


