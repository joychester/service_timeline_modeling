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
        
        chart.draw(dataTable);
      }
      
      function appendService(dataTable, chart, serviceName, loadInParallel, serviceDuration) {
          const serviceDetails = [];
          // add service Name
          serviceDetails.push(serviceName);
          // add Start Number
          if (loadInParallel === true) {
            serviceDetails.push(currentStart);
            currentEnd = (serviceDuration > (currentEnd - currentStart)) ? (currentStart + serviceDuration) : currentEnd;
          } else {
            serviceDetails.push(currentEnd);
            currentStart = currentEnd;
            currentEnd = currentStart + serviceDuration;
          }
          // add Duration Number
          serviceDetails.push(currentEnd);
          console.log(serviceDetails);
          dataTable.addRows([serviceDetails]);
      }
