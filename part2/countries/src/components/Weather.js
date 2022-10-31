import React, {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({ capital }) => {
    const[weather, setWeather] = useState()
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [capital, api_key])

    if (!weather) { return null }

    return (
        <>
            <h3>Weather in {capital}</h3>
            <p>temperature {weather.main.temp} Celsisus</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default Weather;