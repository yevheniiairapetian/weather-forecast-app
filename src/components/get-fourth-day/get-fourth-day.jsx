import React, { Component } from 'react';
import { useTranslation } from "react-i18next";


 export const GetFourthDay = () =>{
          const { t, i18n } = useTranslation();
  
  let today = new Date();

  // Add one day to the current date
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 4);
  
  // Get the day of the week for tomorrow (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  let dayOfWeek = tomorrow.getDay();

  // Array of day names
let dayNames = [
        t("day-sunday"),
        t("day-monday"),
        t("day-tuesday"),
        t("day-wednesday"),
        t("day-thursday"),
        t("day-friday"),
        t("day-saturday")
    ];

// Get the name of the day
let tomorrowDayName = dayNames[dayOfWeek];

return (
<span>{tomorrowDayName}</span>
)
  }
  
