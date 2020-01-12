
/**
 * This utility method converts a date to a string according to the format
 * @param {type} date
 * @param {type} format, e.g., "yyyy:MM:dd:HH:mm" converts the date "2017-01-26 5:15pm" to "2017:01:26:17:15"
 * @param {type} utc
 * @returns {unresolved}
 */
function formatDate(date, format, utc) {
  var MMMM = [
    "\x00",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var MMM = [
    "\x01",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var dddd = [
    "\x02",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
    var s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
}

/**
 * Formatting the date string
 * @param {type} d, the date argument
 * @returns formatted Date string
 */
function format(d) {
  return formatDate(d, "yyyy-MM-dd");
}

//functions to check if a char is a number or letter
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isNumber(str) {
    return str.length === 1 && str.match(/[0-9]/);
}

//Gets the field name and validates the salespersons ID
function get_name_value(fieldName, defaultValue) {
    var value = $('#' + fieldName).val();
    if (value == "") {
        value = defaultValue;
        $('#' + fieldName).val(value);
    }
    if (fieldName == "salesperson") {
        if (!(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))) {
            alert("Please enter a correct OUCU");
            return "";
        }
    }
    return value;
}

/**
 /**
 * This is the main class
 */
var app = {
	// Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.receivedEvent("deviceready");
    },
    // Update DOM on a Received Event (note this is called once the page has loaded, exactly once)
    receivedEvent: function(id) {

        /**** GLOBAL VARIBLES ****/
        var widgetID = 1;
        var orderList = "";
        var orderIndex = 0;
        var clientList = "";
        var latitude = "";
        var longitude = "";
        var clientCoords = [];
        
        /**** HELPER FUNCTIONS ****/
        //returns all orders on the database
        function getOrderList() {
            /* Invoke the RESTful API to get the list of orders */
            var url = "http://137.108.92.9/openstack/api/orders/?OUCU=zy619765&password=kQOxIYxZ";
            $.get(url, function(data) {
              orderList = $.parseJSON(data);
              if (orderList.status == "success") {
                  
              } else {
                alert(data);
              }
            });  
        }
        
        //gets client IDs and adds to the client_id dropdown list for selection
        function getClientList() {
            /* Invoke the RESTful API to get the list of clients */
            var url = "http://137.108.92.9/openstack/api/clients/?OUCU=zy619765&password=kQOxIYxZ";
            $.get(url, function(data) {
              clientList = $.parseJSON(data);
              if (clientList.status == "success") {
                for (i = 0; i < Object.keys(clientList.data).length; i++)
                { 
                     $('#client_id').append( '<option value="'+clientList.data[i].id+'">'+clientList.data[i].name+'</option>' );
                }
                setTimeout(function() {getClientCoords()}, 3000);
              } else {
                alert(data);
              }
            }); 
            
        } 
        
        // gets the current widgetID information
        function getWidget(widgetID) {            
        /* Invoke the RESTful API to get the widget */
            var url = "http://137.108.92.9/openstack/api/widgets/" + widgetID + "?OUCU=zy619765&password=kQOxIYxZ";
            $.get(url, function(data) {
              var obj = $.parseJSON(data);
              if (obj.status == "success") {
                    //show image
                    var myImage = '';
                    myImage += '<img src="'+ obj.data[0].url +'" />';
                    document.getElementById('widgetImage').innerHTML = myImage; 
                    //show description
                    var myDescription = '';
                    myDescription += '<p>'+ obj.data[0].description +'</p>';
                    document.getElementById('widgetDescription').innerHTML = myDescription; 
                    //show price
                    document.getElementById("price").value = obj.data[0].pence_price;
              } else {
                alert(data);
              }
            });  
        }
        
        // adds item to order items database
        function addItem(ordID, widID, quant, agreedPrice){
                //Post the new order to the database
                var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "https://cors-anywhere.herokuapp.com/http://137.108.92.9/openstack/api/order_items/",
                  "method": "POST",
                  "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                    "Postman-Token": "239e04a2-c780-4800-86a4-1ac989809862",     
                  },
                  "data": {
                    "OUCU": "zy619765",
                    "password": "kQOxIYxZ",
                    "order_id": ordID,
                    "widget_id": widID,
                    "number": quant,
                    "pence_price": agreedPrice
                  }
                }

                $.ajax(settings).done(function (response) {
                  console.log(response);
                //update the screen to show the new item
                  showOrder(orderIndex);
                });  

        }
        
        //shows the order on the screen
        function showOrder(screenOrder) { 
            var url = "http://137.108.92.9/openstack/api/order_items?OUCU=zy619765&password=kQOxIYxZ&order_id=" + orderList.data[screenOrder].id;
            $.get(url, function(data) {
                var obj = $.parseJSON(data);
                if (obj.status == "success") {
                    
                    //sets the client name
                    var client = orderList.data[screenOrder].client_id;
                    client = client - 1
                    var clientHeader = '<p>Dear ' + clientList.data[client].name + '</p>';
                    document.getElementById('client_header').innerHTML = clientHeader;
                    
                    //sets the order header
                    var addr = clientList.data[client].address;
                    addr = addr.split(",");
                    var orderHeader = '<p>Your Order at ' + addr[0] + ' ' + orderList.data[screenOrder].date +'</p>';
                    document.getElementById('order_header').innerHTML = orderHeader;
                    
                    
                    //writes the order items
                    var subtotal = 0;
                    var order_string = ''
                    for (i = 0; i < Object.keys(obj.data).length; i++)
                    { 
                        var gbp_price = obj.data[i].pence_price/100;
                        var item_total = obj.data[i].number * gbp_price;                        
                        order_string += '<p>' + obj.data[i].number + '(widget ' + obj.data[i].widget_id + ') x ' + gbp_price + 'GBP = ' + (Math.round(item_total*100)/100)  + ' GBP</p>' ;
                        subtotal = subtotal + item_total;
                    } 
                    document.getElementById('order_items').innerHTML = order_string;
                    
                    //writes the totals
                    var latitude = orderList.data[screenOrder].latitude;
                    var longitude = orderList.data[screenOrder].longitude;
                    var totals = '<p>Subtotal: ' + (Math.round(subtotal*100)/100) + ' GBP</p>';
                    totals += '<p>VAT: ' + (Math.round(subtotal*20)/100) + ' GBP</p>';
                    totals += '<p>Total is: ' + (Math.round(subtotal*120)/100) + ' GBP</p>';
                    totals += '<p>Latitude: ' + latitude + '</p>';
                    totals += '<p>Longitude: ' + longitude + '</p>';
                    document.getElementById('total').innerHTML = totals; 
                    
                    //update the map with the current orders location
                    getSalepersonLocation();
                
              } else {
                var errorMessage = '<p>No order items for order number ' + orderList.data[screenOrder].id + '</p>';
                document.getElementById('client_header').innerHTML = errorMessage;
                document.getElementById('order_header').innerHTML = "";  
                document.getElementById('order_items').innerHTML = "";
                document.getElementById('total').innerHTML = "";   
              }
            });  
        }  
        
        
        // gets the client coordinates for all clients in the client list
        function getClientCoords() {
            for (var i = 1; i <= Object.keys(clientList.data).length; i++)
                {
                    getCoords(i);
                }
        }
        
        // gets the client coordinates for the specified clientID
        function getCoords(id) {                
                var index = id - 1;
                var addr = clientList.data[index].address;
                var addrSend = encodeURIComponent(addr);
                var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/http://nominatim.openstreetmap.org/search/" + addrSend + "?format=json&countrycode=gb",
                "method": "GET",
                "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "fe908fe0-d1aa-4381-bce7-0543599f37ce"                    
                    }  
                }
                $.ajax(settings).done(function (response) {
                    clientCoords[2*index] = response[0].lat;
                    clientCoords[2*index+1] = response[0].lon;
                });
        }  
        
        //gets the salespersons current coordinates and shows this on the map
        function getSalepersonLocation() {
            function onSuccess(position) {
                map.removeObjects(map.getObjects());
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                var myMarker = new H.map.Marker({lat:latitude, lng:longitude});
                map.addObject(myMarker);
                map.setCenter({lat:latitude, lng:longitude});
                map.setZoom(14);
            }
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
            }            
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
        }  
        
        //get the coordinates from todays orders
        function recentOrders() {
            //remove any current markers 
            map.removeObjects(map.getObjects());
            var markers = [];
            //loops through database and adds the location of the company if the date is current day
            var today = new Date();
            today = format(today);
            for (i = 0; i < Object.keys(orderList.data).length; i++)
                    {
                        var orderDate = new Date(orderList.data[i].date);
                        orderDate = format(orderDate);

                        if (orderDate == today) {
                            var client = orderList.data[i].client_id;                            
                            var lati = clientCoords[(2*(client - 1))];
                            var long = clientCoords[((2*(client - 1)) + 1)]
                            markers.push(new H.map.Marker({lat:lati,  lng:long})); 
                        }                        
              } 
            
            var group = new H.map.Group();
            //add markers to the group
            group.addObjects(markers);
            map.addObject(group);

            // get geo bounding box for the group and set it to the map
            map.setViewBounds(group.getBounds());            
        } 
        
    
        //initialise the app
        getSalepersonLocation();
        getClientList();
        getWidget(widgetID);
        getOrderList();         
        
        
        /**** HERE MAPS CODE ****/
        // initialize the platform object:
        var platform = new H.service.Platform({
            app_id: "xxxx", 
            app_code: "xxxx" 
        });
        
        // obtain the default map types from the platform object
        var defaultLayers = platform.createDefaultLayers();
        // instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById("map_canvas"),
            defaultLayers.normal.map
        );
        var ui = H.ui.UI.createDefault(map, defaultLayers);
        // change the default settings of UI
        var mapSettings = ui.getControl("mapsettings");
        var zoom = ui.getControl("zoom");
        var scalebar = ui.getControl("scalebar");
        var panorama = ui.getControl("panorama");
        panorama.setAlignment("top-left");
        mapSettings.setAlignment("top-left");
        zoom.setAlignment("top-left");
        scalebar.setAlignment("top-left");
        var marker = null;
        
        /**** THE MegaMax OBJECT ****/
        function MegaMax() {
                        
            /**** BUTTON EVENT HANDLERS ****/
            //shows the previous widget
            this.prevWidget = function() {
                if (widgetID==1){
                    alert("No previous widgets")
                } else {
                    widgetID = widgetID - 1;
                    getWidget(widgetID);                   
                }
                //update the users location
                getSalepersonLocation();
            };
            
            //shows the next widget 
            this.nextWidget = function() {
                if (widgetID==10){
                    alert("End of widgets list")
                } else {
                    widgetID = widgetID + 1;
                    getWidget(widgetID);                    
                }
                //update the users location
                getSalepersonLocation();
            };
            
            //shows the previous order
            this.prevOrder = function() {          
                if (orderIndex==0) {
                    alert("No previous order")
                }
                else {
                    orderIndex = orderIndex -1;                        
                }
                
                showOrder(orderIndex);            
            };
            
            //shows the next order
            this.nextOrder = function() { 
                var totalOrders = Object.keys(orderList.data).length-1;  
                if (orderIndex==totalOrders) {
                    alert("No next order")
                }
                else {
                    orderIndex = orderIndex +1;                        
                }
                
                showOrder(orderIndex); 
            };
            
            //adds the current widget along with number and agreed price
            this.add = function() {
                var quantity = get_name_value("number", "");
                var price = get_name_value("price", "");
                addItem(orderList.data[orderIndex].id, widgetID, quantity, price);
            };
            
            //Adds a new order to the system
            this.place = function() {               
                
                var oucu = get_name_value("salesperson", "");
                if(oucu!="") {
                    var e = document.getElementById("client_id");
                    var clientIndex = e.options[e.selectedIndex].value;
                                       
                        var settings = {
                          "async": true,
                          "crossDomain": true,
                          "url": "https://cors-anywhere.herokuapp.com/http://137.108.92.9/openstack/api/orders/",
                          "method": "POST",
                          "headers": {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "cache-control": "no-cache",
                            "Postman-Token": "7549de89-e95d-4ca9-8e51-c4008a90a65d"
                          },
                          "data": {
                            "OUCU": oucu,
                            "password": "xxxx",
                            "client_id": clientIndex,
                            "latitude": latitude,
                            "longitude": longitude
                          }
                        }

                        $.ajax(settings).done(function (response) {
                          console.log(response);  
                          getOrderList();
                        });
                        
                        //adds the markers
                        recentOrders();
                    }                    
                 
                else {
                    console.log("Blank OUCU")
                }
            };  
        
            }
            
        //Create the MegaMax 
        this.MegaMax = new MegaMax(); 
      }    
};
app.initialize(); 
