var chartDivEl = $(".chart")
var chartEl = $("#linechart");
var stateChartEl = $("<canvas>").attr("id", "state-chart");

function renderStateChart(state) {
    var queryURL = "https://api.covidtracking.com/v1/states/" + state + "/daily.json"
    var recoveredNumber = [];
    var deathIncrease = [];
    var positiveIncrease = [];
    var axisDate = [];

    //clear existing charts and append chart elements to the chart div
    chartDivEl.empty();
    chartDivEl.attr("class", "chart row")
        .append(stateChartEl);
    // get 40 days of state data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        for (var i = 0; i < 30; i++) {
            datum = data[i];
            axisDate.push(datum.date);
            recoveredNumber.push(datum.recovered);
            deathIncrease.push(datum.deathIncrease);
            positiveIncrease.push(datum.positiveIncrease);
        }

        console.log(recoveredNumber);
        console.log(deathIncrease);
        console.log(positiveIncrease);

        var caseChart = new Chart(stateChartEl, {
            type: "line",
            data: {
                labels: axisDate,
                datasets: [{
                    label: "Positive Case Increase",
                    yaxisID: "A",
                    data: positiveIncrease,
                    backgroundColor: "#808080",
                    borderColor: "#808080",
                    fill: false,
                }, {
                    label: "Recovered",
                    yaxisID: "B",
                    data: recoveredNumber,
                    backgroundColor: "#009688",
                    borderColor: "#009688",
                    fill: false,
                }, {
                    label: "Death Increase",
                    yaxisID: "A",
                    data: deathIncrease,
                    backgroundColor: "#f44336",
                    borderColor: "#f44336",
                    fill: false,
                }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {

                        boxwidth: 0,
                    }
                },
                elements: {
                    line: {
                        borderColor: "#ffffff",
                        borderWidth: 1
                    },
                    point: {
                        radius: 0
                    }
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                tooltips: {
                    enabled: true,
                    intersect: true,
                },
                scales: {
                    yAxes: [
                        {
                            id: "A",
                            location: "left",
                            display: false
                        }, {

                            id: "B",
                            location: "right",
                            display: false

                        }
                    ],
                    xAxes: [
                        {
                            display: false
                        }
                    ]

                }
            }
        });



        // var stateChart = new Chart(chartEl, {
        //     type: 'line',
        //     data: {
        //         labels: axisDate,
        //         datasets: [{
        //             label: "Hospitalized Increase",
        //             backgroundColor: "yellow",
        //             borderColor: "yellow",
        //             data: recoveredNumber,
        //             fill: false,
        //         }, {
        //             label: "New Deaths",
        //             backgroundColor: "red",
        //             borderColor: "red",
        //             data: deathIncrease,
        //             fill: false,
        //         }, {
        //             label: "New Cases",
        //             backgroundColor: "green",
        //             borderColor: "green",
        //             data: positiveIncrease,
        //             fill: false,
        //         }

        //         ]
        //     },
        //     options: {
        //         responsive: false,
        //         color: ["white"],
        //         title: {
        //             display: true,
        //             text: `${state} Covid Chart`,
        //         },
        //         tooltips: {
        //             mode: "index",
        //             intersect: false,
        //         },
        //         hover: {
        //             mode: "nearest",
        //             intersect: true,
        //         },
        //         scales: {
        //             xAxes: [{
        //                 display: false,
        //                 scaleLabel: {
        //                     display: true,
        //                     labelString: 'Date'
        //                 }
        //             }],
        //             yAxes: [{
        //                 display: true,
        //                 scaleLabel: {
        //                     display: true,
        //                     labelString: 'Value'
        //                 }
        //             }]
        //         }

        //     }
        // });



    })
}