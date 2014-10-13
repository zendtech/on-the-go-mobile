var ZendCharts = new Class({

	Implements: [Options, Events],

	options: {
		graphsContainer: '#graphs-container'
	},

	currAppId: 0,
	currTimeRange: 0,
	currServer: 0,
	inZoomMode: false,
	chartsXAxisMin: 0,
	chartsXAxisMax: 0,
	currRequests: [],

	initialize: function(elements, options) {
		this.setOptions(options);

		window.addEvent("load", function(){
			// inject graph action buttons
			var statsActions = new Element('div', {id: 'stats-actions', class: 'hidden'});
			statsActions.set('html', '<span id="expand-graph-btn" class="zgrid_btn expand" onclick="zendCharts.expandChart(this)" title="Expand graph"></span> \
									  <span id="reload-graph-btn" class="zgrid_btn reload" onclick="zendCharts.reloadChart(this)" title="Reload graph"></span></div>');
			statsActions.inject($(document.body), 'top');

			// attach graph container with action buttons
			$$('.main-apps-graph').addEvent('mouseenter', function(event) {
		    	 var container = event.target;
		    	 if (container.nodeName != 'DIV' || (container.nodeName == 'DIV' && ! container.hasClass('main-apps-graph'))) {
		    		 container = container.getParent('.main-apps-graph');
		    	 }
		    	 container.grab($('stats-actions'), 'top');
	             $('stats-actions').removeClass('hidden');
	             $('expand-graph-btn').set('graphId', container.get('id'));
	             $('reload-graph-btn').set('graphId', container.get('id'));
	    	});

	    	$$('.main-apps-graph').addEvent('mouseleave', function(event) {
	    		$('stats-actions').addClass('hidden');
	    	});
		}.bind(this));
	},

	setGraphsContainer: function(graphsContainer) {
		this.options.graphsContainer = graphsContainer;
	},

	getGraphsContainer: function() {
		return this.options.graphsContainer;
	},

	setCurrRequests: function(currRequests) {
		this.currRequests = currRequests;
	},

	getCurrRequests: function() {
		return this.currRequests;
	},

	setCurrTimeRange: function(timeRange) {
		this.currTimeRange = timeRange;
	},

	getCurrTimeRange: function() {
		return this.currTimeRange;
	},

	setCurrAppId: function(appId) {
		this.currAppId = appId;
	},

	getCurrAppId: function() {
		return this.currAppId;
	},

	setCurrServer: function(server) {
		this.currServer = server;
	},

	getCurrServer: function() {
		return this.currServer;
	},

	setInZoomMode: function(inZoomMode) {
		this.inZoomMode = inZoomMode;
	},

	getInZoomMode: function() {
		return this.inZoomMode;
	},

	loadGraphData: function(graph, timeRangeFlag) {
		var to = Math.round((new Date()).getTime() / 1000);
		var from = -1;
		var myDate = new Date();
		if (this.currTimeRange.contains('h')) {
			myDate.setHours(myDate.getHours() - this.currTimeRange.toInt());
			from = Math.round(myDate.getTime() / 1000);
		} else if (this.currTimeRange.contains('d')) {
			myDate.setHours(myDate.getHours() - this.currTimeRange.toInt() * 24);
			from = Math.round(myDate.getTime() / 1000);
		} else if (this.currTimeRange.contains('m')) {
			myDate.setMonth(myDate.getMonth() - this.currTimeRange.toInt());
			from = Math.round(myDate.getTime() / 1000);
		}

		var server = 0;
		if (this.currServer != undefined && this.currServer != 'all') {
			server = this.currServer;
		}

		var url = graph.options.dataUrl + graph.options.counterId + '&appId=' + this.currAppId + '&from=' + from + '&server=' + server;
		/// Add "to" variable only if this is not a pie graph
		if (! [500, 503, 504, 505].contains(graph.options.counterId)) {
			url += '&to='+to;
		}

		graph.request = new Request.WebAPI({url: url, data:{}});
		this.currRequests.push(graph.request);

		var that = this;
		graph.request.addEvent("complete", function(that, response) {
			if (this.container.getParent().getElement('.graph-no-data')) {
				this.container.getParent().getElement('.graph-no-data').dispose();
			}

			// calc total length or results (for no-result layer)
			var totalLength = 0;
			if (response.responseData.series.length == 1) {
				totalLength = response.responseData.series.pick().data.length;
			} else {
				response.responseData.series.each(function(item) {
					totalLength = item.data.length;
				});
			}

			// show no-result layer if needed
			if (totalLength == 0) {
				this.series[0].setData([['No Data',100]], true);
			} else {
				var maxValue = [];

				for (i = 0; i < this.series.length; i++) {
					maxValue[i] = 0;
					var data = response.responseData.series[i].data;

					// check if no data inserted - change yAxis size
					if (data.length == 2 && data[0][1] == null && data[1][1] == null) {
						maxValue[i] = 100;
						this.series[i].setData(data, true);
					} else {
						data.each(function(item) {
							maxValue[i] = Math.max(item[1], maxValue[i]);
						});
						this.series[i].setData(data, true);
					}

				};

				if (this.series[0].yAxis != undefined) {
					if (maxValue.sum() == 0) {
						this.series[0].yAxis.setExtremes(0, 1);
					} else {
						this.series[0].yAxis.setExtremes(null, null);
					}
				}

				that.syncGraphZoom(this, timeRangeFlag);
			}

			this.hideLoading();
		}.bind(graph, that));

		graph.request.get();
		graph.showLoading();
	},

	loadMapData: function(graph) {
		var from = -1;
		var myDate = new Date();
		if (this.currTimeRange.contains('h')) {
			myDate.setHours(myDate.getHours() - this.currTimeRange.toInt());
			from = Math.round(myDate.getTime() / 1000);
		} else if (this.currTimeRange.contains('d')) {
			myDate.setHours(myDate.getHours() - this.currTimeRange.toInt() * 24);
			from = Math.round(myDate.getTime() / 1000);
		} else if (this.currTimeRange.contains('m')) {
			myDate.setMonth(myDate.getMonth() - this.currTimeRange.toInt());
			from = Math.round(myDate.getTime() / 1000);
		}

		var server = 0;
		if (this.currServer != undefined && this.currServer != 'all') {
			server = this.currServer;
		}

		// \Statistics\Model::STATS_REQUESTS_MAP = 506
		var url = baseUrl() +  '/Api/statisticsGetMap?type=506&appId=' + this.currAppId + '&from=' + from + '&server=' + server;
		var request = new Request.WebAPI({url: url, data:{}});
		this.currRequests.push(request);

		request.addEvent("complete", function(response) {
			loadMapChart(graph.get('id') + '-map', response.responseData);
		}.bind(graph));

		request.get();

		// show loading spinner
		var loading = '<div class="map-loading"><span></span></div>';
		$(graph.get('id') + '-map').set('html', loading);
	},

	reloadGraphs: function(timeRangeFlag) {
		if (timeRangeFlag == undefined) {
			timeRangeFlag = false;
		} else {
			timeRangeFlag = true;
		}

		var graphContainers = $$(this.options.graphsContainer + ' .main-apps-graph');
		if (graphContainers) {
			graphContainers.each(function(graphContainer){
				if (graphContainer.graph) {
					this.loadGraphData(graphContainer.graph, timeRangeFlag);
				}
			}.bind(this));
		}

		var mapContainers = $$(this.options.graphsContainer + ' .map-chart');
		if (mapContainers) {
			mapContainers.each(function(mapContainers){
				this.loadMapData(mapContainers);
			}.bind(this));
		}
	},

	syncGraphZoom: function(graph, timeRangeFlag) {
		// reset xAxis zoom to fit the new data
		if (timeRangeFlag) {
			if (graph.series[0].xAxis != undefined) {
				graph.series[0].xAxis.setExtremes(null, null);

				if (graph.resetZoomButton != undefined) {
					graph.resetZoomButton.hide();
				}
			}
		} else {
			if (graph.series[0].xAxis != undefined && this.chartsXAxisMin != 0 && this.chartsXAxisMax != 0) {
				graph.series[0].xAxis.setExtremes(this.chartsXAxisMin, this.chartsXAxisMax);
			}
		}

		if (this.inZoomMode) {
			if (graph.resetZoomButton != undefined) {
				graph.resetZoomButton.show();
			} else {
				graph.showResetZoom();
			}
		} else {
			if (graph.resetZoomButton != undefined) {
				graph.resetZoomButton.hide();
			}
		}
	},

	chartZoomChanges: function(min, max) {
		if (min != this.chartsXAxisMin && max != this.chartsXAxisMax) {
			this.chartsXAxisMin = min;
			this.chartsXAxisMax = max;

			$$(this.options.graphsContainer + ' .main-apps-graph').each(function(graphContainer){
				graphContainer.graph.xAxis[0].setExtremes(min, max, true);

				if (this.inZoomMode) {
					if (graphContainer.graph.resetZoomButton != undefined) {
						graphContainer.graph.resetZoomButton.show();
					} else {
						if (graphContainer.graph.series[0].xAxis != undefined) {
							graphContainer.graph.showResetZoom();
						}
					}
				} else {
					if (graphContainer.graph.resetZoomButton != undefined) {
						graphContainer.graph.resetZoomButton.hide();
					}
				}
			}.bind(this));
		}
	},

	expandChart: function(btn) {
		var windowCoords = $(window).getCoordinates();
		simpleModal = new SimpleModal({width: Math.round(windowCoords.width * 0.8), height: Math.round(windowCoords.height * 0.8), closeButton: false,
			hideHeader: false, hideFooter: false, draggable: false, overlayClick: false,
			template: "<div id=\"simple-modal-box\"><div class=\"simple-modal-header wizard-title\">{_TITLE_}</div>\
				<div class=\"simple-modal-body\">{_CONTENTS_}</div>\
				</div>"});

		var content = '<div id="popup_chart" style="height: ' + Math.round(windowCoords.height * 0.8) + 'px; width: ' + Math.round(windowCoords.width * 0.8) + 'px;"></div>';

		simpleModal.show({
	      "model":	"modal",
	      "title": _t('Statistics') + '<div style="float: right; display:inline-block; cursor: pointer; margin-right: 5px;" onclick="simpleModal.hide()">x</div>',
	      "contents": content
	    });

		if ($(btn.get('graphId')).hasClass('map-chart')) {
			this.popUpMap(btn.get('graphId'));
		} else {
			this.popUpGraph($(btn.get('graphId')).graph, Math.round(windowCoords.width * 0.8), Math.round(windowCoords.height * 0.8));
		}
	},

	reloadChart: function(btn) {
		var graphContainer = $(btn.get('graphId'));
		if (graphContainer.hasClass('map-chart')) {
			this.loadMapData(graphContainer);
		} else {
			this.loadGraphData(graphContainer.graph);
		}
	},

	popUpMap: function(chartId) {
		$('popup_chart').set('html', '<div id="popup-map" class="map-chart-wrapper" style="width: 100%; height: 100%;"><div id="popup-map-map" style="width: 100%; height: 100%;"></div></div>');
		this.loadMapData($('popup-map'));
	},

	popUpGraph: function(existingChart, width, height) {
       var options = existingChart.options;
       if (options.xAxis && options.xAxis.events) {
       		options.xAxis.events = {};
       }
       var series = existingChart.series;
       $('popup_chart').graph = new Highcharts.Chart(Highcharts.merge(options, {
            chart: {
                renderTo: 'popup_chart',
                height:height,
                width:width,
                        zoomType: 'x',
                events: {
                }
                }
        }));

    	this.loadGraphData($('popup_chart').graph);
	}
});

var zendCharts = new ZendCharts();
