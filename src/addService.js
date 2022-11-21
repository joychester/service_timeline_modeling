      google.charts.load('current', {
        'packages': ['timeline']
      });
      google.charts.setOnLoadCallback(drawChart);
      let currentStart = 0;
      let currentEnd = 0;
      let api_seq = 1;
      let gchartContext = {};

      function initChart() {
        api_seq = 1;
        if (document.getElementById('hidden-msg').childElementCount > 0) {
          const msg = document.getElementById('hidden-msg');
          msg.removeChild(msg.firstElementChild);
        }

        const container = document.getElementById('timeline');
        const chart = new google.visualization.Timeline(container);
        const dataTable = new google.visualization.DataTable();

        dataTable.addColumn({
          type: 'string',
          id: 'API Name'
        });
        dataTable.addColumn({
          type: 'number',
          id: 'Start'
        });
        dataTable.addColumn({
          type: 'number',
          id: 'End'
        });

        chart.draw(dataTable);

        gchartContext['chart'] = chart;
        gchartContext['dataTable'] = dataTable;
        return gchartContext;
      }

      function drawChart(serviceName, loadInParallel, serviceDuration) {
        gchartContext = initChart();

        const clearScreenButton = document.getElementById("clearScreenBtn");
        clearScreenButton.addEventListener("click", initChart, false);

        const addServiceButton = document.getElementById("addSeqServiceBtn");
        addServiceButton.addEventListener("click", () => {
          appendService(gchartContext.dataTable, gchartContext.chart, false);
        }, false);

        const addServiceButton2 = document.getElementById("addParaServiceBtn");
        addServiceButton2.addEventListener("click", () => {
          appendService(gchartContext.dataTable, gchartContext.chart, true);
        }, false);
      }

      function appendService(dataTable, chart, loadInParallel) {
        if (!(parseInt(document.getElementById('api-duration').value) > 0)) {
          if (document.getElementById('hidden-msg').childElementCount === 0) {
            const str = '<p>You must add some positive value to API duration!</p>',
              div = document.getElementById('hidden-msg');

            div.insertAdjacentHTML('beforeend', str);
          }

          return;
        } else {
          if (document.getElementById('hidden-msg').childElementCount > 0) {
            const msg = document.getElementById('hidden-msg');
            msg.removeChild(msg.firstElementChild);
          }

          const serviceDuration = parseInt(document.getElementById('api-duration').value);
          const serviceName = `API-${api_seq++}`;
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
      }
