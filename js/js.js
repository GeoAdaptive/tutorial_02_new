// here is the first comment.
// here is the first comment.
// here is the first comment.
// here is the first comment.


///This is a 3-STEP process
/// 1. Setting up the Basemap
// here this function sets up the name (to match the id of the map div element in the HTML), the center with coordinates(latitude, longitude), and the zoom level(larger level, more zoom-in) for the map.
var map = L.map('map', {
  center: [-23.817, -55.731],
  zoom: 6.5
});

// here we set up the basemap style
// we can also set it as var Style = 'dark';
// other styles are also available to choose from
// here maybe: http://leaflet-extras.github.io/leaflet-providers/preview/
var Style = 'light';

// this code constructs the map object
L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);
console.log("mapped");

///2. Adding the markers
// now add the marker here, with a popup text explaining the marker
L.marker([-25.262, -57.581]).addTo(map)
    .bindPopup('Asuncion, Paraguay')
    .addTo(map);

///3. Adding the layer data to be mapped
// calling the data to be mapped, that is in this case, stored within the Github repo data folder
// var Paraguay_Department = "https://raw.githubusercontent.com/GeoAdaptive/Resources_library/master/Example_Paraguay/data/ADM_PRY_DEP.geojson?token=AgSQK2E68ldQRZyJTVEkUhY-YQb960hYks5aNCaMwA%3D%3D";
var MappedPoints;
var MappedPolylines;
var MappedPolygons;

//use this function to download and create mappable objects
// $(document).ready(function(){
//   $.ajax(Paraguay_Department).done(function(data){
//     var parsedData = JSON.parse(data);
//     var LayerMappedPolygon = L.geoJSON(parsedData,
//       {
//         style: {opacity:1,width:0.5,color:'#85C1E9'},
//         pointToLayer: function (feature, latlng) {
//         return new L.Polygon(latlng, {
//         });
//       },
//     }).bindPopup('I\'m in Paraguay!')
//     .addTo(map);
//   })
// });


//commenting the code above.
//4. Tutorial 02: Details of mapping Points, Lines and Polygons
//4.1 Mapping Multiple Points
var PointsUrl = "https://raw.githubusercontent.com/GeoAdaptive/Tutorial_02/master/data/INFR_middleschool_Paraguay.geojson";
// console.log("points url linked.");
$(document).ready(function(){
  $.ajax(PointsUrl).done(function(data){
    // console.log("ajax performed.");
    var parsedData = JSON.parse(data);
    // console.log("parsedata being created.");
    MappedPoints = L.geoJSON(parsedData,
      {
        style: {opacity:0.2,radius:10,width:0.5,color:'#00C1E9'},
        pointToLayer: function (feature, latlng) {
        return new L.circleMarker(latlng, {
        });
      },
    }).bindPopup('I\'m a point!');
    console.log("points mapped.");
  });
});


//4.2 Mapping Lines
var LinesUrl = "https://raw.githubusercontent.com/GeoAdaptive/Tutorial_02/master/data/primaryroads.geojson";
console.log("points url linked again.");
$(document).ready(function(){
  $.ajax(LinesUrl).done(function(data){
    var parsedData = JSON.parse(data);
    MappedPolylines = L.geoJSON(parsedData,
      {
        style: {opacity:1,width:0.5,color:'#D35400'},
        pointToLayer: function (feature, latlng) {
        return new L.Polyline(latlng, {
        });
      },
    }).bindPopup('I\'m a polyline!');
  });
});

//4.3 Mapping Polygons
var PolygonsUrl = "https://raw.githubusercontent.com/GeoAdaptive/Tutorial_02/master/data/ADM_PRY_DEP.geojson";
$(document).ready(function(){
  $.ajax(PolygonsUrl).done(function(data){
    var parsedData = JSON.parse(data);
    MappedPolygons = L.geoJSON(parsedData,
      {
        style: {opacity:1,width:0.5,color:'#F9E79F'},
        pointToLayer: function (feature, latlng) {
        return new L.Polygon(latlng, {
        });
      },
    }).bindPopup('I\'m a polygon!');
  });
});

//5.1 Control the display
$('#mappoints').click(function(){
  map.addLayer(MappedPoints);
  console.log("points mapped!");
});

$('#mappolylines').click(function(){
  map.addLayer(MappedPolylines);
  console.log("points mapped!");
});

$('#mappolygons').click(function(){
  map.addLayer(MappedPolygons);
  console.log("points mapped!");
});


//5.2 Clear Selection
$('#reset').click(function(){
  map.removeLayer(MappedPoints);
  map.removeLayer(MappedPolylines);
  map.removeLayer(MappedPolygons);
})
