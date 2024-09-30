import { useEffect, useState } from "react";

export default () => {
  const key = "isDarkMode";
  const [isDark, setIsDark] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // JSON.parse converts from Sting to Boolean
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      // If error return false, i.e, light mode
      return false;
    }
  });

  // Check if user has any preference in the local storage.
  // If not then load the system preference

  const darkModeEnabled =
    typeof isDark !== "undefined"
      ? isDark
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    const className = "dark";
    
    if (darkModeEnabled) {
      
      window.document.body.classList.add(className);
      window.document.querySelector(".navigation.container").classList.add(className);
      window.document.querySelector(".page-header").classList.add(className);
      window.document.querySelector(".measurement-systems").classList.add(className);
      window.document.querySelector(".weather-form").classList.add(className);
      window.document.querySelector(".app-heading").classList.add(className);
      window.document.querySelector(".clear-input-button").classList.add(className);
      window.document.querySelector(".form-heading-container").classList.add(className);
      window.document.querySelector(".toggle_btn").classList.add(className);
      window.document.querySelector(".contain").classList.add(className);
      window.document.querySelector(".footer").classList.add(className);
      window.document.querySelector(".footer-app-name").classList.add(className);
      window.document.querySelector(".clear-input-icon").classList.add(className);
     
      
      
    } else {
      window.document.body.classList.remove(className);
      window.document.querySelector(".navigation.container").classList.remove(className);
      window.document.querySelector(".page-header").classList.remove(className);
      window.document.querySelector(".measurement-systems").classList.remove(className);
      window.document.querySelector(".weather-form").classList.remove(className);
      window.document.querySelector(".app-heading").classList.remove(className);
      window.document.querySelector(".clear-input-button").classList.remove(className);
      window.document.querySelector(".form-heading-container").classList.remove(className);
      window.document.querySelector(".toggle_btn").classList.remove(className);
      window.document.querySelector(".contain").classList.remove(className);
      window.document.querySelector(".footer").classList.remove(className);
      window.document.querySelector(".footer-app-name").classList.remove(className);
      window.document.querySelector(".clear-input-icon").classList.remove(className);
     
      
      
    }
    try {
      window.localStorage.setItem(key, darkModeEnabled);
    } catch (e) {
      console.error("Error in setting preference");
    }
  }, [darkModeEnabled]);

  return [darkModeEnabled, setIsDark];
};