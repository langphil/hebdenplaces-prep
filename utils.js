var fs = require('fs');
var parse = require('csv-parse');
var Q = require('q');

var loadCsv = function (path) {
  var deferred = Q.defer();

  fs.readFile( path, function(error, data) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      parse(data.toString(), {columns: true}, function(error, data) {
        if (error) {
          deferred.reject(new Error(error));
        } else {
          deferred.resolve(data);
        }
      });
    }
  });
  return deferred.promise;
};

var exports = module.exports = {
  loadCsv: loadCsv
};
