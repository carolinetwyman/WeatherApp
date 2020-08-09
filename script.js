var mykey = "33b253eb714d2fa1478baeb9316be774";

// This .on("click") function will trigger the AJAX Call
$("#myCity").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var citySearch = $("#myCitySearch").val();

    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + mykey;


    $.ajax({
        url: queryURL,
        method: "GET"
    });


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

            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // add temp content to html
            $(".temp").text("Temperature (K) " + response.main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);
        });
    })