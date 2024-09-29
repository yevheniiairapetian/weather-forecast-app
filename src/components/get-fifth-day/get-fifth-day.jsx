import React, { Component } from 'react';


 export const GetFifthDay = () =>{
  let today = new Date();

  // Add one day to the current date
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 5);
  
  // Get the day of the week for tomorrow (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  let dayOfWeek = tomorrow.getDay();

  // Array of day names
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get the name of the day
let tomorrowDayName = dayNames[dayOfWeek];

return (
<span>{tomorrowDayName}</span>
)
  }
  
