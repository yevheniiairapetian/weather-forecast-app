import { Navbar, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { Footer } from "../footer/footer";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo, faCircleQuestion, faFloppyDisk, faGear, faSun, faMoon, faWind, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import impressumCSS from './css/impressum.css';
import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import useDarkMode from "./../../hooks/useDarkMode";
import imgLogo from './img/img-logo.png'
import { ScrollToAnchor } from "../scroll-to-anchor/scroll-to-anchor";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import useSound from 'use-sound';
import Click from './src/click.mp3';
export const ImpressumView = () => {
  // const [isDarkMode, setDarkMode] = useDarkMode();
  const [showDarkModal, setShowDarkModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const handleShowLightModal = () => setShowLightModal(true);
  const handleShowDarkModal = () => setShowDarkModal(true);
  const handleCloseLightModal = () => setShowLightModal(false);
  const handleCloseDarkModal = () => setShowDarkModal(false);
  const [isVisible, setIsVisible] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
    // localStorage.setItem('alertClosed', 'true');
  };

    const { t, i18n } = useTranslation();


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
    

    return (
        <div >

      <Navbar expanded={expanded} className="page-header" expand="xl" id="navigation">
                 <Container className="navigation not-found-container">
                          <ScrollToAnchor />
                          <Navbar.Brand className="p-2 brand" as={Link} to="/" expand="lg">
                            {/* <Nav.Link className="" as={Link} to='/'> */}
                            <h1 onClick={() => setExpanded(false)}
                              className="app-heading">Better Wetter<img className="img-logo" src={imgLogo} alt="Better Wetter App Logo" /></h1>
                
                
                          </Navbar.Brand>
                          <Navbar.Toggle id="tgl" onClick={() => setExpanded(!expanded)} />

                    <Navbar.Collapse id="basic-navbar-nav not-found-nav" className="justify-content-end">

<div className="measurement-systems">


              </div>
              <div className='toggle-location-container'>
                {/* <SetMyLocation /> */}
                
                
              </div>


                        <div className='weather-forecast-options'>
                                      <Link className="weather-forecast-option nav-link-not-found" onClick={() => setExpanded(!expanded)} to={"/"}  >
                                        <span  className="weather-forecast-option-text not-found-menu-text">{t("menu-all")}</span></Link>
                                      <Link className="weather-forecast-option nav-link-not-found" onClick={() => setExpanded(!expanded)} to={"./../current-view"}  >
                                        <span  className="weather-forecast-option-text not-found-menu-text">{t("menu-now")}</span></Link>
                        
                                      <Link className="weather-forecast-option nav-link-not-found" onClick={() => setExpanded(!expanded)} to={"./../complete-day-view"}  >
                                        <span  className="weather-forecast-option-text not-found-menu-text">{t("menu-today")}</span></Link>
                        
                                      <Link className="weather-forecast-option nav-link-not-found" onClick={() => setExpanded(!expanded)} to={"./../week-view"}  >
                                        <span  className="weather-forecast-option-text not-found-menu-text">{t("menu-week")}</span></Link>
                                      <Link className="weather-forecast-option nav-link-lang-not-found"  >
                                                <ClickLanguage />
</Link>
                                    </div>

                    </Navbar.Collapse>


                </Container>
            </Navbar>
      <Container className="wrapper container">

        <Row className=''>
          <Col sm={10} md={10} className="m-auto mb-4 pb-4">
            <div className="impressum-section">
              <h1 className="impressum-main-heading mt-5">{t("imprint")}</h1>
              <h3>{t("content-according-to")}</h3><br />
              <p>Yevhenii Airapetian</p>
              <p>c/o IP-Management #42686</p>
              <p>Ludwig-Erhard-Str. 18</p>
              <p>20459 Hamburg</p><br />
              <h4>
                <p><strong>{t("contact")}</strong></p>
              </h4>
              <p>{t("tel")} +4915237795765
              </p>
              <p>{t("email")} <Link className="impressum-links" to="contact@yevheniiairapetian.com">contact@yevheniiairapetian.com</Link></p>

              <span>{t("powered-by")} </span> <span className="impressum-links" >Impressum-Privatschutz</span>

            </div>
          </Col>
        </Row>
      </Container>

      <Footer />


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
    </div>

  )
}