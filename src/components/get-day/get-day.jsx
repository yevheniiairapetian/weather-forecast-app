import React, { Component } from 'react';


 export const GetDay = () =>{
    const today = new Date();
const dayOfWeek = today.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
return (
<span>{days[dayOfWeek]}</span>
)
  }
  
