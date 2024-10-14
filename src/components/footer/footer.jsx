import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Nav } from "react-bootstrap";


export const Footer = ()=>{
  return(
    <div className='footer'>
      <p className='footer-info-title'><span className='footer-app-name'>Better Wetter App &copy;</span></p>
      {/* <p>Powered by <a className="powered-by-link" href="https://www.weatherapi.com/" title="Weather API" target="_blank">WeatherAPI.com</a></p> */}
      <p className='footer-info-copy'>All rights reserved, 2024</p>

      <Nav.Link className="text-light footer-links" as={Link} to='/impressum'>Impressum</Nav.Link>

    </div>
  )
}