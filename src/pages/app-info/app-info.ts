import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { LiveChanelsPage } from '../live-chanels/live-chanels';

/**
 * Generated class for the AppInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-info',
  templateUrl: 'app-info.html',
})
export class AppInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppInfoPage');
  }

  about(){
    this.appCtrl.getRootNav().setRoot(LiveChanelsPage);
  }

}
