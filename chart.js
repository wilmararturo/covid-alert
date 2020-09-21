var chartDivEl = $(".chart")
var chartEl = $("#linechart")
    .attr("width", "300")
    .attr("height", "300");
var deathChartEl = $("<canvas>").attr("id", "death-chart");
var caseChartEl = $("<canvas>").attr("id", "case-chart");
var hospitalChartEl = $("<canvas>").attr("id", "hospital-chart");

//common chart vars -- change one, change them all
var chartOptions = {
    responsive: false,
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
    tooltips: {
        enabled: false
    },
    scales: {
        yAxes: [
            {
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

function renderStateChart(state) {
    var queryURL = "https://api.covidtracking.com/v1/states/" + state + "/daily.json"
    var hospitalizedIncrease = [];
    var deathIncrease = [];
    var positiveIncrease = [];
    var axisDate = [];

    //clear existing charts and append chart elements to the chart div
    chartDivEl.empty();
    chartDivEl.attr("class", "chart row")
        .append(deathChartEl)
        .append(hospitalChartEl)
        .append(caseChartEl);
    // get 40 days of state data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        for (var i = 0; i < 30; i++) {
            datum = data[i];
            axisDate.push(datum.date);
            hospitalizedIncrease.push(datum.hospitalizedIncrease);
            deathIncrease.push(datum.deathIncrease);
            positiveIncrease.push(datum.positiveIncrease);
        }
        console.log(axisDate);
        console.log(deathIncrease);

        var caseChart = new Chart(caseChartEl, {
            type: "line",
            data: {
                labels: axisDate,
                datasets: [{
                    label: "Positive Case Increase",
                    data: positiveIncrease,
                    backgroundColor: "#808080"
                }]
            },
            options: chartOptions
        });
        var caseChart = new Chart(hospitalChartEl, {
            type: "line",
            data: {
                labels: axisDate,
                datasets: [{
                    label: "Hospitalized Increase",
                    data: hospitalizedIncrease,
                    backgroundColor: "#808080"
                }]
            },
            options: chartOptions
        });
        var caseChart = new Chart(deathChartEl, {
            type: "line",
            data: {
                labels: axisDate,
                datasets: [{
                    label: "Death Increase",
                    data: deathIncrease,
                    backgroundColor: "#808080"
                }]
            },
            options: chartOptions
        });



        // var stateChart = new Chart(chartEl, {
        //     type: 'line',
        //     data: {
        //         labels: axisDate,
        //         datasets: [{
        //             label: "Hospitalized Increase",
        //             backgroundColor: "yellow",
        //             borderColor: "yellow",
        //             data: hospitalizedIncrease,
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