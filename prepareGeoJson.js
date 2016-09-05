#!/usr/bin/env node

var fs = require('fs');
var loadCsv = require('./utils').loadCsv;

var formatter = function(places) {
  return {
    "type": "FeatureCollection",
    "features": places.map(placeFormatter).filter(function(x) {
      return x !== null;
    })
  };
};

var placeFormatter = function(place) {
  var lat = parseFloat(place.lat);
  var lon = parseFloat(place.lon);
  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }
  return {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [lat, lon],
    },
    'properties': {
      'name': place.name,
      'comments': place.comments,
    }
  };
};

loadCsv('hebdenplaces.csv')
  .then(formatter)
  .then(function (data) {
    fs.writeFile('hebdenplaces.json', JSON.stringify(data, null, 2));
  })
  .catch(function (error) {
    console.error(error);
  });
