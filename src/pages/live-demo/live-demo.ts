import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { VideoListPage } from '../video-list/video-list';
import { TabsPage } from '../tabs/tabs';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { DemoPageVideoPage } from '../demo-page-video/demo-page-video';

/**
 * Generated class for the LiveDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-live-demo',
  templateUrl: 'live-demo.html',
})
export class LiveDemoPage {
  searchEnable = false;
  obj=[
    {
      imgSrc:"https://us-east-1-archive.bambuser.io/archive/thumbnails/0006/8cea70d098d2ab22f99d2fdcfd55a649973a7a36.jpg",
      disc: "Samsung S7 edge..",
      name: "Muneeb Wasi Khan",
      videoUrl : "https://dist.bambuser.net/player/?resourceUri=https%3A%2F%2Fcdn.bambuser.net%2Fbroadcasts%2F71193219-2ce0-4141-89ff-279c9dc3ed60%3Fda_signature_method%3DHMAC-SHA256%26da_id%3D9e1b1e83-657d-7c83-b8e7-0b782ac9543a%26da_timestamp%3D1539004452%26da_static%3D1%26da_ttl%3D0%26da_signature%3D2bacc641dcaadd3ae00ca483c956b960c5f5972010a2a59b358f9bd02e1448d8"
    },
    {
      imgSrc:"https://us-east-1-archive.bambuser.io/archive/thumbnails/0006/1fe7adeaeeef8c7304d0c0c6dd00b2521946b09e.jpg",
      disc: "my new pc..",
      name: "Kamal khan",
      videoUrl : "https://dist.bambuser.net/player/?resourceUri=https%3A%2F%2Fcdn.bambuser.net%2Fbroadcasts%2F55f8d367-69d7-4250-bbab-5372b4919f27%3Fda_signature_method%3DHMAC-SHA256%26da_id%3D9e1b1e83-657d-7c83-b8e7-0b782ac9543a%26da_timestamp%3D1539006663%26da_static%3D1%26da_ttl%3D0%26da_signature%3Db2f0b448ee7868919eab240257b34a2c404b046ede68b04bdb89a34985a1eaca"
    },
    
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public appCtrl: App,public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveChanelsPage');

  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  enableSearch(){
this.searchEnable = !this.searchEnable;
  }
  eventList(val){
    this.navCtrl.push(DemoPageVideoPage,val);
    console.log(val);
    alert(val);
  }
  testingButton(){
    this.appCtrl.getRootNav().setRoot(TabsPage);
    // this.appCtrl.getRootNav().setRoot(TabsPage);

  }
}
