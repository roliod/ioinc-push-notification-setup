import { Push, PushObject, PushOptions } from '@ionic-native/push';


import firebase from 'firebase';


@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;
  deviceToken: any;

  //nav menu
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, index: number}>;


  constructor(private push: Push) {
    platform.ready().then(() => {

        this.initPushNotification();

    });


  }


  initPushNotification() {

    console.log('We have permission to send push notifications');

    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: 'YOUR_SENDER_ID',
        forceShow: 'true',
        sound: 'true',
        vibrate: 'true'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {},
      browser: {
         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
     }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((registration: any) => {
        //at this point you can send your token to your server, you would need it
        console.log('Device registered - ' + registration.registrationId);
    });

    pushObject.on('notification').subscribe((notification: any) => {

    console.log('Received a notification', notification);

    //Notification Display Section
    let confirmAlert = this.alertCtrl.create({
      title: 'New Notification',
      message: notification.message,
      buttons: [{
      text: 'Ignore',
      role: 'cancel'
      }, {
      text: 'View',
      handler: () => {

          //add page to want the user to be redirected to
          this.nav.push(YOUR_PAGE);
      }
      }]

    });

      confirmAlert.present();

    });

      pushObject.on('error').
      subscribe(error =>
      console.error('Error with Push plugin', error));
  }

}
