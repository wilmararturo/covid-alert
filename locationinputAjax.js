$(document).ready(function () {

    // create/listen to click event for state search and saved history
    $("#dropdownMenuButton").on("click", function () {
        return getLocation;

    });

    $(".history").on("li", function () {
        return createSavedLocation();

    });

    function getLocation(searchValue) {

        // create a var and assign the value received back from API
        var searchValue = $("#searchbar").val();

        // make a request to API openweahtermap
        console.log(searchValue)
        $.ajax({
            url: 'https://api.covidtracking.com/v1/states/current.json' + searchValue,
            method: "GET",

        })


            // After the data from AJAX comes back, we show the weather
            .then(function (data) {

                //create history link for this search
                if (history.indexOf(searchValue) === -1) {
                    history.push(searchValue);
                    window.localStorage.setItem("history", JSON.stringify(history));

                    createSavedLocation(searchValue);
                }

                // clear any old results
                $(".total-cases").empty();
                $(".recovered").empty();
                $(".deaths").empty();


                // create html content for resutls
                // var totalCases = 

                // var card = $("<div>").addClass("card");
                // var body = $("<div>").addClass("card-body");
                // var title = $("<h3>").addClass("card-title").text(data.name + "(" + new Date().toLocaleDateString() + ")");
                // var image = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
                // var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "F");
                // var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                // var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");

                // // merge and add to the page
                // card.append(body);
                // title.append(image);
                // body.append(title, temp, humidity, wind);
                // $("#today").append(card);

                // // move to the next fuction 
                // getForecast(searchValue);
                // getUVIndex(data.coord.lat, data.coord.lon);


            });

    }

    // get current histor if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    // console.log(history)
    if (history.length > 0) {
        getLocation(history[0]);
    }

    for (var i = 0; i < history.length; i++) {
        // createSavedLocation(history[i]);
    }


});










