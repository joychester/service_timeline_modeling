google.charts.load("current", { packages: ["timeline"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  const container = document.getElementById("timeline");
  const chart = new google.visualization.Timeline(container);
  const dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: "string", id: "API Name" });
  dataTable.addColumn({ type: "number", id: "Start" });
  dataTable.addColumn({ type: "number", id: "Duration" });
  dataTable.addRows([["API-1", 0, 20]]);

  chart.draw(dataTable);
}

function appendService(
  dataTable,
  chart,
  currentStart,
  currentEnd,
  serviceName,
  loadInParallel,
  serviceDuration
) {
  const serviceDetails = [];
  serviceDetails.push(serviceName);
  if (loadInParallel === true) {
    serviceDetails.push(currentStart);
    currentEnd = serviceDuration;
  } else {
    serviceDetails.push(currentEnd);
  }
  dataTable.addColumn([serviceDetails]);
}
