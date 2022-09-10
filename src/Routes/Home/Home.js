import { useState } from "react";

const api = 
{
  key: "ab211d63923ddc2ee61b393b06928581",
  base: "https://api.openweathermap.org/data/2.5/"
}

const Home = function()
{
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = function(event)
    {
        if (event.key === "Enter")
        {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(function(res){ return res.json(); })
                .then(function(res)
                {
                    setWeather(res);
                    setQuery("");
                    console.log(res);
                })
                .catch(function(error)
                {
                    console.log(error);
                })
        }
            
    }

    const dateBuilder = function()
    {   
        let offset = weather.timezone/3600;
        let date = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

        return date;
    }

    return(
        <div className={(typeof weather.main != "undefined") ? ((new Date(weather.sys.sunrise*1000).getTime() < new Date().getTime() && new Date().getTime() < new Date(weather.sys.sunset*1000).getTime()) ? `container ${weather.weather[0].main}` : `container ${weather.weather[0].main} night`) : "container"}>
            <main>
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={function(event){ setQuery(event.target.value) }}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                    <div className="location-box">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuilder()}</div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="weather">
                            {weather.weather[0].main}
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="not-found">
                        Search for any city
                    </div>
                )}

            </main>
        </div>

    );
}

export default Home;