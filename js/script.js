const apiKey = "e67b697ec6d39be322cf612e82271c66";

async function getData() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async function (position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            document.getElementById("location").innerHTML =
                "📍 Latitude: " + lat +
                "<br>📍 Longitude: " + lon;

            await getWeather(lat, lon);

        });

    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported.";
    }
}


async function getWeather(lat, lon) {

    let url =
        "https://api.openweathermap.org/data/2.5/weather?lat="
        + lat +
        "&lon=" + lon +
        "&appid=" + apiKey +
        "&units=metric";

    try {

        let response = await fetch(url);
        let data = await response.json();

        let city = data.name;
        let country = data.sys.country;

        let temp = data.main.temp;
        let feelsLike = data.main.feels_like;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let pressure = data.main.pressure;

        let desc = data.weather[0].description;



        document.getElementById("weather").innerHTML =
            "<strong>🏙️ " + city + ", " + country + "</strong><br><br>" +

            "🌡️ Temperature: " + temp + " °C<br>" +
            "🥵 Feels like: " + feelsLike + " °C<br>" +
            "☁️ Weather: " + desc + "<br><br>" +

            "💧 Humidity: " + humidity + "%<br>" +
            "🌬️ Wind speed: " + wind + " m/s<br>" +
            "⚖️ Pressure: " + pressure + " hPa";

    } catch (error) {

        document.getElementById("weather").innerHTML =
            "Error getting weather";
    }
}

window.onload = getData();