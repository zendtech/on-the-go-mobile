angular.module('onthego.controllers')

.controller('StatsController', function($scope, $ionicLoading, $ionicSlideBoxDelegate, StatResource, $window) {
	var to = Math.round((new Date()).getTime() / 1000);
	var from = -1;

	$scope.timeRange = '1d';

	$scope.data = {};

	var specConfig = [
	  {
		  counter: 30,
		  boxid: "chart-req"
	  },
	  {
		  counter: 33,
		  boxid: "chart-art"
	  },
	  {
		  counter: 38,
		  boxid: "chart-cpu"
	  },
	  {
		  counter: 37,
		  boxid: "chart-mem"
	  },
	  ];

	$scope.data.chartConfig = {
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
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					formatter: function() {
						var val = this.value;
						switch ('mb') {
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
			size: {
				width: $window.innerWidth -10
			},
			series: [{data: []}],
			func: function (chart) {

			}
	};

	$scope.changeTimeRange = function(timeRange) {
		$scope.timeRange = timeRange;
		$scope.changeChart($ionicSlideBoxDelegate.currentIndex());
	};

	$scope.changeChart = function(index) {
		var currentDate = new Date();
		if ($scope.timeRange.indexOf('h') > 0) {
			currentDate.setHours(currentDate.getHours() - parseInt($scope.timeRange));
			from = Math.round(currentDate.getTime() / 1000);
		} else if ($scope.timeRange.indexOf('d') > 0) {
			currentDate.setHours(currentDate.getHours() - parseInt($scope.timeRange) * 24);
			from = Math.round(currentDate.getTime() / 1000);
		} else if ($scope.timeRange.indexOf('m') > 0) {
			currentDate.setMonth(currentDate.getMonth() - parseInt($scope.timeRange));
			from = Math.round(currentDate.getTime() / 1000);
		}

		$scope.loading = true;
		$ionicLoading.show();
		StatResource.getList(specConfig[index].counter, from, to).then(function(result) {
			$scope.data.chartConfig.options.title.text = result[0].title;
			$scope.data.chartConfig.options.chart.renderTo = specConfig[index].boxid;
			$scope.data.chartConfig.series[0]['data'] = result[0].data;
			$scope.data.chartConfig.yAxis.labels.formatter = function() {
				var val = this.value;
				switch (result[0].valueType) {
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
			};
			$scope.loading = false;
			$ionicLoading.hide();
			/*$timeout(function() {
				$window.resize();
			}, 2000);*/
			

		});
	};
	$scope.changeChart(0);
});
//req/s => 30 | index 0
//art => 33 | index 1
//CPU => 38 | index 2
//Memory => 37 | index 3