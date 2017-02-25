import angular from 'angular'
import 'angular-ui-router'

angular.module('olympics', ["ui.router"])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/sports')

    $stateProvider
      // Sports navigation, default state
      .state('sports', {
        url: '/sports',
        templateUrl: 'sports/sports-nav.html',
        resolve: {
          sportsService: function($http) {
            return $http.get('/sports');
          }
        },
        controller: function(sportsService) {
          this.sports = sportsService.data;
        },
        controllerAs: 'sportsCtrl'
      })

      // Print medals for a particular sport
      .state('sports.medals', {
        url: '/:sportName',
        templateUrl: 'sports/sports-medals.html',
        resolve: {
          sportService: function($http, $stateParams) {
            return $http.get(`/sports/${$stateParams.sportName}`);
          }
        },
        controller: function(sportService) {
          this.sport = sportService.data;
        },
        controllerAs: 'sportCtrl'
      })

      // Create new medals
      .state('sports.new', {
        url: '/:sportName/medal/new',
        templateUrl: 'sports/new-medal.html',
        controller: function($stateParams, $state){
          this.sportName = $stateParams.sportName;
          this.saveMedal = function(medal){
            // Submit form - implement in express later
            console.log('Submitting medal:', medal);
            console.log('state params sport name is:', $stateParams.sportName);
            
            $state.go('sports.medals', {sportName: $stateParams.sportName});
          };
        },
        controllerAs: 'newMedalCtrl'
      })
  })