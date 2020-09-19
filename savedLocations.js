// variable to hold state input from drop down
// .searchInput will be replaced by wilmar's class for the drop down
var stateInput = $("#dropdownMenuButton").val();
// conditional statement to confirm once user selects a state
// if a valid state is not selected from the dropdown, console log and prompt user for a valid input
if (stateInput == "") {
    prompt("Select a valid state");
    console.log(stateInput);
}
// if a valid state is selected from the dropdown...
else {
    // run ajax method to pull data from the api
    $.ajax({
        // url will need to be changed based on wilmar's drop down api
        url: covidApiUrl
        method: "GET"
        // once data is retrieved, run the function to print selected state to the screen
    }).then(function (response) {
        var selectedState = $(".saved-locations").append("<div>").addClass("new-saved-location");
        selectedState.append("<p>" + response.state + "</p>");
    })
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
