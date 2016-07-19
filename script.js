(function() {
    var app = angular.module('myApp', []);

    app.controller('MyCtrl', ['$scope', 'sessionStorageService', 'localStorageService',
        function($scope, sessionService, localService) {
            $scope.submit = function(user) {
                var data = {
                    name: user.name,
                    email: user.email
                };
                var recentlyLoggedInUsers = $scope.todayUsers();
                recentlyLoggedInUsers.push(data);
                sessionService.setItem('recentlyLoggedInUsers', recentlyLoggedInUsers, 3600);
                $scope.sessionUsers = recentlyLoggedInUsers;
                //localService.removeItem('allUsers');
                var allUsers = $scope.allUsers();
                allUsers.push(data);
                localService.setItem('allUsers', allUsers);
                $scope.localUsers = allUsers;
                $scope.user = {};
            }
            $scope.todayUsers = function() {
                var recentlyLoggedInUsers = sessionService.getItem("recentlyLoggedInUsers");
                if (recentlyLoggedInUsers === null) {
                    recentlyLoggedInUsers = new Array();
                };
                return recentlyLoggedInUsers;
            }

            $scope.allUsers = function() {
                var allUsers = localService.getItem("allUsers");
                if (allUsers === null) {
                    allUsers = new Array();
                };
                return allUsers;
            }

            $scope.sessionUsers = $scope.todayUsers();

            $scope.localUsers = $scope.allUsers();
        }
    ])

    // If you want to check user is logged in like facebook use localstorage

    // If you want to promt user every time when they open the app use sessionStorage

    app.service('sessionStorageService', function() {
        return {
            setItem: function(key, value, expireTINS) { //TINS - Time In Seconds
                // To Ovid Collision With Other Contributers variables Edd Suffix to your key
                key = "ex_" + key;
                return sessionStorage.setItem(key, angular.toJson(value));
            },
            getItem: function(key) {
                key = "ex_" + key;
                var item = sessionStorage.getItem(key);
                if (item) {
                    itemCahed = angular.fromJson(item);
                    return itemCahed;
                } else {
                    return null;
                }
            }
        };
    });

    //Permanent Memory
    app.service('localStorageService', function() {
        return {
            setItem: function(key, value) { //TINS - Time In Seconds
                // To Ovid Collision With Other Contributers variables Edd Suffix to your key
                key = "ex_" + key;
                // If you are storing object convert it to json else place direct value
                return localStorage.setItem(key, angular.toJson(value));
            },
            getItem: function(key) {
                key = "ex_" + key;
                var item = localStorage.getItem(key);
                if (item) {
                    itemCahed = angular.fromJson(item);
                    return itemCahed;
                } else {
                    return null;
                }
            },
            removeItem: function(key){
                localStorage.removeItem("ex_" + key);
            }
        };
    });
})();