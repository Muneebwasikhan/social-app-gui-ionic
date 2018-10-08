import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppInfoPage } from '../app-info/app-info';

/**
 * Generated class for the BuildingAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building-app',
  templateUrl: 'building-app.html',
})

export class BuildingAppPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingAppPage');
  }

  appInfo(){
    this.navCtrl.push(AppInfoPage);
  }

}
