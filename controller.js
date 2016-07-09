angular
  .controller('truecaliaCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', '$filter'];

function loadFunction($http, $scope, structureService, $location, $filter){

  structureService.registerModule($location, $scope, "truecalia");

  $scope.isBusy = true;

  var moduleConfig = $scope.truecalia.modulescope;
  var params = {
    'from': moduleConfig.from,
    'to': moduleConfig.to,
  };
  if (moduleConfig.weeks)    params.weeks    = moduleConfig.weeks;
  if (moduleConfig.firstDay) params.firstDay = moduleConfig.firstDay;
  if (moduleConfig.nDays)    params.nDays    = moduleConfig.nDays;

  $http.get('http://pepocivs.com/truecalia.php', {params})
    .success(function(data){
      $scope.info = data.info;
      $scope.data = data.data;
      $scope.isBusy = false;
    }).error(function(){
    	$scope.error = $filter('translate')('truecalia.error-loading');
      $scope.isBusy = false;
    });
}
