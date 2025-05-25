import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherAlert } from '../weather-alert/weather-alert';
import { Navbar, Container, Row, Col, Nav, Image } from "react-bootstrap";
import imgLogo from './img/img-logo.png';
import { useTranslation } from "react-i18next";

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
import rainDrops from './img/rain-drops.svg';

import useSound from 'use-sound';
import Click from './src/click.mp3';

export const WeekView = () => {
    const { t, i18n } = useTranslation();
  
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
  const languages = [
      { name: "EN", code: "en" },
      { name: "DE", code: "de" },
      { name: "ES", code: "es" },
      // { name: "PT", code: "pt" },
      // { name: "IT", code: "it" },
      // { name: "FR", code: "fr" },
      { name: "UK", code: "uk" },
      // { name: "RU", code: "ru" },
      // { name: "MK", code: "mk" },
      // { name: "PL", code: "pl" },
      // { name: "日本語", code: "ja" },
      // { name: "中文", code: "zh" },
      // { name: "한국어", code: "ko_KR" },
      // { name: "TR", code: "tr" },
      // { name: "العربية", code: "ar", dir: "rtl" },
  
    ];
    const currentLocale = Cookies.get("i18next") || "en";
    const currentLangObj = languages.find((lang) => lang.code === currentLocale);
  
    const [language, setLanguage] = useState(currentLocale);
  
    const handleChangeLocale = (e) => {
      const lang = e.target.value;
      setLanguage(lang);
      i18n.changeLanguage(lang);
    };

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
    return <button title={t("save-city-title")} onClick={() => { saveCity(); }
    } className="button-save-city">
      <FontAwesomeIcon className="save-icon" style={{ "--fa-animation-iteration-count": "1" }} icon={faFloppyDisk} fade size="lg" />
      <span className='save-city-span'>{t("save-city")}</span></button>

  };

  const ClickThemeDark = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn pl-3" onClick={() => { play(); setDarkMode(!isDarkMode); handleShowLightModal(); setExpanded(false) }}>

      <FontAwesomeIcon size="2xl" className="sun" title={t("light-theme-title")} icon={faSun} fade style={{ color: "#FFD43B", "--fa-animation-iteration-count": "2" }} />
    </button>
    // onClick={() => {setVisible(!visible)}}
  };

  const ClickLanguage = () => {
    const [play] = useSound(Click);
    // const { soundsEnabled } = useSoundSettings();

    return <div className="lang-wrapper">
      <select title={t("langHint")} className="lang-choose" onChange={handleChangeLocale} onClick={() => { play() }} value={language}>
        {languages.map(({ name, code }) => (
          <option className="lang-option-text" key={code} value={code}> {name}</option>
        ))}
      </select>
      <div className="custom-dropdown"></div> {/* Fake styled option */}
    </div>
  };



  const ClickThemeLight = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn pl-3" onClick={() => { play(); setDarkMode(!isDarkMode); handleShowDarkModal(); setExpanded(false) }}>
      <FontAwesomeIcon size="2xl" className="moon" title={t("dark-theme-title")} icon={faMoon} fade style={{ color: "#000000", "--fa-animation-iteration-count": "2" }} />
    </button>
    // onClick={() => {setVisible(!visible)}}
  };

  const SetMyLocation = () => {
    const [play] = useSound(Click);
    return <button className="toggle_btn location pl-3" onClick={() => { play(); FetchUserLocation(); handleShowLocationModal(); setExpanded(false) }}>
      <FontAwesomeIcon size="2xl" className="moon location_btn" title={t("set-location-title")} icon={faLocationDot} style={{ color: "whitesmoke", "--fa-animation-iteration-count": "1" }} />
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
                        placeholder={t("search-placeholder")}
                        value={city}
                        onChange={handleInputChange}
                      />
                      <SaveMyCity />
      
                      <button title={t("search-clear-title")} onClick={clearInput} className="clear-input-button" type="button"> <FontAwesomeIcon className="clear-input-icon" icon={faX} fade size="lg" style={{ color: "#fff", "--fa-animation-iteration-count": "2" }} /></button>
                      {/* <Nav.Link title="User guide" onClick={() => setExpanded(false)} className="text-light pe-4" as={Link} to='/guide'>
            <FontAwesomeIcon className='question-icon' icon={faCircleQuestion} size="lg" />
                    </Nav.Link> */}
      
                    </form>
                    <div className="measurement-systems">
      
                      <TempMeasureSelect setIsCelcToggled={setIsCelcToggled} />
      
                    </div>
                    <div className='toggle-location-container'>
                      <SetMyLocation />
                      <div className="switcher pl-3 lang-active">
      
                        <ClickLanguage />
                      </div>
                      {isDarkMode ? (
                        <ClickThemeDark />) : (
                        <ClickThemeLight />
      
                      )}
                    </div>
                  </div>
                  <div className='weather-forecast-options'>
                    <Link className="weather-forecast-option" onClick={() => setExpanded(!expanded)} to={"/"}  >
                      <span className="weather-forecast-option-text">{t("menu-all")}</span></Link>
                    <Link className="weather-forecast-option" onClick={() => setExpanded(!expanded)} to={"./../current-view"}  >
                      <span className="weather-forecast-option-text">{t("menu-now")}</span></Link>
      
                    <Link className="weather-forecast-option" onClick={() => setExpanded(!expanded)} to={"./../complete-day-view"}  >
                      <span className="weather-forecast-option-text">{t("menu-today")}</span></Link>
      
                    <Link className="weather-forecast-option" onClick={() => setExpanded(!expanded)} to={"./../week-view"}  >
                      <span className="weather-forecast-option-text">{t("menu-week")}</span></Link>
      
      
                  </div>
      
                </Navbar.Collapse>
      
      
      
              </Container>
      
            </Navbar>

       {
              weekWeatherData ? (
                <>
                  <h3 className='week-7-heading'>{t("one-week-forecast-text")} <span className='day-7-location-span'></span></h3>
      
                  <Carousel className="weekly-carousel day7-carousel" fade>
                    <CarouselItem className="week-4-days">
                      <Stack  
                        direction="horizontal"
                        className="h-100 justify-content-center align-items-center week-stack-small-screen"
                        gap={4}
                      >
                        {/* <ExampleCarouselImage text="First slide" /> */}
                        <Card id="" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetTodayDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[0].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                              <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
      
                                  {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].hour[8].temp_f) + '°F'}</p>}
                                  {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[0].hour[21].temp_f) + '°F'}</p>}
                                </div>
                                <div className='week-condition-icon-container'>
                                  {(isDayTime) &&
                                    <Card.Img className='w-100 card-image-7' variant='top'
                                      // type="image/svg"
                                      src={weekWeatherData.forecast.forecastday[0].hour[8].condition.icon}
                                    />
                                  }
      
                                  {(!isDayTime) &&
                                    <Card.Img className='w-100 card-image-7' variant='top'
                                      // type="image/svg"
                                      src={weekWeatherData.forecast.forecastday[0].hour[8].condition.icon}
                                    />
                                  }
      
                                  {(isDayTime) &&
                                    <Card.Img className='w-100 card-image-7' variant='top'
                                      // type="image/svg"
                                      src={weekWeatherData.forecast.forecastday[0].hour[21].condition.icon}
                                    />
                                  }
      
                                  {(!isDayTime) &&
                                    <Card.Img className='w-100 card-image-7' variant='top'
                                      // type="image/svg"
                                      src={weekWeatherData.forecast.forecastday[0].hour[21].condition.icon}
                                    />
                                  }
                                </div>
                              </div>
      
      
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={{rainDrops}} alt="rain" />
      
                          </Card.Body>
                        </Card>
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetTomorrowDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[1].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                              <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[1].hour[21].temp_f) + '°F'}</p>}
                    </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[1].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[1].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[1].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[1].hour[21].condition.icon}
                                />
                              }
                              </div>
                              </div>
      
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[1].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={rain} alt="rain" />
      
                          </Card.Body>
                        </Card>
      
      
      
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetAfterTomorrowDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[2].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                              
                              <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[2].hour[21].temp_f) + '°F'}</p>}
                  </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[2].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[2].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[2].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[2].hour[21].condition.icon}
                                />
                              }
                </div>
                </div>
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[2].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={rain} alt="rain" />
      
                          </Card.Body>
                        </Card>
      
      
      
      
      
      
      
      
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetThirdDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[3].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                               <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[3].hour[21].temp_f) + '°F'}</p>}
                </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[3].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[3].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[3].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[3].hour[21].condition.icon}
                                />
                              }
                </div>
                </div>
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[3].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={rain} alt="rain" />
      
                          </Card.Body>
                        </Card>
      
                      </Stack>
                    </CarouselItem>
                    <Carousel.Item className='week-3-days'>
      
                      <Stack 
                        direction="horizontal"
                        className="h-100 justify-content-center align-items-center week-stack-small-screen"
                        gap={3}>
      
      
      
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetFourthDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[4].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                             <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[4].hour[21].temp_f) + '°F'}</p>}
                  </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[4].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[4].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[4].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[4].hour[21].condition.icon}
                                />
                              }
                  </div>
                  </div>
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[4].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={rain} alt="rain" />
      
                          </Card.Body>
                        </Card>
      
      
      
      
      
      
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetFifthDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[5].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                              <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[5].hour[21].temp_f) + '°F'}</p>}
                    </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[5].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[5].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[5].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[5].hour[21].condition.icon}
                                />
                              }
                              </div>
                              </div>
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[5].day.daily_chance_of_rain}%</span>
                            <img className="rain-icon" src={rain} alt="rain" />
      
                          </Card.Body>
                        </Card>
      
      
      
      
      
      
                        <Card id="card" className=' card-7-forecast day7 week-forecast' >
      
      
      
                          <Card.Body className={isDayTime ? "card-body moving-background-light" : "card-body moving-background-dark"}>
      
                            <Card.Title id="card-title" className="item-title text-center fs-6 pb-3 pt-3"><h2 className="weather-city-7"><span className='day-7-week-day'><GetLastDay /></span>
      
                              {/* <DisplayDate /> */}
                            </h2>
                            </Card.Title>
                            <Card.Title className="item-info-7 text-center pb-1 " ><p className="sky-info-7" style={{ color: "whitesmoke" }}>{weekWeatherData.forecast.forecastday[6].day.condition.text}</p>
                            </Card.Title>
                            <Card.Title className="temp-7-info-container text-center pb-1" >
                               <div className='week-am-pm-container'>
                                <div className='week-temp-container'>
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].hour[8].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].hour[8].temp_f) + '°F'}</p>}
                              {(isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].hour[21].temp_c) + '°C'}</p>} {(!isCelcToggled) && <p className="temperature-info-7" style={{ color: "whitesmoke" }}>{Math.round(weekWeatherData.forecast.forecastday[6].hour[21].temp_f) + '°F'}</p>}
                  </div>
                                <div className='week-condition-icon-container'>
      
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[6].hour[8].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[6].hour[8].condition.icon}
                                />
                              }
                              {(isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[6].hour[21].condition.icon}
                                />
                              }
      
                              {(!isDayTime) &&
                                <Card.Img className='w-100 card-image-7' variant='top'
                                  // type="image/svg"
                                  src={weekWeatherData.forecast.forecastday[6].hour[21].condition.icon}
                                />
                              }
                    </div>
                    </div>
                            </Card.Title>
                            <h4 className="chance-of-rain">{t("rain-chance")} </h4><span className='chance-of-rain-data'>{weekWeatherData.forecast.forecastday[6].day.daily_chance_of_rain}%</span>
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
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>{t("default-city-set")}</span>
                {hourlyWeatherData && (<span className='default-city'>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</span>)}
              </Modal.Body>
              <Button title={t("modal-confirm-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseCityModal}>{t("modal-confirm")}</Button>
      
            </Modal>
      
            <Modal
      
              className="favorite-modal" show={showFailedCityModal} onHide={handleCloseFailedCityModal}>
              <Modal.Header closeButton>
                {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
              </Modal.Header>
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>{t("type-city-first")}</span> </Modal.Body>
      
              <Button title={t("modal-confirm-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseFailedCityModal}>{t("modal-confirm")}</Button>
      
            </Modal><Modal
      
              className="favorite-modal" show={showMetricModal} onHide={handleCloseMetricModal}>
              <Modal.Header closeButton>
                {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
              </Modal.Header>
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>{t("info-is-metric")}</span>  </Modal.Body>
      
              <Button title={t("modal-confirm-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseMetricModal}>{t("modal-confirm")}</Button>
      
            </Modal>
      
            <Modal
      
              className="favorite-modal" show={showImperialModal} onHide={handleCloseImperialModal}>
              <Modal.Header closeButton>
                {/* <Modal.Title className="text-success">Favorites</Modal.Title> */}
              </Modal.Header>
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" /><span className='default-city-note'>{t("info-is-imperial")}</span> </Modal.Body>
      
              <Button title={t("modal-confirm-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseImperialModal}>{t("modal-confirm")}</Button>
      
            </Modal>
      
            <Modal
      
              className="favorite-modal" show={showDarkModal} onHide={handleCloseDarkModal}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" />{t("dark-mode-activated")}</Modal.Body>
      
              <Button title={t("close-modal-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseDarkModal}>{t("modal-confirm")}</Button>
      
            </Modal>
            <Modal
      
              className="favorite-modal" show={showLocationModal} onHide={handleCloseLocationModal}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="text-dark bg-white dark-modal-body"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" />
                <span className=''>{t("weather-is-for-location")}</span> <br />{hourlyWeatherData && (<span className='default-city'>{hourlyWeatherData.location.name}, {hourlyWeatherData.location.country}</span>)}
              </Modal.Body>
      
              <Button title={t("close-modal-title")} className="got-it-button text-dark bg-white dark-modal-button" onClick={handleCloseLocationModal}>{t("modal-confirm")}</Button>
      
            </Modal>
            <Modal
      
              className="favorite-modal" show={showLightModal} onHide={handleCloseLightModal}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="text-dark bg-white"><FontAwesomeIcon className="pr-2" icon={faCircleInfo} fade style={{ color: "#529fcc", }} size="lg" />{t("light-mode-activated")}
      
              </Modal.Body>
      
              <Button title={t("close-modal-title")} className="got-it-button light-modal-button" onClick={handleCloseLightModal}>{t("modal-confirm")}</Button>
            </Modal>

    </div >




  )
}


