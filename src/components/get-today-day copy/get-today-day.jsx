import React, { Component } from 'react';


 export const GetTodayDay = () =>{
    const today = new Date();
const dayOfWeek = today.getDay();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return (
<span>{days[dayOfWeek]}</span>
)
  }
  
