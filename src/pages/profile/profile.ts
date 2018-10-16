import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LiveChanelsPage } from '../live-chanels/live-chanels';
import { FollowersPage } from '../followers/followers';
import { FollowingPage } from '../following/following';
import { AddProductPage } from '../add-product/add-product';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public appCtrl: App) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  logout(){
    localStorage.clear();
    this.navCtrl.setRoot(LiveChanelsPage);
    // this.navCtrl.push(LiveChanelsPage);
  }

  // myProducts(){
  //   this.navCtrl.push(MyProductsPage);
  // }

  // liveEvents(){
  //   this.navCtrl.push(LiveEventsPage);
  // }

  addNewProduct(){
    this.navCtrl.push(AddProductPage);
  }

  cart(){
    this.navCtrl.push(CartPage);
  }


  followers(){
    this.navCtrl.push(FollowersPage);
  }
  

  following(){
    this.navCtrl.push(FollowingPage);
  }


}
