$(document).ready(function () {

    // create/listen to click event for state search and saved history
    $("#dropdownMenuButton").on("change",  getLocation);

    // //$(".history").on("li", function () {
    //     // return createSavedLocation();

    // });

    function getLocation(event) {
        console.log(event)
        // create a var and assign the value received back from API
      
        var event = $("#searchbar").val();

        // make a request to API openweahtermap
        
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
                var totalPositive = $("#totalCases").text("Total cases: " + data.positive);
                var newPositive = $("#newCases").text("New Cases: " + data.positiveIncrease);
                
                var recovery = $("#recovery").text("Recovered: " + data.recovered);
                //$("newRecovery").text("")

                var deaths = $("#totalDeaths").text("Deaths: " + data.death);
                var newDeaths = $("#newDeaths").text("Death Increase: " + data.deathIncrease);

                // add to the page
                $("#totalCases").append(totalPositive, newPositive, recovery, deaths, newDeaths);
           

        


            });

    }

    // get current histor if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    // console.log(history)
    if (history.length > 0) {
        getLocation(history[0]);
    }

    // for (var i = 0; i < history.length; i++) {
    //     // createSavedLocation(history[i]);
    // }


});










