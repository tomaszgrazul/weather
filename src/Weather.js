import axios from "axios";
import { useEffect, useState } from "react";
import SearchWeather from "./SearchWeather";
import './Weather.css'
import WeatherItem from "./WeatherItem";

const Weather = () => {

    const [weatherData, setWeatherData] = useState([])
    const [weatherDataAfterFilter, setWeatherDataAfterFilter] = useState([])

    const getWeatherData = () => {
        axios
        .get('https://danepubliczne.imgw.pl/api/data/synop')
        .then((res) => {
            setWeatherData(res.data); 
            setWeatherDataAfterFilter(res.data);
        });
    }

    const filterWeather = (searchValue) => {
        // console.log(searchValue)
 

    const filterWeatherData = weatherData.filter((weatherItem) => weatherItem.stacja.toLowerCase().includes(searchValue.toLowerCase()))

    // console.log(filterWeatherData)
        setWeatherDataAfterFilter(filterWeatherData)
    };

    useEffect(() => {
        getWeatherData();
    }, [])

    return (
        <div className="weather">
            <h1>Prognoza pogody</h1>
            <SearchWeather filterWeather={filterWeather}/>
            <div className="weatherList">
                {weatherDataAfterFilter.map((weatherItem) =>{
                    return <WeatherItem weatherItem={weatherItem} key={weatherItem.id_stacji} />
                    })}
            </div>
        </div>
    );
};

export default Weather;