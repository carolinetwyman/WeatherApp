var mykey = "33b253eb714d2fa1478baeb9316be774";

// This .on("click") function will trigger the AJAX Call
$("#myCity").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var citySearch = $("#myCitySearch").val();

    // Here we construct our URL
    var fiveDayForecast ="https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + mykey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + mykey;
    var cityQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&APPID=" + mykey;
    
    $.ajax({
        url: fiveDayForecast,
        method: "GET"
    })

        .then(function (response) {

            for (let i = 0; i < response.list.length; i += 8) {
                console.log(response.list[i])
                //var fiveDayDay = $("<p>").text(response.list[i]);
                // $(".fiveDay").text("UV Index: " + fiveDayDay);
                // console.log("UV Index: " + response.value);
                // //fiveDayDiv.append(fiveDayDay);
                // $("#fiveday").append(fiveDayDiv);

            }

            // Log the queryURL
            console.log(fiveDayForecast);

            // Log the resulting object
            console.log(response);
        
        })
    $.ajax({
        url: queryURL,
        method: "GET"
    })


        //$("#myWeatherResult").text(JSON.stringify(response));

        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            var icon = response.weather[0].icon;
            console.log(icon)
            $(".weather").attr("src","http://openweathermap.org/img/wn/" + icon + "@2x.png");

            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // add temp content to html
            $(".temp").text("Temperature (K) " + response.main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);
        })
        $.ajax({
            url: cityQueryURL,
            method: "GET"
        })
    
            .then(function (response) {
    
                // Log the queryURL
                console.log(cityQueryURL);
    
                // Log the resulting object
                console.log(response);
    
                // Transfer content to HTML
                // $(".lat").text("lat: " + response.coord.lat);
                var lat = response.city.coord.lat
                var lon = response.city.coord.lon
                //return (lat)
    
                console.log("lat: " + response.city.coord.lat);
                console.log("lon: " + response.city.coord.lon);
                var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + mykey;
    $.ajax({
        url: queryURLUV,
        method: "GET"
    })

        .then(function (response) {

            // Log the queryURL
            console.log(queryURLUV);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            var date = response.date_iso
            $(".date").text("The Weather for today, " + date);
            var uv = response.value
            $(".uvIndex").text("UV Index: " + uv);
            console.log("UV Index: " + uv);
            if (uv < 4) {
                $(".uvIndex").addClass("favorable")
            } else if (8 > uv > 4) {
                $(".uvIndex").addClass("moderate")
            } else if (uv > 8) {
                $(".uvIndex").addClass("severe")
            }
        })
            })

});