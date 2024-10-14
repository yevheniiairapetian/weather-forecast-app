import { Navbar, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { Footer } from "../footer/footer";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX, faCircleInfo, faCircleQuestion, faFloppyDisk, faGear, faSun, faMoon, faWind, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import impressumCSS from './css/impressum.css';
import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
import {Modal } from 'react-bootstrap';
// import useDarkMode from "./../../hooks/useDarkMode";
import imgLogo from './img/img-logo.png'
import { ScrollToAnchor } from "../scroll-to-anchor/scroll-to-anchor";

import useSound from 'use-sound';
import Click from './src/click.mp3';
export const ImpressumView = () =>{
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
    
    return(
        <div>
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
              
              <div className="measurement-systems">

                

              </div>
             
            </div>

          </Navbar.Collapse>


        </Container>
      </Navbar>
        <Container className="wrapper">
             
            <Row className="impressum-section">
                <Col sm={10} md={10} className="m-auto mb-4 pb-4">
             
            <h1 className="impressum-main-heading mt-5">Impressum</h1>
            <h3>Inhalte gemäß §5 DDG</h3><br/>
            <p>Yevhenii Airapetian</p>
            <p>c/o IP-Management #42686</p>
            <p>Ludwig-Erhard-Str. 18</p>
            <p>20459 Hamburg</p><br/>
            <h4>
                <p><strong>Kontaktdaten</strong></p>
            </h4>
            <p>Telefonnummer: +4915237795765
            </p>
            <p>E-Mail <Link className="impressum-links" to="contact@yevheniiairapetian.com">contact@yevheniiairapetian.com</Link></p>
            
            <span>Quelle </span> <span className="impressum-links" >Impressum-Privatschutz</span> 
               
        
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