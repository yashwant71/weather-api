require("dotenv").config()
const express = require('express');
const app = express();
const axios = require('axios')

//TO GET THE GEOCOORDINATES BY CITY NAMES
const coordinates = async (cityname) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=407eab5d402ece23129f4b228c318574`)
    return response.data[0]
}
//TO GET THE WEATHER(TEMPRATURE DEG(C)) BY CITY NAME
async function weather(cityname) {
    var lat = ''
    var lon = ''
    await coordinates(cityname).then((coor) => {
        // console.log(coor)
        lat = coor.lat;
        lon = coor.lon;
    })
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=407eab5d402ece23129f4b228c318574`)
    return response.data.main.temp;
}

app.use(express.json());
app.post('/getWeather', (req, res) => {
    var obj = {}
    async function objAwait() {
        for await (city of req.body.cities) {
            await weather(city).then((temp) => {
                obj[city] = Math.round(temp)+"C";
                // console.log(city,temp)
                // console.log(city)
            })
        }
    }
    objAwait().then(() => {
        var mainObj ={}
        mainObj["weather"]=obj
        // console.log(obj)
        console.log(mainObj)
        res.send(mainObj)
    })
})
app.listen(process.env.PORT || 4000)