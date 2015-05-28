angular.module('album_list.services', [])

//Services
.factory('Bands', function() {
  return {
    all: function() {
      var bandString = window.localStorage['bands'];
      if(bandString) {
        return angular.fromJson(bandString);
      }
      return [];
    },
    save: function(bands) {
      window.localStorage['bands'] = angular.toJson(bands);
    },
    newBand: function(bandName) {
      // Add a new band
      return {
        name: bandName,
        albums: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveBand']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveBand'] = index;
    }
  }
})