'use strict';

angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'templateCtrl'
  }).when('/templates/:templateId', {
    templateUrl: 'templates/templates_details.html',
    controller: 'templateDetailCtrl'
  });
}])

.controller('templateCtrl', ['$scope','$http',function($scope, $http) {
	$http.get('json/templates.json').success(function(data){
		console.log(data);
		$scope.templates = data;
	});
	//console.log('Templates controller loaded');


	//console.log($scope);
}])

.controller('templateDetailCtrl', ['$scope','$http', '$routeParams','$filter', function($scope, $http, $routeParams ) {
	console.log('Templates Detail controller loaded');

	var templateId = $routeParams.templateId; //get url details id 
	$http.get('json/templates.json').success(function(data){
		
		$scope.template = $filter('filter')(data, function(d){
			return d.id == templateId;
		})[0];
		$scope.mainImage = $scope.template.images[0].name;
	});
}])

