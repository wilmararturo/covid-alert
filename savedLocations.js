
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
    displayChart();
    // then create a button on the index page with the state info
} 

function createSavedButton() {
    var history = JSON.parse(window.localStorage.getItem("history"))
    $("#saved-locations").empty();
    var resultCount
        if (history.length < 5){
        resultCount = history.length;
        }else{
        resultCount = 5
        }

    for (var i = 0; i < resultCount; i++) {

        var covidApiUrl = 'https://api.covidtracking.com/v1/states/' + history[i] + '/current.json';

        $.ajax({
        url: covidApiUrl,
        method: "GET"
        }).then(function (data) {

        var newSavedLocation = $("<div>").addClass("card mt-4 ml-4 mr-4 mb-2 bg-light").addClass("col-sm-4").text(history[i]);
        $("#saved-locations").append(newSavedLocation);
        

        var body = $("<div>").addClass("card-body bg-dark float-left");
        var title = $("<h3>").addClass("card-title text-secondary text-light").text(data.state);
        var positive = $("<p>").addClass("card-text text-warning").text("Positive: " + data.positive);
        var deaths = $("<p>").addClass("card-text text-danger").text("Total Deaths: " + data.death);
        var deathIncrease = $("<p>").addClass("card-text text-danger").text("Death Increase: " + data.deathIncrease);
        var positiveIncrease = $("<p>").addClass("card-text text-warning").text("Positive Increased: " + data.positiveIncrease + "+");
        var recovered = $("<p>").addClass("card-text text-success").text("Recovered: " + data.recovered);
        
        newSavedLocation.append(body);
        body.append(title, deaths, deathIncrease, positive, positiveIncrease, recovered);
        
        
        
        
        })
        }
}

function displayChart() {
    // ADD A CHART/IMAGE/VISUAL
        // might need to use historical daily api to compare numbers month over month
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['State1', 'State2', 'State3', 'State4', 'State5'],
        datasets: [{
            label: '# of Cases',
            data: [2, 1, 3, 3, 2],
            backgroundColor: [
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                
            ],
            borderWidth: 3
        }]
        },
        options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }
        });
}

