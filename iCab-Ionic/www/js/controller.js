
app
.controller('LoginCtrl', function($scope, $rootScope, $ionicPopup, $state, $localStorage, Data) {
   
    $scope.loginInfo = {};
    $rootScope.loginRequest = {};
   
   if ($localStorage.loggedIn == "true"){
       $state.go('booking');
   }
                          
    $scope.doLogin = function (loginData) 
	{
		$rootScope.loginRequest = JSON.stringify({
											"passenger_id": loginData.passengerId ,
											"passenger_mobile": loginData.passengerMobile
										});
							
        Data.post('login', $rootScope.loginRequest).then(function (results) 
		{
		    if (results.api_status =="success")
            { 
                     if (results.status == "success") 
                    {
                    $localStorage.passenger_id = loginData.passengerId;
                    $localStorage.passenger_mobile = loginData.passengerMobile;
                    $localStorage.jsonOTP = results.icab_otp;
                    $localStorage.loggedIn = "true";
                    
                    $state.go('verification');
                    }
                    else if (results.status=="failed")
                    {
                       $ionicPopup.alert({
                            title: 'Login failed!',
                            template: 'Please check your credentials!',         
                    })
                    }

          } else if (results.api_status =="success") {
                $ionicPopup.alert({
                    title: 'API failed!',
                    template: 'Please check your API Link',       
            })

            };
    })
    }
})

.controller('VerifyOTPCtrl', function($scope, $rootScope, $ionicPopup, $state, $localStorage, Data) {
   
    $scope.loginInfo = {};
    $scope.vOTP="";
    $scope.count = 0;

    $scope.doVerifyOTP = function(vOTP) {
 
            $scope.vOTP=vOTP;
            
            if($localStorage.jsonOTP == $scope.vOTP)
            {
                Data.post('validOTP', $rootScope.loginRequest).then(function (results){
			
                 if (results.api_status =="success")
                 { 
                        if (results.status == "success") 
                        {
                            $state.go('booking');
                        }
                        else if (results.status=="failed")
                        {
                            $ionicPopup.alert({
                                            title: 'OTP failed!',
                                            template: 'Please check your verification Code!',  
                                            })
                        }
                        else if (results.api_status =="success")
                         {
                               $ionicPopup.alert({
                                title: 'API link failed!',
                                template: 'Please check your Database access link',       
                            })

                         }
                 }
			}) 
               
            } 
 
      };

   $scope.doResend = function(){
 				

        Data.post('login', $rootScope.loginRequest).then(function (results) 
		{     
            
		    if (results.api_status =="success")
            { 
                     if (results.status == "success") 
                    {
                        $ionicPopup.alert({
                            title: 'Re-Send',
                            template: 'Verification code has been sent to your email-id!', 
                          }) 
                        $state.go('verification');
                    }
                    else if (results.status=="failed")
                    {
                        $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!',         
                    })
                    }

          } else if (results.api_status =="success") {
                        $ionicPopup.alert({
                            title: 'API link failed!',
                            template: 'Please check your Database access link',       
                              })

            };
    })
   }
})	

.controller('BookRideCtrl', function($scope, $ionicPopup, $state, $localStorage, Data) {
         
 
    $scope.rideId = "";
    $scope.pickUpLoc = "";
    $scope.destiLoc = "";
    $scope.date = "";
    $scope.time = "";

    	$scope.goBack = function()
	{
		$state.go('booking');
	};

    $scope.doBookNow = function (pickUpLoc, destiLoc, date, time) 
	{
         $scope.pickUpLoc = pickUpLoc ;
         $scope.destiLoc =  destiLoc;
         $scope.date = date;
         $scope.time = time;

         var bookRideRequest = JSON.stringify({
											"passenger_id": $localStorage.passenger_id,
											"date_of_journey": date,
                                            "time_of_journey": time,
                                            "start_from": pickUpLoc,
                                            "end_to": destiLoc
										});
                  						
        Data.post('bookCab', bookRideRequest).then(function (results) 
		{  
		    if (results.api_status =="success")
            { 
                        $scope.rideId = results.icab_id;
                        $ionicPopup.alert({
                             title: 'Booking Status',
                             scope: $scope,
                             template:'Ride id : {{rideId}} <br> From  : {{pickUpLoc}} <br> To  : {{destiLoc}} <br> Data : {{date | date}} <br> Time : {{time }} <br> Status: "Pending"',
                        })
                  
                    
          } else if (results.api_status =="success") {
                        $ionicPopup.alert({
                            title: 'API link failed!',
                            template: 'Please check your Database access link',        
                             })

                    };
      })

    }
    
})	

.controller('UpcomingCtrl', function($scope, $ionicPopup, $state, $localStorage, Data) 
{
	
	var upcomingRideRequest = JSON.stringify({
											"passenger_id": $localStorage.passenger_id,
										});
		
	Data.post('bookinglists/upcoming', upcomingRideRequest).then(function (results) 
	{
		if (results.api_status == "success") 
		{
			$scope.upcomingRidelists = results.upcomingLists;
		}
		else if (results.api_status == "failed")
		{
		   $ionicPopup.alert(
		   {
				title: 'API link failed!',
                template: 'Please check your Database access link',        
			});
		}
	});
})

.controller('CompletedCtrl', function($scope, $rootScope, $ionicPopup, $state, $localStorage, Data) 
{
	
	var completedRideRequest = JSON.stringify({
											"passenger_id": $localStorage.passenger_id
										});
		
	Data.post('bookinglists/completed', completedRideRequest).then(function (results) 
	{
		if (results.api_status == "success") 
		{
			$scope.completedRidelists = results.completedLists;
		}
		else if (results.api_status == "failed")
		{
		   $ionicPopup.alert(
		   {
				title: 'API link failed!',
                template: 'Please check your Database access link',        
			});
		}
	});
})

.controller('BookingStsTabCtrl', function($scope, $rootScope, $ionicPopup, $state, $localStorage, $stateParams, Data) 
{
		$scope.goBack = function()
	{
		$state.go('booking');
	};

	var BookingStsTabRequest = JSON.stringify({
											"passenger_id": $localStorage.passenger_id,
                                            "filter_id": $stateParams.filterId
										});
		
	Data.post('bookinglists/filterbystatus', BookingStsTabRequest).then(function (results) 
	{
		if (results.api_status == "success") 
		{
			$scope.BookingStslists = results.FilteredLists;
		}
		else if (results.api_status == "failed")
		{
		   $ionicPopup.alert(
		   {
				title: 'API link failed!',
                template: 'Please check your Database access link',        
			});
		}
	});

    $scope.docancelRide = function(rideId) {
        
        var confirmCancel = $ionicPopup.confirm(
							{
								title: 'Confirm Alert!',
								template: 'Are you sure to Cancel ?',         
							});
	    confirmCancel.then(function(resposnse){
            if (resposnse){
                var cancelRideRequest = JSON.stringify({
                                                "icab_id": rideId
                })

         Data.post('bookinglists/usercancelrequest', cancelRideRequest).then(function (results) 
		{     
            
		    if (results.api_status =="success")
            { 
                     if (results.status == "success") 
                    {
                        $ionicPopup.alert({
                            title: 'Cancel Ride!',
							template: 'Ride Cancellation Successful!',     
                          }) 
                                          }
                    else if (results.status=="failed")
                    {
                        $ionicPopup.alert({
                        title: 'Cancel Ride!',
							template: 'Ride Cancellation Failed!',          
                    })
                    }

          } else if (results.api_status =="success") {
                        $ionicPopup.alert({
                            title: 'API link failed!',
                            template: 'Please check your Database access link',       
                              })

            };
       })
            }
        })
    }
})

.controller('aboutUsCtrl', function($scope, $state) 
{
	$scope.goBack = function()
	{
		$state.go('booking');
	}
})

.controller('BookRideCtrl', function($scope, $state) 
{
	$scope.goBack = function()
	{
		$state.go('booking');
	}
})

.controller('myRidesCtrl', function($scope, $state) 
{
	$scope.goBack = function()
	{
		$state.go('booking');
	}
})
