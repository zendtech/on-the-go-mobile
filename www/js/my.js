var gatewayURL = 'http://54.209.165.66/on-the-go-api';
var customers = {
	'_embedded' : {
		'customers' : [ {
			'id' : '0',
			'phone' : '123',
			'location' : 'San Franciscon',
			'name' : 'Static Joe',
			'activity' : 'walking'
		} ]
	}
};
/**
 * Sends GET /customers to API gateway.
 * 
 * This method is automatically generated. Don't modify it. Application logic
 * for handling the AJAX response should be placed in
 * <code>onGetCustomers</code>.
 */
function getCustomers() {
	// This method is automatically generated. Don't modify it.
	jQuery.mobile.showPageLoadingMsg('Loading');
	$.ajax({
		url : gatewayURL + '/customers',
		cache : false,
		type : 'GET',
		success : function(data, status, xhr) {
			jQuery.mobile.hidePageLoadingMsg();
			onGetCustomers(data);
		},
		error : ajaxErrorHandler
	});
}

/**
 * Handle response from GET /customers
 * 
 * @param response
 * @returns
 */
function onGetCustomers(response) {
	customers = response._embedded.customers;

	var newCustomers = '';
	$.each(customers, function(index, item) {
		newCustomers += '<li data-theme="">' + '<a href="#page2?empId=' + index
				+ '" data-transition="none">' + item.name + '</a>' + '</li>';
	});
	$('#customers li[role!=heading]').remove();
	$('#customers').append(newCustomers).listview('refresh');
}

function ajaxErrorHandler(xhr, ajaxOptions, thrownError) {
	jQuery.mobile.hidePageLoadingMsg();
	var msg = 'Ajax error. ';
	if (ajaxOptions.statusText != null && ajaxOptions.statusText != '')
		msg = msg + '<br/>' + ajaxOptions.statusText + '<br/>';
	else if (thrownError != null && thrownError != '')
		msg = msg + '<br/>' + thrownError + '<br/>';
	else if (xhr != null && xhr.statusText != null && xhr.statusText != '')
		msg = msg + '<br/>' + xhr.statusText + '<br/>';
	msg = msg + 'Trying static data!';
	$('#errorMessage').html(msg).show('slow', function() {
		onGetCustomers(customers);
		setTimeout(function() {
			$('#errorMessage').hide('slow');
		}, 1000);
	});
}

$(document).ready(function() {
	$('#getListBtn').bind('click', getCustomers);
	jQuery.support.cors = true;
	$('#customers li[role!=heading]').remove();
});

$(document).bind(
		'pagebeforechange',
		function(e, data) {
			if (typeof data.toPage === 'string') {
				var r = data.toPage.match(/page2\?empId=(.*)/);
				if (r) {
					var customer = customers[r[1]];
					if (customer) {
						$("#customername").html(customer.name);
						$("#customeractivity").html(
								'Is currently ' + (customer.activity || '') + ' in:');
						if (customer.phone) {
							$("#customercall").attr('href', 'tel:' + customer.phone)
									.show().trigger('enhance');
						} else {
							$("#customercall").hide();
						}
						var location = customer.location;
						$("#locationMap").attr(
								"src",
								"https://maps.googleapis.com/maps/api/staticmap?center="
										+ location
										+ "&zoom=14&size=288x200&markers="
										+ location + "&sensor=false");
					}
				}
			}
		});

//TabBar support

window.CodiqaControls = {
  types: {},
  instances: {},

  define: function(type, control) {
    control._type = type;
    this.types[type] = control;
  },

  register: function(type, id, opts) {
    var instance = new this.types[type]();
    instance._type = type;
    instance._id = id;
    instance._opts = opts;
    this.instances[id] = instance;

    if(!this.types[type].prototype._isInited) {
      this.types[type].prototype.initType();
    }
    return instance;
  },

  init: function() {
    for(var type in this.types) {
      this.types[type].prototype.initType();
    }
  },

  refresh: function() {
    for(var x in this.instances) {
      this.instances[x].refresh && this.instances[x].refresh();
    }
  },

  callbackInit: function() {

  },

  getInstances: function(type) {
    var x, instance, instances = [];
    for(x in this.instances) {
      instance = this.instances[x];
      if(instance._type === type) {
        instances.push(instance);
      }
    }
    return instances;
  }

};


CodiqaControls.GoogleMap = function () {};
CodiqaControls.GoogleMap.prototype.initType = function() {
  if( window.CodiqaControls.getInstances('googlemaps').length ) {
    if(this._isInited) {
      if(window.google && window.google.maps) {
        CodiqaControls.GoogleMap.prototype.callbackInit();
      }
    } else {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?sensor=true&callback=CodiqaControls.types.googlemaps.prototype.callbackInit";
      document.getElementsByTagName("head")[0].appendChild(script);
      this._isInited = true;
    }
  }
};
CodiqaControls.GoogleMap.prototype.callbackInit = function() {
  var x, instances = window.CodiqaControls.getInstances('googlemaps');
  for(x = 0; x < instances.length; x++) {
    instances[x]._opts.ready(instances[x]);
  }
};
CodiqaControls.GoogleMap.prototype.refresh = function() {
  if( this.map && this.el && $(this.el).closest('.ui-page-active').length ) {
    google.maps.event.trigger(this.map, 'resize');
    this.center && this.map.setCenter(this.center);
  }
};
window.CodiqaControls.define('googlemaps', CodiqaControls.GoogleMap);


(function($) {
  $.widget('mobile.tabbar', $.mobile.navbar, {
    _create: function() {
      // Set the theme before we call the prototype, which will 
      // ensure buttonMarkup() correctly grabs the inheritied theme.
      // We default to the "a" swatch if none is found
      var theme = this.element.jqmData('theme') || "a";
      this.element.addClass('ui-footer ui-footer-fixed ui-bar-' + theme);

      // Make sure the page has padding added to it to account for the fixed bar
      this.element.closest('[data-role="page"]').addClass('ui-page-footer-fixed');


      // Call the NavBar _create prototype
      $.mobile.navbar.prototype._create.call(this);
    },

    // Set the active URL for the Tab Bar, and highlight that button on the bar
    setActive: function(url) {
      // Sometimes the active state isn't properly cleared, so we reset it ourselves
      this.element.find('a').removeClass('ui-btn-active ui-state-persist');
      this.element.find('a[href="' + url + '"]').addClass('ui-btn-active ui-state-persist');
    }
  });

  $(document).on('pagecreate create', function(e) {
    return $(e.target).find(":jqmData(role='tabbar')").tabbar();
  });
  
  $(document).on('pageshow', ":jqmData(role='page')", function(e) {
    // Grab the id of the page that's showing, and select it on the Tab Bar on the page
    var tabBar, id = $(e.target).attr('id');

    tabBar = $.mobile.activePage.find(':jqmData(role="tabbar")');
    if(tabBar.length) {
      tabBar.tabbar('setActive', '#' + id);
    }

    window.CodiqaControls.refresh();
  });

  window.CodiqaControls.init();
  
})(jQuery);