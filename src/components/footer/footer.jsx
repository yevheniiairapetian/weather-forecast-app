import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export const Footer = ()=>{
    const { t, i18n } = useTranslation();
  
  return(
    <div className='footer'>
      <p className='footer-info-title pt-3'><span className='footer-app-name'>Better Wetter App &copy;</span></p>
      {/* <p>Powered by <a className="powered-by-link" href="https://www.weatherapi.com/" title="Weather API" target="_blank">WeatherAPI.com</a></p> */}
      <div className="footer-links-container">
      <Nav.Link className="text-light footer-links" as={Link} to={"https://www.freeprivacypolicy.com/live/ff5ed076-848c-4497-9332-a7f2f0c2c251"} target="_blank" >{t("privacy-policy")}</Nav.Link>
      <Nav.Link className="text-light footer-links" as={Link} to='/impressum'>{t("imprint")}</Nav.Link>
    <Nav.Link className="text-light footer-links" as={Link} to={"https://www.freeprivacypolicy.com/live/1fa49d34-d4c5-4a16-8198-5018fff05d3b"} target="_blank" >{t("cookies")}</Nav.Link>
    <Nav.Link className="text-light footer-links" as={Link} to={"https://www.freeprivacypolicy.com/live/a77d5807-a2af-4cf8-a26c-25f0b915bc1e"} target="_blank" >{t("terms-conditions")}</Nav.Link>
</div>
<p className='footer-info-copy pt-4 pb-2'>{t("rights-reserved")}</p>

    </div>
  )
}