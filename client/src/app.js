import angular from 'angular'
import 'angular-ui-router'

angular.module('olympics', ["ui.router"])
	.controller('sportsController', function($http){
		$http.get('/sports').then((response) => {
			this.sports = response.data;
		});
	})