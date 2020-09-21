// // variable to hold state input from drop down
// var stateInput = $("#dropdownMenuButton");

// stateInput.click(function () {

// // call Nuchana's 
// var selectedState = $(".state").val();
// // conditional statement to confirm once user selects a state
// // if a valid state is not selected from the dropdown, console log and prompt user for a valid input

// var covidApiUrl = 'https://api.covidtracking.com/v1/states/' + selectedState + '/current.json';

// $.ajax({
//         // url will need to be changed based on wilmar's drop down api
//         url: covidApiUrl
//         method: "GET"
//         // once data is retrieved, run the function to print selected state to the screen
//     }).then(function (response) {
//         var inputState = $(".saved-locations").append("<div>").addClass("new-saved-location");
//         inputState.append("<p>" + response.state + "</p>");
//     })
// });

// --------------------------------------------------------

function savedLocation(state) {
    // when we click button in search, save location to local storage
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    console.log(state);
    if (history.length > 0) {
        history.push(state);
        window.localStorage.setItem("history", JSON.stringify(history));
    }
    else {
        history = [state]
        window.localStorage.setItem("history", JSON.stringify(history));
    }

    createSavedButton();
    // then create a button on the index page with the state info
}

function createSavedButton() {
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    $("#saved-locations").empty();
    var resultCount
    if (history.length < 5) {
        resultCount = history.length;
    } else {
        resultCount = 5
    }

    for (var i = 0; i < resultCount; i++) {

        var covidApiUrl = 'https://api.covidtracking.com/v1/states/' + history[i] + '/current.json';

        $.ajax({
            url: covidApiUrl,
            method: "GET"
        }).then(function (data) {

            var newSavedLocation = $("<div>").addClass("card").text(history[i]);
            $("#saved-locations").append(newSavedLocation);


            var body = $("<div>").addClass("card-body");
            var title = $("<h3>").addClass("card-title").text(data.state);
            // ADD CHART IMAGE VISUAL FROM SLACK LINK
            var deaths = $("<p>").addClass("card-text").text("Total Deaths: " + data.death);
            var hospitalized = $("<p>").addClass("card-text").text("Hospitalized: " + data.hospitalized);
            var positiveIncrease = $("<p>").addClass("card-text").text("Positive Increased: " + data.positiveIncrease + "+");

            newSavedLocation.append(body);
            body.append(title, deaths, hospitalized, positiveIncrease);

        })
    }
}













// // local storage example from weather app that stores searched cities

//     for (var i = 0; i < localStorage.length; i++) {
//         // local storage stores the input provided by the for loop
//         var city = localStorage.getItem(i);
//         // creating a variable to store the city name and adding a new class to display it to screen
//         var cityName = $(".list-group").addClass("list-group-item");
//         // append the city input to the screen within the ul
//         cityName.append("<li>" + city + "</li>");
//     }
