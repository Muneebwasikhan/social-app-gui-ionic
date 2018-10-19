import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { AddProductPage } from '../add-product/add-product';
import { ProductsPage } from '../products/products';
import { OrdersPage } from '../orders/orders';
import { PaymentsPage } from '../payments/payments';
import { MyPurchasesPage } from '../my-purchases/my-purchases';
import { OrderShippingPage } from '../order-shipping/order-shipping';
import { ProfilePage } from '../profile/profile';
import { MyVideosPage } from '../my-videos/my-videos';
import { FollowersPage } from '../followers/followers';
import { FollowingPage } from '../following/following';
import { MyStreamHistoryPage } from '../my-stream-history/my-stream-history';
import { GoLivePage } from '../go-live/go-live';
import { LiveChanelsPage } from '../live-chanels/live-chanels';

/**
 * Generated class for the IndexPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index-popover',
  templateUrl: 'index-popover.html',
})
export class IndexPopoverPage {
  public enableStore:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  changeStore(){
    // console.log(res);
    // this.enableStore = true;
    if(this.enableStore){
      console.log("Store enabled");
    }
    if(!this.enableStore){
      console.log("Store disabled");
    }
    //console.log(this.enableStore);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPopoverPage');
  }

  Settings(){
    this.navCtrl.push(SettingsPage);
  }
  logout(){
    localStorage.clear();
    this.navCtrl.setRoot(LiveChanelsPage);
    // this.navCtrl.push(LiveChanelsPage);
  }
addProduct(){
  this.navCtrl.push(AddProductPage);
}
products(){
  this.navCtrl.push(ProductsPage);
}
orders(){
  this.navCtrl.push(OrdersPage);
}
payments(){
  this.navCtrl.push(PaymentsPage);
}
myPurchases(){
  this.navCtrl.push(MyPurchasesPage);
}
orderShipping(){
  this.navCtrl.push(OrderShippingPage);
}
Profile(){
  this.navCtrl.push(ProfilePage);
}
myVideos(){
  this.navCtrl.push(MyVideosPage);
}
followers(){
  this.navCtrl.push(FollowersPage);
}
following(){
  this.navCtrl.push(FollowingPage);
}
myStreamHistory(){
  this.navCtrl.push(MyStreamHistoryPage);
}
golive(){
  this.navCtrl.push(GoLivePage);
}
}
