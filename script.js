// get current history, if available
let getHistory = JSON.parse(window.localStorage.getItem('seachHistory')) || [];

if (getHistory.length > 0) {
    for ( let i = 0; i > getHistory.length; i++) {
        makeItem(getHistory[i]);
    }
}
//make row for each history item
function makeItem(text) {
    let li = $('<li>').addClass('list-group-item list-group-item-action').text(text);
    $('.searchHistory').append(li);
    }
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
        //clear search input
        $('#cityInput').val('');
        //clear previous current weather content
        $('#currentForecast').empty();
        //clear previous forecast weather content
        $('#futureForecast').empty();
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
                <li class="list-group-item" value="${index.value}" id="uv">
                UV Index: ${index.value}
                </li>
            </ul>`
        ) 
    //define variable for uv
    let uv = $('#uv');
    // add green color btn to UV Index
if (uv.value < 3) {
    console.log('green')
    uv.addClass('success');
    //add yellow color btn to UV Index
} else if (uv.value < 7) {
    console.log('yellow')
    uv.addClass('warning');
    //add red color btn to UV index
} else {
    console.log('red')
    uv.addClass('danger');
}   
    //create div for 5 day forecast
    let fiveDayForecastElem = $('<div>')
    //add classes to this div
    fiveDayForecastElem.addClass('row', 'card', 'bg-primary',)
    //add style to this div
    fiveDayForecastElem.attr('style', 'width:70rem',)
    fiveDayForecastElem.attr('style', 'padding:1rem',)
    fiveDayForecastElem.html(`
        <div class="col-md-9">
        <h4 class="card-title">5-Day Forecast:</h4>
        <div class="row">
            <div class="card bg-primary">
                <h5 class="card-title">${forecast.list[2].dt_txt.split(" ")[0]}</h5>
                    <img src="http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png"
                    attr="SameSite" alt="${current.name}">
                    <p class="card-text">
                    Temp: ${forecast.list[0].main.temp}°F
                    <br>
                    Humidity: ${forecast.list[0].main.humidity}%
                    </p>
            </div>
            <div class="card bg-primary">
                <h5 class="card-title">${forecast.list[8].dt_txt.split(" ")[0]}</h5>
                <img src="http://openweathermap.org/img/wn/${forecast.list[8].weather[0].icon}@2x.png"
                attr="SameSite" alt="${current.name}">
                <p class="card-text">
                Temp: ${forecast.list[8].main.temp}°F
                <br>
                Humidity: ${forecast.list[8].main.humidity}%
                </p>
            </div>
            <div class="card bg-primary">
                <h5 class="card-title">${forecast.list[16].dt_txt.split(" ")[0]}</h5>
                    <img src="http://openweathermap.org/img/wn/${forecast.list[16].weather[0].icon}@2x.png"
                    attr="SameSite" alt="${current.name}">
                    <p class="card-text">
                    Temp: ${forecast.list[16].main.temp}°F
                    <br>
                    Humidity: ${forecast.list[16].main.humidity}%
                    </p>
            </div>
            <div class="card bg-primary">
                <h5 class="card-title">${forecast.list[24].dt_txt.split(" ")[0]}</h5>
                    <img src="http://openweathermap.org/img/wn/${forecast.list[24].weather[0].icon}@2x.png"
                    attr="SameSite" alt="${current.name}">
                    <p class="card-text">
                    Temp: ${forecast.list[24].main.temp}°F
                    <br>
                    Humidity: ${forecast.list[24].main.humidity}%
                    </p>
            </div>
            <div class="card bg-primary">
                    <h5 class="card-title">${forecast.list[32].dt_txt.split(" ")[0]}</h5>
                    <img src="http://openweathermap.org/img/wn/${forecast.list[32].weather[0].icon}@2x.png"
                    attr="SameSite" alt="${current.name}">
                    <p class="card-text">
                    Temp: ${forecast.list[32].main.temp}°F
                    <br>
                    Humidity: ${forecast.list[32].main.humidity}%
                    </p>
            </div>
        </div>
        </div>
    `)
    $('#currentForecast').append(currentWeatherElem)
    $('#futureForecast').append(fiveDayForecastElem)
    })})})     
    getHistory.push($('#cityInput').val());
    console.log(getHistory)
    window.localStorage.setItem("searchHistory", JSON.stringify(getHistory));
    makeItem($('#cityInput').val());

})
//make list clickable and searchable
    $('.searchHistory').on('click', 'li', function() {
        event.preventDefault()        
    //fetch API current weather data 
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${$(this).text()}&appid=e1a3a82b0d99af98b67a1576afbd3436&units=imperial`)
    .then(current => {
        console.log(current)
    console.log($(this).text())
    //fetch API for UV index data of above current lon and lat
    $.get(`https://api.openweathermap.org/data/2.5/uvi?appid=e1a3a82b0d99af98b67a1576afbd3436&lat=${current.coord.lat}&lon=${current.coord.lon}`)
    .then(index => {
        console.log(index)
    //fetch API for 5 day forecast of current city
    $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${$(this).text()}&appid=e1a3a82b0d99af98b67a1576afbd3436&units=imperial`)
    .then(forecast => {
        console.log(forecast)
        //clear previous current weather content
        $('#currentForecast').empty();
        //clear previous forecast weather content
        $('#futureForecast').empty();
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
        <div class="col-md-9">
        <h4 class="card-title">5-Day Forecast:</h4>
        <div class="row">
        <div class="card bg-primary">
            <h5 class="card-title">${forecast.list[2].dt_txt.split(" ")[0]}</h5>
                <img src="http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png"
                attr="SameSite" alt="${current.name}">
                <p class="card-text">
                Temp: ${forecast.list[0].main.temp}°F
                <br>
                Humidity: ${forecast.list[0].main.humidity}%
                </p>
        </div>
        <div class="card bg-primary">
        <h5 class="card-title">${forecast.list[8].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[8].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[8].main.temp}°F
            <br>
            Humidity: ${forecast.list[8].main.humidity}%
            </p>
        </div>
        <div class="card bg-primary">
        <h5 class="card-title">${forecast.list[16].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[16].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[16].main.temp}°F
            <br>
            Humidity: ${forecast.list[16].main.humidity}%
            </p>
        </div>
        <div class="card bg-primary">
        <h5 class="card-title">${forecast.list[24].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[24].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[24].main.temp}°F
            <br>
            Humidity: ${forecast.list[24].main.humidity}%
            </p>
        </div>
        <div class="card bg-primary">
        <h5 class="card-title">${forecast.list[32].dt_txt.split(" ")[0]}</h5>
            <img src="http://openweathermap.org/img/wn/${forecast.list[32].weather[0].icon}@2x.png"
            attr="SameSite" alt="${current.name}">
            <p class="card-text">
            Temp: ${forecast.list[32].main.temp}°F
            <br>
            Humidity: ${forecast.list[32].main.humidity}%
            </p>
    </div></div></div>
    `)
    $('#currentForecast').append(currentWeatherElem)
    $('#futureForecast').append(fiveDayForecastElem)
    })})})
})
