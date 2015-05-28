'use strict';

angular.module('ProductApp.services', []).

    factory('ProductService', ['$http',
        function($http) {
            var restUrl = 'http://localhost:8080/JAX-RS/products';
            //var restUrl = 'http://localhost:5984/test/products?callback=JSON_CALLBACK';
            return {
                getProductsJSON: function() {
                	$http.defaults.headers.common.Accept = 'application/json';              	
                    return $http.get(restUrl).
                        success(function(data) {
                        	alert(data);
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },
                getProductJSON: function(id) {
                	$http.defaults.headers.common.Accept = 'application/json';
                	
                    return $http.get(restUrl + '/' + id).
                        success(function(data) {
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                 },
                addProduct: function(productJSON) {
                	
                	// ALternatieve manier om post te doen
//                	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
//                    return $http.post(restUrl, productJSON).
//                        success(function(data) {
//                        	alert('success');
//                            return data;
//                        }).
//                        error(function(data) {
//                        	alert('error');
//                        	return data;
//                        });
                	
                	$http({
                	    method: 'POST',
                	    url: restUrl,
                	    data: productJSON,
                	    headers: {
                	        'Content-Type': 'application/json'
                	    }}).then(function(result) {
                	    		//alert('success');
                	       }, function(error) {
                	    	   	alert('error');
                	       });
                }
            };
        }
    ]);