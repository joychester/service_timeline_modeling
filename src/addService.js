      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      let currentStart = 0;
      let currentEnd = 0;
      
      const addServiceButton = document.getElementById("clearScreenBtn");
			addServiceButton.addEventListener("click", initChart, false);
      
      function initChart() {
        const gchartContext = {};
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
      
      function drawChart() {
        const gchartContext = initChart();
        /*
        const addServiceButton = document.getElementById("addServiceBtn");
				addServiceButton.addEventListener("click", () => { appendService(dataTable, chart, 'API-1', false, 20); }, false);
        */
        appendService(gchartContext.dataTable, gchartContext.chart, 'API-1', false, 20);
        appendService(gchartContext.dataTable, gchartContext.chart, 'API-2', false, 10);
        appendService(gchartContext.dataTable, gchartContext.chart, 'API-3', false, 30);
        appendService(gchartContext.dataTable, gchartContext.chart, 'API-4', true, 20);
        appendService(gchartContext.dataTable, gchartContext.chart, 'API-5', false, 10);
        gchartContext.chart.draw(gchartContext.dataTable);
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
          
          console.log(serviceDetails);
          dataTable.addRows([serviceDetails]);
      }
