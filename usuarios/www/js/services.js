angular.module('starter.services',[])

.factory('Usuarios',function($resorces,$rootScope){
  var resource = $resource('https://reqres.in/api/users/:pk/',{},{
    query:{method:'GET'},
    save:{method:'POST'},
    get:{method:'GET'},
    update:{method:'PUT'},
    delete:{method:'DELETE'}
  });
  return resource;
})
