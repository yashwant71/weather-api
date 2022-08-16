https://weather-temp-api.herokuapp.com/getWeather 
post request ->

JSON ,body request example->
{
  "cities": [
    "toronto",
    "mumbai",
    "london"
  ]
}

JSON response example->
{
    "weather": {
        "toronto": "23C",
        "mumbai": "27C",
        "london": "28C"
    }
}