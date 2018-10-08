import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ha} from './../../assets/js/main.js';


/**
 * Generated class for the VideoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-list',
  templateUrl: 'video-list.html',
})
export class VideoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoListPage');
  }
  // liveVideo(){
  //   this.navCtrl.push(VideoListPage);
  // }
  back(){
    console.log("back");
    this.navCtrl.pop();
  }

  heart(){
    ha();
}

}
