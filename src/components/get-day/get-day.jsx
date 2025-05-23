import React, { Component } from 'react';
import { useTranslation } from "react-i18next";


 export const GetDay = () =>{
          const { t, i18n } = useTranslation();
  
    const today = new Date();
const dayOfWeek = today.getDay();
const days = [
        t("day-sunday"),
        t("day-monday"),
        t("day-tuesday"),
        t("day-wednesday"),
        t("day-thursday"),
        t("day-friday"),
        t("day-saturday")
    ];
return (
<span>{days[dayOfWeek]}</span>
)
  }
  
