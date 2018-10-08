import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildingAppPage } from '../building-app/building-app';

/**
 * Generated class for the OurVisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-our-vision',
  templateUrl: 'our-vision.html',
})
export class OurVisionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OurVisionPage');
  }

  buildApp(){
    this.navCtrl.push(BuildingAppPage);
  }

}
