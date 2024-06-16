# Better Wetter App - Weather Forecasts

This project contains a responsive Progressive Web App designed with React and React Bootstrap. It fetches weather data from the [Open Weather Map API](https://openweathermap.org/) and displays it in the front-end interface. Users can search for a city and instantly see weather information for that city (current and hourly). The app was deployed to Netlify and Vercel.
Read more about [Netlify](https://www.netlify.com/) and [Vercel](https://vercel.com/)


## Available features

1. Search for a city and see current weather data.
   Users can see information including (but not limited to):
   - City and country names
   - Temperature (in Celcius)
   - An icon representing the weather (e.g. Light rain or Clear Sky)
   - Condition of the sky
   - Humidity (in percents)
   - Feels like information (real temperature feeling, in Celcius)
   - Pressure
   - Wind speed (in meters per second)
   
2. Search for a city and see the daily 3-hour weather forecast for that city.
   Users can see information including (but not limited to):
   - City and country names
   - Date and hours (in 3-hour range for a 24-hour timespan)
   - Condition of the sky
   - Temperature (in Celcius)
   - An icon representing the weather (e.g. Light rain or Clear Sky)
3. Install the app on mobile/desktop devices like a native app.
When installed, it allows to:
- Use the app, resembling a native-app experience.
- Have an improved user experience
- Experience cross-platform compatibility
- Make use of faster loading times
- Use offline accessibility
- Have smaller size than a native desktop app
- Access the app quickly via a mobile home screen, a Windows/Mac taskbar, etc

Read more about the Progressive Web Apps [here](https://www.itaims.com/blog/benefits-of-progressive-web-apps-pwa-advantages-and-disadvantages)
Read more about the Open Weather Map API [here](https://openweathermap.org/)


## Clone and Preview 
1. To clone the app use the following command:
```console git clone git@github.com:yevheniiairapetian/weather-forecast-app```
Or download directly by clicking on <> Code button > Download ZIP. Make sure you have Node installed on your machine. To check if you have Node installed, run the ```node -v``` command. If Node is not installed, use the preferred package manager:
- For npm on Windows, run the ```npm install nodejs``` command 
- For Mac, run the ```brew install node``` command
- For Linux Debian/Ubuntu-based systems run the ```sudo apt-get install nodejs``` command
- For Red Hat/Fedora-based systems run the ```sudo yum install nodejs
command
2. Then navigate to the folder using the ```cd weather-forecast-app``` terminal command. Then run the ```npm i``` command (or similar, depending on the package manager) to install the project dependencies. 3. After that, follow the scripts in the section below.

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

### `live versions`
The app is live at [Netlify](https://better-wetter.netlify.app/) and [Vercel](https://better-wetter.vercel.app/)

