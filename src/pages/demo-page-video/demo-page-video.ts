import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DemoPageVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-demo-page-video',
  templateUrl: 'demo-page-video.html',
})
export class DemoPageVideoPage {
videoUrl={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.videoUrl = this.navParams.data;
    console.log(this.videoUrl["videoUrl"]);
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
   console.log("liked");
}

}
