      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      let currentStart = 0;
      let currentEnd = 0;
      let gchartContext = {};
      
      function initChart() {
        const container = document.getElementById('timeline');
        const chart = new google.visualization.Timeline(container);
        const dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'API Name' });
        dataTable.addColumn({ type: 'number', id: 'Start' });
        dataTable.addColumn({ type: 'number', id: 'End' });
        
        chart.draw(dataTable);
        
        gchartContext['chart'] = chart;
        gchartContext['dataTable'] = dataTable;
        return gchartContext;
      }
      
      function drawChart(serviceName, loadInParallel, serviceDuration) {
        gchartContext = initChart();
        
        const clearScreenButton = document.getElementById("clearScreenBtn");
        clearScreenButton.addEventListener("click", initChart, false);
      
        const addServiceButton = document.getElementById("addServiceBtn");
        addServiceButton.addEventListener("click", () => { appendService(gchartContext.dataTable, gchartContext.chart, 'API-1', false, 10); }, false);
        
        const addServiceButton2 = document.getElementById("addServiceBtn2");
        addServiceButton2.addEventListener("click", () => { appendService(gchartContext.dataTable, gchartContext.chart, 'API-2', false, 20); }, false);
        
        const addServiceButton3 = document.getElementById("addServiceBtn3");
        addServiceButton3.addEventListener("click", () => { appendService(gchartContext.dataTable, gchartContext.chart, 'API-3', true, 15); }, false);
        
        const addServiceButton4 = document.getElementById("addServiceBtn4");
        addServiceButton4.addEventListener("click", () => { appendService(gchartContext.dataTable, gchartContext.chart, 'API-4', true, 30); }, false);
      }
      
      function appendService(dataTable, chart, serviceName, loadInParallel, serviceDuration) {
          const serviceDetails = [];
          // add service Name
          serviceDetails.push(serviceName);
          // add Start Number
          if (loadInParallel === true) {
            serviceDetails.push(currentStart);
            serviceDetails.push(currentStart + serviceDuration);
            currentEnd = (serviceDuration > (currentEnd - currentStart)) ? (currentStart + serviceDuration) : currentEnd;
          } else {
            serviceDetails.push(currentEnd);
            serviceDetails.push(currentEnd + serviceDuration);
            currentStart = currentEnd;
            currentEnd = currentStart + serviceDuration;
          }
          
          //console.log(serviceDetails);
          dataTable.addRows([serviceDetails]);
          chart.draw(dataTable);
      }
