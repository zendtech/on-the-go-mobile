angular.module('onthego.controllers')

.controller('StatsCtrl', function($scope, StatResource) {

  $scope.chartConfig = {
    options: {
      chart: {
        animation: true,
  			zoomType: 'x',
  			//renderTo: 'graph1',
  			defaultSeriesType: 'line',
  			type: 'area'
      },
      lang: {
        loading: ''
      },
      loading: {
        labelStyle: {}
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Requests Per Second',
        style: {
          color: '#355968'
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          minute: '%H:%M',
          hour: '%H:%M',
          month: '%e. %b',
          year: '%b. %y'
        },
        events:{
          afterSetExtremes:function(){
          zendCharts.chartZoomChanges(this.chart.xAxis[0].min, this.chart.xAxis[0].max);
            if (typeof zendCharts === 'object') {
              // TODO: add check for no-data graphs since they change the zoom
              zendCharts.chartZoomChanges(this.chart.xAxis[0].min, this.chart.xAxis[0].max);
            }
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          formatter: function() {
            var val = this.value;
            switch ('') {
              case 'mb':
                val = formatFileSize(val * 1024 * 1024);
                break;
              case '%':
              case '%%':
                val = val + '%';
                break;
              case 'ms':
                val = formatMiliseconds(val);
                break;
              default:
                val = formatSize(val);
                break;
            }
            return val;
          }
        }
      },
      legend: {
        enabled: false,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0,
        y: 40,
        itemStyle: {
          paddingBottom: '10px'
        }
      },
      tooltip: {
        enabled: true,
        formatter: function() {
          var val = this.y;
          switch ('') {
            case 'mb':
              val = formatFileSize(val * 1024 * 1024);
              break;
            case '%':
              val = val + '%';
              break;
            case 'ms':
              val = formatMiliseconds(val);
              break;
            case '%%':
              val = this.percentage.toPrecision(3) + '%';
              break;
            default:
              val = formatSize(val);
              break;
          }

          // remove twice
          var currDate = removeServerTimezoneOffset(removeTimezoneOffset(new Date(this.x)));

          return val + ' | ' + formatDate(currDate, "%d.%m.%y %H:%M");
        }
      },
      plotOptions: {
        series: {
          animation: false,
          shadow: false,
          marker: {
            enabled: false
          }
        },
        area: {
          stacking: 'normal',
          color: '#bdd980',
          lineColor: '#688625',
          states: {
            hover: {
              enabled: false
            }
          }
        }
      },
    },
    exporting: {
			enabled: false
		},
	  series: [{data: []}]
  }

  StatResource.getList(30).then(function(result) {
    $scope.stats = result;
    $scope.chartConfig.series[0]['data'] = result;
  });
})
