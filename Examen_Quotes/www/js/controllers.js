angular.module('album_list.controllers', [])

.controller('album_list_ctrl', function($scope, $timeout, $ionicModal, Bands, $ionicSideMenuDelegate, $ionicPopup) {
   // A utility function for creating a new band
  // with the given bandName
  var createBand = function(bandName) {
    var newBand = Bands.newBand(bandName);
    $scope.bands.push(newBand);
    Bands.save($scope.bands);
    $scope.selectBand(newBand, $scope.bands.length-1);
  }
  
  // Load or initialize bands
  $scope.bands = Bands.all();

  // Grab the last active, or the first band
  $scope.activeBand = $scope.bands[Bands.getLastActiveIndex()];

  // Called to create a new band
  $scope.newBand = function() {
    var bandName = prompt('Author name: ');
    if(bandName) {
      createBand(bandName);
    }
  };
  
  // Called to select the given band
  $scope.selectBand = function(band, index) {
    $scope.activeBand = band;
    Bands.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/new-album.html', function(modal) {
    $scope.albumModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  // Edit and load the Modal
  $ionicModal.fromTemplateUrl('templates/edit-album.html', function(modal) {
    $scope.editAlbumModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
   // Edit and load the Modal for edit band
  $ionicModal.fromTemplateUrl('templates/edit-band.html', function(modal) {
    $scope.editBandModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  // delete selected album
  $scope.deleteAlbum = function(i, album) {
    if (!$scope.activeBand || !album ) {
      return;
    }
    console.log("start deleting");
    $scope.showConfirm(function() {
      console.log("confirmed to delete quote "+i);
      $scope.activeBand.albums.splice(i,1);
      Bands.save($scope.bands);
    });
  }
  
    // delete selected Band
  $scope.deleteBand = function(i, band) {
    if (!$scope.activeBand || !band ) {
      return;
    }
    console.log("start deleting");
    $scope.showConfirm(function() {
      console.log("confirmed to delete author "+i);
      $scope.bands.splice(i,1);
      Bands.save($scope.bands);
    });
  }

  // Called when the form is submitted
  $scope.createAlbum = function(album) {
    if(!$scope.activeBand || !album){
		return;
	}
	$scope.activeBand.albums.push({
      title: album.title
    });
    $scope.albumModal.hide();
	
	Bands.save($scope.bands);
	
    album.title = "";
  };
  
    // Called when the band is submitted
  $scope.updateBand = function(i, band) {
    if (!$scope.bands || !band) {
      return;
    }
    $scope.bands[i] = band;
    $scope.editBandModal.hide();

    Bands.save($scope.bands);

  };

  // Open our new album modal
  $scope.newAlbum = function() {
    $scope.albumModal.show();
  };
  
  // Edit our album modal
  $scope.editAlbum = function(i, album) {
    $scope.album = {title: album.title, isDone: album.isDone};
    $scope.albumIndex = i;
    $scope.editAlbumModal.show();
  };
  
  // Called when the form is submitted
  $scope.updateAlbum = function(i, album) {
    if (!$scope.activeBand || !album) {
      return;
    }
    $scope.activeBand.albums[i] = album;
    $scope.editAlbumModal.hide();
	
    Bands.save($scope.bands);
  };
  
    // Open our new band modal
  $scope.editBand = function(i, band) {
    $scope.band = {name: $scope.bands[i].name, albums: $scope.bands[i].albums};
    $scope.bandIndex = i;
    $scope.editBandModal.show();
  };
  
    // Close the edit band modal
  $scope.closeEditBand = function() {
    $scope.editBandModal.hide();
  };

  // Close the new album modal
  $scope.closeNewAlbum = function() {
    $scope.albumModal.hide();
  };
  
  // Close the edit album modal
   $scope.closeEditAlbum = function() {
    $scope.editAlbumModal.hide();
  };
  
   $scope.toggleBands = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  // A confirm dialog
  $scope.showConfirm = function(onYes, onNo) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete',
     template: 'Are you sure you want to delete?'
   });
   confirmPopup.then(function(res) {
     if(res) {

       onYes();
     } else {

       if (onNo)
        onNo();
     }
   });
  };


  // Try to create the first band, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.bands.length == 0) {
      while(true) {
        var bandName = prompt('Your first author name:');
        if(bandName) {
          createBand(bandName);
          break;
        }
      }
	}
  });
});