// from data.js
var tableData = data;

// function to display records of UFO sightings on visit to homepage
function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// clear the table for new data
function removeTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
// display initial data of all UFO sightings
console.log(tableData);
tableDisplay(tableData);

// 'Filter Table' button
var button = d3.select("#filter-btn");
// 'Reset Table' button
var reset_button = d3.select("#reset-btn");

// filter the database
button.on("click", function(event) {
  // Prevent page from refreshing, clear previous table data
  d3.event.preventDefault();
  removeTbody();
  
  var filteredData = tableData;
  var inputId = document.getElementsByClassName("form-control");
  
  // iterate through input fields
  for (var i = 0; i < inputId.length; i++) {
	
	var idName = inputId[i].id;
	var field = d3.select("#" + idName).property("value");
	
	// convert empty space as a search for everything within the field
	if (field.trim() !== "") {
	  var filteredData = filteredData.filter(ufoSighting =>
	    // convert input to similar case 
		ufoSighting[idName].toUpperCase().trim() ===
		field.toUpperCase().trim());
	};
  };
 
  // display message if no matching records
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>Sorry, no UFO's found matching that description.  Try other filter values.</h4>");
  };
  
  // display the database
  console.log(filteredData);
  tableDisplay(filteredData);
});

  //on reset-table click, reset table, display default data
  reset_button.on("click", function(event) {
  // Prevent page from refreshing, clear previous table data
  d3.event.preventDefault();
  tableDisplay(tableData)});