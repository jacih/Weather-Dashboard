# Weather-Dashboard


## Application Overview

The Weather Dashboard application takes a user's input and retrieves corresponding data from two OpenWeatherMap APIs and renders the data to the user's browser, dynamically updating the associated HTML elements and some CSS attributes. 

The focus for the application is to provide the user with temperature, wind speed, humidity, uv index and the weather's corresponding image icon on the current date of their search, for whichever city the user inputs. The app also provides a five day forecast for their search input, rendering each of the following days as separate cards with date, temperature, humidity, wind-speed and the corresponding weather icon. 

Upon input the city name is saved in the user's local storage and used to populate a recently searched list of buttons, which can be clicked to view city weather details again. If the application's window/tab is closed, upon reopening, the user will see the rendered weather data for their last searched city. If the user accidentally selects search on an empty input, they will be prompted to enter a valid city name. Return/Enter keypress has been disabled from the search unput field, so that only clicking on the search button triggers the application's functions. Upon initial application load, when the user's local storage is empty, the search results fields have been hidden so that only the search input form appears on the page. Lastly, specialized classes based on the uv index of the current searched city have been added dynamically to the css which alter the element value's background colour based on a [standardized rating system](https://www.canada.ca/en/environment-climate-change/services/weather-health/uv-index-sun-safety/about.html).


### Technologies Used

- [Geocoding API](https://openweathermap.org/api/geocoding-api)
- [One-Call API](https://openweathermap.org/api/one-call-api)
- [Moment.js](https://momentjs.com/)
- [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [jQuery](https://jquery.com/)
- [Google Fonts](https://fonts.google.com/?query=Public+Sans)


## Mock-Up

![WeatherDashboard_screenshot](https://user-images.githubusercontent.com/97176042/152900217-d8d09693-d1ef-40d8-8d70-8874b2fe8510.png)

[Demo Quicktime Video](../images/Weather_Dashboard_demo.mov)


## Application Links

[Live Staging Link](https://jacih.github.io/Weather-Dashboard/)

[GitHub Repository](https://github.com/jacih/Weather-Dashboard.git)


## License

[Repo License](/LICENSE)

[Apache 2.0 Detailed Documentation](https://www.apache.org/licenses/LICENSE-2.0)
