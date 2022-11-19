      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      let currentStart = 0;
      let currentEnd = 0;
      const gchartContext = {};
      
      const clearScreenButton = document.getElementById("clearScreenBtn");
			clearScreenButton.addEventListener("click", initChart, false);
      
      const addServiceButton = document.getElementById("addServiceBtn");
      
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
        const gchartContext = initChart();
        
        
			  addServiceButton.addEventListener("click", () => { appendService(gchartContext.dataTable, gchartContext.chart, 'API-1', false, 20); }, false);
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
          chart.draw(dataTable);
      }
