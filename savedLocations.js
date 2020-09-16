// recording some local storage code examples from previous assignments and class activities

// local storage example used to store user entries in the day calendar/planner
    var input = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

    for (var i = 0; i < input.length; i++) {
        var inputHour = localStorage.getItem(input[i]);
        $(".form" + input[i]).val(inputHour);
    }

    $(".saveBtn").click(function () {
        event.preventDefault();
        var inputText = $(this).siblings(".form-control").val();
        console.log("Success!");
        var listItem = $(this).parent().data("hour");
        localStorage.setItem(listItem, inputText);
    });


// local storage example from weather app that stores searched cities

    for (var i = 0; i < localStorage.length; i++) {
        // local storage stores the input provided by the for loop
        var city = localStorage.getItem(i);
        // creating a variable to store the city name and adding a new class to display it to screen
        var cityName = $(".list-group").addClass("list-group-item");
        // append the city input to the screen within the ul
        cityName.append("<li>" + city + "</li>");
    }
