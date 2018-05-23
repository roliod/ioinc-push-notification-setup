angular.module('CallApp', ['ionic','ngCordova','CallAppcontrollers', 'ngCordova.plugins.push'])


.run(function($ionicPlatform, $cordovaPush) {

  $ionicPlatform.ready(function() {

		var push = PushNotification.init({
        android: {
        	senderID: '847073181237',
        	forceShow: 'true',
          sound: 'true',
          vibrate: 'true'
        },
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
        	alert: "true",
        	badge: "true",
        	sound: "true"
        },
        windows: {}
		});

		push.on('registration', (data) => {

			//at this point you can send the device token to your server, you would need it
			console.log ('deviceToken:' + data.registrationId);
		});

		push.on('notification', (data) => {
			console.log ('Notification:' + data);
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
		});

		push.on('error', (e) => {
			 console.log ('Error' + e.message);
		});


	});

})
