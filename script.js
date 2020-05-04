//event listener for city search button
$('#cityBtn').on('click', event => {
    event.preventDefault()
    //fetch API current weather data 
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${$('#cityInput').val()}&appid=e1a3a82b0d99af98b67a1576afbd3436&units=imperial`)
    .then(current => {
        console.log(current)
    console.log($('#cityInput').val())
    //fetch API for UV index data of above current lon and lat
    $.get(`https://api.openweathermap.org/data/2.5/uvi?appid=e1a3a82b0d99af98b67a1576afbd3436&lat=${current.coord.lat}&lon=${current.coord.lon}`)
    .then(index => {
        console.log(index)
    //fetch API for 5 day forecast of current city
    $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${$('#cityInput').val()}&appid=e1a3a82b0d99af98b67a1576afbd3436&units=imperial`)
    .then(forecast => {
        console.log(forecast)
    //create div for current weather display
    let currentWeatherElem = $('<div>')
    //adding class of card to newly created current weather div
    currentWeatherElem.addClass('card')
    //adding width style to newly created current weather div
    currentWeatherElem.attr('style', 'width:70rem',)
    currentWeatherElem.attr('style', 'padding:1rem',)
    //writing HTML into the newly created current weather div
    currentWeatherElem.html(`
        <h5 class="card-title">
        ${current.name} 
        ${index.date_iso.split("T")[0]}
        <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" 
        attr="SameSite" alt="${current.name}">
        </h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                Temperature: ${current.main.temp}°F
                </li>
                <li class="list-group-item">
                Humidity: ${current.main.humidity}%
                </li>
                <li class="list-group-item">
                Wind Speed: ${current.wind.speed} MPH
                </li>
                <li class="list-group-item">
                UV Index: ${index.value}
                </li>
            </ul>`
        )
    //create div for 5 day forecast
    let fiveDayForecastElem = $('<div>')
    //add classes to this div
    fiveDayForecastElem.addClass('row', 'card', 'bg-primary',)
    //add style to this div
    fiveDayForecastElem.attr('style', 'width:70rem',)
    fiveDayForecastElem.attr('style', 'padding:1rem',)
    fiveDayForecastElem.html(`
        <div class="card-body">
        <h4 class="card-title">5-Day Forecast:</h4>
        <br>
            <h5 class="card-title">${forecast.list[2].dt_txt.split(" ")[0]}</h5>
                <img src="http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png"
                attr="SameSite" alt="${current.name}">
                <p class="card-text">
                Temp: ${forecast.list[2].main.temp}°F
                <br>
                Humidity: ${forecast.list[2].main.humidity}%
                </p>
        </div>
        <div class="card-body">
        <h5 class="card-title">${forecast.list[6].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[6].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[6].main.temp}°F
            <br>
            Humidity: ${forecast.list[6].main.humidity}%
            </p>
        </div>
        <div class="card-body">
        <h5 class="card-title">${forecast.list[10].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[10].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[10].main.temp}°F
            <br>
            Humidity: ${forecast.list[10].main.humidity}%
            </p>
        </div>
        <div class="card-body">
        <h5 class="card-title">${forecast.list[14].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[14].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[14].main.temp}°F
            <br>
            Humidity: ${forecast.list[14].main.humidity}%
            </p>
        </div>
        <div class="card-body">
        <h5 class="card-title">${forecast.list[18].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[18].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[18].main.temp}°F
            <br>
            Humidity: ${forecast.list[18].main.humidity}%
            </p>
        </div>
    `)
    $('#currentForecast').append(currentWeatherElem)
    $('#futureForecast').append(fiveDayForecastElem)
    })})})

})