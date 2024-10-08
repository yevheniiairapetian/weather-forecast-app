import React, { useEffect, useState } from 'react';

export const Footer = ()=>{
  return(
    <div className='footer'>
      <p className='footer-info-title'><span className='footer-app-name'>Better Wetter App</span></p>
      <p className='footer-info-copy'>All rights reserved, 2024 &copy;</p>
      <p>Powered by <a className="powered-by-link" href="https://www.weatherapi.com/" title="Weather API" target="_blank">WeatherAPI.com</a></p>
    </div>
  )
}