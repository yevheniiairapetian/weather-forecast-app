import React, { useEffect, useState } from 'react';

export const Footer = ()=>{
  return(
    <div className='footer'>
      <p className='footer-info-title'><span className='footer-app-name'>Better Wetter App</span></p>
      <p className='footer-info-copy'>All rights reserved, 2024 &copy;</p>
    </div>
  )
}