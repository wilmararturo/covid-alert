
var dropDownMenuEl = $(".dropdown-menu");
var stateDisplayEl = $(".state");


for (var state in statesObj) {
    var stateButtonEl = $("<button>")
        .attr("class", "dropdown-item")
        .attr("type", "button")
        .attr("data-state", statesObj[state].name)
        .attr("data-abbr", statesObj[state].abbreviation)
        .text(`${statesObj[state].name}`);

    dropDownMenuEl.append(stateButtonEl.clone());
}
$(document).on("click", ".dropdown-item", function () {
    var selectedState = $(this)
    console.log(`${selectedState.data().state} - ${selectedState.data().abbr}`);
    stateDisplayEl.text(`${selectedState.data().state}`);
    getStateData(selectedState.data().abbr);
    savedLocation(selectedState.data().abbr);
})