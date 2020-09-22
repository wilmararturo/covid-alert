// var stateChartEl = $("#myChart");
var ctx = document.getElementById("myChart").getContext("2d");

function renderStateChart(state) {
    var queryURL = "https://api.covidtracking.com/v1/states/" + state + "/daily.json"
    var recoveredNumber = [];
    var deathTotal = [];
    var positiveCases = [];
    var axisDate = [];
    var stateName = (statesObj.find(stateObj => stateObj.abbreviation === state)).name;

    //clear existing charts and append chart elements to the chart div
    // chartDivEl.empty();
    // chartDivEl.attr("class", "chart row")
    //     .append(stateChartEl);
    // get 30 days of state data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        for (var i = 0; i < 30; i++) {
            datum = data[i];
            axisDate.push(datum.date);
            recoveredNumber.push(datum.recovered);
            deathTotal.push(datum.death);
            positiveCases.push(datum.positive);
        }

        var caseChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: axisDate,
                datasets: [{
                    label: "Total Cases",
                    data: positiveCases,
                    backgroundColor: "#808080",
                    borderColor: "#808080",
                    borderWidth: 3,
                    fill: false,
                }, {
                    label: "Recovered",
                    data: recoveredNumber,
                    backgroundColor: "#009688",
                    borderColor: "#009688",
                    borderWidth: 3,
                    fill: false,
                }, {
                    label: "Deaths",
                    data: deathTotal,
                    backgroundColor: "#f44336",
                    borderColor: "#f44336",
                    borderWidth: 3,
                    fill: false,
                }
                ]
            },
            options: {
                responsive: true,
                showTooltips: true,
                color: ["white"],
                title: {
                    display: true,
                    text: `${stateName} Last 30 Days`,
                },
                legend: {
                    display: true,
                    position: "bottom",

                },
                elements: {
                    line: {
                        borderColor: "#000000",
                        borderWidth: 2
                    },
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    enabled: true,
                },
                scales: {
                    yAxes: [
                        {

                            location: "left",
                            display: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Date"
                            }

                        }
                    ]

                }
            }
        });






    })
}