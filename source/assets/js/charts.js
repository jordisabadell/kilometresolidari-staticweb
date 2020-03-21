window.printHighcharts = function printHighcharts() {

  //Common charts style
  Highcharts.setOptions({
      chart: {
          spacingBottom: 40,
          spacingTop: 40,
          spacingLeft: 20,
          spacingRight: 20,
          style: {
              fontFamily: 'Lato'
          },
          backgroundColor: '#f2f2f2'
      },
      title: {
        style: {
           color: '#000',
           fontSize: '14px',
           fontWeight: 'bold'
        }
      },
      legend: {
        enabled: true,
        itemStyle: {
            color: '#000',
            fontWeight: 'none',
            fontSize: '12px'
        }
      },      
      plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                style: {
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 'none'
                }
            },
            enableMouseTracking: true
        }
      }
  });

  //Voluntaris Chart
  if(document.getElementById("chart-voluntaris")) {
    Highcharts.chart('chart-voluntaris', {
        chart: {
            type: 'column'          
        },
        title: {
            text: 'Inscripcions'
        },      
        plotOptions: {
          column: {
              enableMouseTracking: false
          }
        },
        xAxis: {
          categories: ['2014','2015','2016','2017','2018']
        },
        yAxis: {
          title: {
              text: ''
          }
        },
        series: [{
            name: 'Número de voluntaris',
            data: [47, 58, 65, 43, 36],
            color: '#fcb03f'
        }]
    });
  }

  //Diners recaptats Chart
  if(document.getElementById("chart-diners-recaptats")) {
    Highcharts.chart('chart-diners-recaptats', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Diners recaptats'
        },
        plotOptions: {
          column: {
              dataLabels: {
                 formatter: function () {
                      return this.y + ' €';
                  }
              }
          }
        },
        tooltip: {
          formatter: function () {
              return this.y + ' €';
          }
        },
        xAxis: {
          categories: ['2014','2015','2016','2017', '2018']
        },
        yAxis: {
          title: {
              text: ''
          },
          labels: {
              format: '{value}'
          }
        },
        series: [{
            type: 'column',
            name: 'Recaptat',
            data: [3860, 4550, 5830, 3485, 2740],
            color: '#ce8cbe',
            
        },{
          type: 'spline',
          name: 'Objectiu',
          data: [3290, 4060, 4550, 3010, 2270],
          color: '#b63c8b',
          marker: {
              lineWidth: 2,
              fillColor: '#b63c8b'
          }
        }]
    });
  }  
}