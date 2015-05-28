'use strict';

angular.module('ProductApp.controllers', []).

    controller('ProductsController', ['$scope', '$location', 'ProductService',
        function($scope, $location, ProductService) {
            
        	ProductService.getProductsJSON().success(function (response) {
            	$scope.products = response.products;
        	});
        	
        	$scope.newProduct = function() {
        		$location.path('/products/addproduct');
        	};
        }
    ]).
    
    controller('ProductController', ['$scope', '$routeParams', 'ProductService',
        function($scope, $routeParams, ProductService) {
    		$scope.product = null;
	        var id = $routeParams.id;
	        $scope.product = ProductService.getProductJSON(id);
	        
	        ProductService.getProductJSON(id).success(function (response) {
	        	$scope.product = response;
	        });
    	}
    ]).
    
    controller('NewProductController', ['$scope', '$location', 'ProductService',
        function($scope, $location, ProductService) {
    		$scope.addProduct = function() {
    			var productJSON = {};
    			productJSON.id = $scope.newProduct.id;
    			productJSON.price = $scope.newProduct.price;
    			productJSON.name = $scope.newProduct.name;
    			productJSON.brand = $scope.newProduct.brand;
    			productJSON.description = $scope.newProduct.description;
    			
    			ProductService.addProduct(JSON.stringify(productJSON));
    			$location.path('/products/' + productJSON.id);
    		};
    	}
    ]);
