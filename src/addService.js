      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      let currentStart = 0;
      let currentEnd = 0;
      
      function drawChart() {
        const container = document.getElementById('timeline');
        const chart = new google.visualization.Timeline(container);
        const dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'API Name' });
        dataTable.addColumn({ type: 'number', id: 'Start' });
        dataTable.addColumn({ type: 'number', id: 'End' });
            
        appendService(dataTable, chart, 'API-1', false, 20);
        appendService(dataTable, chart, 'API-2', false, 10);
        appendService(dataTable, chart, 'API-3', false, 30);
        appendService(dataTable, chart, 'API-4', true, 20);
        appendService(dataTable, chart, 'API-5', false, 10);
        
        chart.draw(dataTable);
      }
      
      function appendService(dataTable, chart, serviceName, loadInParallel, serviceDuration) {
          const serviceDetails = [];
            
          serviceDetails.push(serviceName);
            
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
      }
