angular.module('onthego.controllers')

.controller('StatsCtrl', function($scope, StatResource) {
	  var to = Math.round((new Date()).getTime() / 1000);
	  var from = 1413079200;

  $scope.chartConfig = {
    options: {
      chart: {
        animation: true,
		zoomType: 'x',
		type: 'area'
      },
      credits: {
        enabled: false
      },
      exporting: {
	    enabled: false
	  },
      title: {
        text: '',
        style: {
          color: '#355968'
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
        enabled: false,
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
    xAxis: {
    	type: 'datetime',
    	dateTimeLabelFormats: {
	        minute: '%H:%M',
	        hour: '%H:%M',
	        month: '%e. %b',
	        year: '%b. %y'
	    },
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
	series: [{data: []}],
	func: function (chart) {
		
	}
  };

  $scope.currTimeRange = '1d';
  
  StatResource.getList(37, from, to).then(function(result) {
	  $scope.chartConfig.options.title.text = result[0].title;
	  $scope.chartConfig.series[0]['data'] = result[0].data;
  });
});
