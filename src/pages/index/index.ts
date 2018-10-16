import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { VideoListPage } from '../video-list/video-list';
import { TabsPage } from '../tabs/tabs';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { LoginPage } from '../login/login';
import { IndexPopoverPage } from '../index-popover/index-popover';
import { GoLivePage } from '../go-live/go-live';
import { BroadcasterPage } from '../broadcaster/broadcaster';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  searchEnable = false;
  obj = [
    {
      imgSrc: "https://cdn57.androidauthority.net/wp-content/uploads/2017/04/Samsung-Galaxy-S7-vs-S7-Edge-532-1340x754.jpg",
      disc: "Samsung S7 edge..",
      name: "Muneeb Wasi Khan"
    },
    {
      imgSrc: "https://wallpapercave.com/wp/asmu9o0.jpg",
      disc: "Shoe Channel",
      name: "Salman Khan"
    },
    {
      imgSrc: "http://wallpaperstop.net/wp-content/uploads/2018/02/Black%20Clothes%20Wallpaper%20good.jpg",
      disc: "The Clothes Mart",
      name: "Areeb Khan"
    },
    {
      imgSrc: "https://d2giyh01gjb6fi.cloudfront.net/default/0001/55/thumb_54223_default_big.jpeg",
      disc: "Samsung Smartphones Over World...",
      name: " Areeb Khan"
    },
    {
      imgSrc: "https://images7.alphacoders.com/320/320434.jpg",
      disc: "Vaio Laptop biggest Mart..",
      name: "Aqib Khan"
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public appCtrl: App, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveChanelsPage');

  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(IndexPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  enableSearch() {
    this.searchEnable = !this.searchEnable;
  }
  eventList() {
    fetch("https://api.bambuser.com/broadcasts", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.bambuser.v1+json",
        "Authorization": "Bearer cjgfbym5ve0yus3ir9jc829ld"
      }
    })
      .then(response => response.json()).then(res => {
        console.log(res.results[0]);

        if (res.results[0].type == "live") {
          this.navCtrl.push(VideoListPage,
            {
              resourceUri: res.results[0].resourceUri,
              autoplay: true,
              showCloseButton: false,
            })
          //  this.navCtrl.push(VideoListPage);
        } else {
          alert("Video is not live");
        }
      });
    // this.navCtrl.push(VideoListPage);
  }
  testingButton() {
    this.appCtrl.getRootNav().setRoot(TabsPage);
    // this.appCtrl.getRootNav().setRoot(TabsPage);

  }
  fetchRes() {

    fetch("https://api.bambuser.com/broadcasts", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.bambuser.v1+json",
        "Authorization": "Bearer cjgfbym5ve0yus3ir9jc829ld"
      }
    })
      .then(response => response.json()).then(res => {
        console.log(res);
      });

  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  goLive() {
    this.navCtrl.push(BroadcasterPage);
  }

}