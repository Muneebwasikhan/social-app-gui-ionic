import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
disp = false;
  constructor(public navCtrl: NavController,
    private localNotifications: LocalNotifications,
    private statusBar: StatusBar,
    private platform: Platform) {

  }


  sendNotification(){
    this.platform.ready().then(() => {
      this.localNotifications.schedule({
        title: "VdeoValet Notification",
        text: "Hey vdeovalet user you have a new notification",
        trigger: {at: new Date(new Date().getTime() + 3600)},
      });
    })
  }

  modal(){
    this.disp = true;
  }
  closeModal(){
    this.disp = false;
  }

about(){
this.navCtrl.push(AboutPage);
}
}
