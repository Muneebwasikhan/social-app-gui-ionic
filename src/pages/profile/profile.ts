import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LiveChanelsPage } from '../live-chanels/live-chanels';
import { FollowersPage } from '../followers/followers';
import { FollowingPage } from '../following/following';
import { AddProductPage } from '../add-product/add-product';
import { CartPage } from '../cart/cart';



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
  }

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
