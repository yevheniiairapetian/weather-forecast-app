# Better Wetter App - Weather Forecasts

This project contains a responsive Progressive Web App designed with React and React Bootstrap. It fetches weather data from the [Open Weather Map API](https://openweathermap.org/) and displays it in the front-end interface. Users can search for a city and instantly see weather information for that city (current and hourly). The app is deployed to Vercel.

Read more about:
- [Open Weather Map API](https://openweathermap.org/)
- [Vercel](https://vercel.com/)

## Project Screenshot

<a href="[https://ibb.co/Mh7SPnS](https://ibb.co/Mh7SPnS)"><img src="https://i.ibb.co/sPqRsjR/2024-07-11-17h56-16.png" alt="Better Wetter app screenshot" border="0"></a>   

## Available features

1. Search for a city and see current weather data.
   Users can see information including (but not limited to):
   - City and country names
   - Temperature (in Celcius)
   - Condition of the sky (actual weather)
   - An icon representing the condition of the sky (e.g. Light rain or Clear Sky)
   - Humidity (in percentage)
   - Feels like information (real temperature feeling, in Celcius)
   - Pressure
   - Wind speed (in meters per second)
   
2. Search for a city and see the daily 3-hour weather forecast for that city.
   Users can see information including (but not limited to):
   - City and country names
   - Date and hours (in a 3-hour range for a 24-hour timespan)
   - Condition of the sky (actual weather)
   - An icon representing the condition of the sky (e.g. Light rain or Clear Sky)
   - Temperature (in Celcius)
3. The interface changes its background and weather condition icons depending on the user's local time (day or night). Therefore:
   - The app's weather card and 3-hour-forecast cards' background changes to a brighter or darker image
   - The weather icons are changed to more time-appropriate ones (e.g. Few clouds icon is different for day and night)
4. Install the app on mobile/desktop devices like a native app.
When installed, it allows to:
- Use the app, resembling a native-app experience.
- Have an improved user experience
- Experience cross-platform compatibility
- Make use of faster loading times
- Use offline accessibility
- Have a smaller size than a native desktop app
- Access the app quickly via a mobile home screen, a Windows/Mac taskbar, etc

Read more about the Progressive Web Apps [here](https://www.itaims.com/blog/benefits-of-progressive-web-apps-pwa-advantages-and-disadvantages)

Read more about the Open Weather Map API [here](https://openweathermap.org/)


## Technologies Used
- React
- React Bootstrap
- Axios
- Responsive design
- Progressive Web Apps (PWA)
- External API
- Netlify
- Vercel


## Project Dependencies
- Node v 16
- React.js as a framework
- React Bootstrap for styling
- Axios for fetching information from an API
- External [Open Weather Map API](https://openweathermap.org/) (for weather information)
- Service worker for enabling PWA functionality
- [Vercel](https://vercel.com/) for deployment

## External API 
As mentioned, the app relies on the external API: 
[Open Weather Map API](https://openweathermap.org/)


## Clone and Preview 
1. To clone the app use the following command:
```console git clone git@github.com:yevheniiairapetian/weather-forecast-app```
Or download directly by clicking on <> Code button > Download ZIP. Make sure you have Node installed on your machine. To check if you have Node installed, run the ```node -v``` command in the terminal. If Node is not installed, use the preferred package manager:
- For npm on Windows, run the ```npm install nodejs``` command 
- For Mac, run the ```brew install node``` command
- For Linux Debian/Ubuntu-based systems run the ```sudo apt-get install nodejs``` command
- For Red Hat/Fedora-based systems run the ```sudo yum install nodejs```
command
2. Then get back to the project folder and use the ```cd weather-forecast-app``` terminal command. Then run the ```npm i``` command (or similar, depending on the package manager) to install the project dependencies
  3. After that, follow the scripts in the section below*
  
   (*_the commands below are listed for npm_)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `Live Version`
The app is live at [www.better-wetter.com](https://www.better-wetter.com/)

## Contact:
Feel free to contact me via[ LinkedIn](https://www.linkedin.com/in/yevheniiairapetian/) or [email](mailto:contact@yevheniiairapetian.com) or via the contact information on my [portfolio](https://yevheniiairapetian.com/#/contact) 

