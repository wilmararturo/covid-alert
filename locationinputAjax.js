// $(document).ready(function () {

// create/listen to click event for state search and saved history
// $("#dropdownMenuButton").on("click",  getLocation);

// //$(".history").on("li", function () {
//     // return createSavedLocation();

// });

function getStateData(state) {
    console.log(state)
    // create a var and assign the value received back from API

    // var state = $("#searchbar").val();

    // make a request to API openweahtermap

    $.ajax({
        url: 'https://api.covidtracking.com/v1/states/' + state + '/current.json',
        method: "GET",

    })


        // After the data from AJAX comes back, we show the weather
        .then(function (data) {

            //create history link for this search
            // if (history.indexOf(state) === -1) {
            //     history.push(state);
            //     window.localStorage.setItem("history", JSON.stringify(history));

            //     createSavedLocation(state);
            // }

            // clear any old results
            $("#totalCases").empty();
            $("#newCases").empty();
            $("#recovery").empty();
            $("#totalDeaths").empty();
            $("#newDeaths").empty();


            // create html content for resutls
            var totalPositive = $("#totalCases").text(data.positive);
            var newPositive = $("#newCases").text(`+ ${data.positiveIncrease}`);

            var recovery = $("#recovery").text(data.recovered);
            //$("newRecovery").text("")

            var deaths = $("#totalDeaths").text(data.death);
            var newDeaths = $("#newDeaths").text(`+ ${data.deathIncrease}`);

            // add to the page
            // $("#totalCases").append(totalPositive, newPositive, recovery, deaths, newDeaths);





        });

}

    // get current histor if any
    // var history = JSON.parse(window.localStorage.getItem("history")) || [];
    // // console.log(history)
    // if (history.length > 0) {
    //     getStateData(history[0]);
    // }

    // for (var i = 0; i < history.length; i++) {
    //     // createSavedLocation(history[i]);
    // }


// });










