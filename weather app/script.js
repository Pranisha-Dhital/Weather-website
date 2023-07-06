// Retrieving DOM elements
const timeEl = document.getElementById('time');// Reference to the element with id 'time'
const dateEl = document.getElementById('date');// Reference to the element with id 'date'
const currentWeatherItemsEl = document.getElementById('current-weather-items');// Reference to the element with id 'current-weather-items'
const timezone = document.getElementById('time-zone');// Reference to the element with id 'time-zone
const countryEl = document.getElementById('country');// Reference to the element with id 'country'
const weatherForecastEl = document.getElementById('weather-forecast');// Reference to the element with id 'weather-forecast'
const currentTempEl = document.getElementById('current-temp');// Reference to the element with id 'current-temp'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];// Array containing the names of the days
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];// Array containing the names of the months

// Function to update time and date
setInterval(() => {
    const time = new Date();// Creating a new Date object
    const month = time.getMonth();// Getting the current month (0-11)
    const date = time.getDate();// Getting the current date (1-31)
    const day = time.getDay();// Getting the current day of the week (0-6)
    const hour = time.getHours();// Getting the current hour (0-23)
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour// Converting to 12-hour format
    const minutes = time.getMinutes();  // Getting the current minutes
    const ampm = hour >=12 ? 'PM' : 'AM'  // Setting the AM/PM indicator based on the hour

    // Updating the time element with formatted time
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    // Updating the date element with formatted date
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

// Function to fetch weather data for the assigned city
async function getweatherdata(){
    const res = await fetch ("https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=22a5209446f4494834a0280d5305b011&unit=metric")
    const data= await res.json();
    console.log(data)
    // Updating the respective elements with weather data
    document.querySelector('.humidity').innerHTML= Math.round(data.main.humidity) +"%";
    document.querySelector('.pressure').innerHTML=data.main.pressure +" "+"mbar";
    document.querySelector('.wind_speed').innerHTML= Math.round(data.wind.speed) + "km/h";
    document.querySelector('.time-zone').innerHTML= (data.name);
    document.querySelector('.country').innerHTML= (data.sys.country);
    document.querySelector(".temp").innerHTML = (data.main.temp - 273.15).toFixed(2) + "&#176;C" +" "+"Current temperature";


}

// Fetch weather data for assigned city
getweatherdata();

// Function to fetch weather data based on user search
async function getWeatherBySearch() {
    const searchQuery = document.getElementById("search-box").value;
    const apiKey = "22a5209446f4494834a0280d5305b011";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=22a5209446f4494834a0280d5305b011&unit=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // Updating the respective elements with weather data for searched city
        document.querySelector('.humidity').innerHTML = Math.round(data.main.humidity) + "%";
        document.querySelector('.pressure').innerHTML = data.main.pressure + " mbar";
        document.querySelector('.wind_speed').innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector('.time-zone').innerHTML = data.name;
        document.querySelector('.country').innerHTML = data.sys.country;
        document.querySelector(".temp").innerHTML = (data.main.temp - 273.15).toFixed(2) + "&#176;C" + " - " +"Current temperature";

        // Updating the weather icon with the appropriate image
        const weatherIcon = document.querySelector('.w-icon');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        console.log(error);
    }
}
// Add event listener to the search box for fetching weather data on user search
document.getElementById("search-box").addEventListener("click", getWeatherBySearch);

// Fetch weather data for the searched city
getWeatherBySearch();