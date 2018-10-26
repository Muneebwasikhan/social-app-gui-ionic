import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
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

import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { NgForm } from '../../../node_modules/@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { IndexPage } from '../index';
import { SetStoreInfoPage } from '../set-store-info/set-store-info';

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
  public currentDetails = null;
  myId = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    
    private http: HttpClient,
    public loading: LoadingProvider,
    public modalCtrl: ModalController,
    public appCtrl: App) {

  }
  ionViewDidLoad() {
    this.myId = localStorage.getItem('MemberId');
    console.log('ionViewDidLoad IndexPopoverPage');
    this.currentDetails = JSON.parse(localStorage.getItem('MemberStore'));
    console.log(this.currentDetails);
    this.enableStore = this.currentDetails.is_active;
    console.log(this.enableStore);

  }
  changeStore(){
    
    if(!this.currentDetails.store_name && !this.currentDetails.store_location && !this.currentDetails.store_logo_pic){
      // if(this.currentDetails.store_name && this.currentDetails.store_location && this.currentDetails.store_logo_pic){
      
      this.loading.show('Loading...');
      console.log('nameNUll');
      this.setStoreInfo();
      this.loading.hide();
    }
    else
    {
      
    if(this.enableStore){
      this.loading.show('Loading...');
      console.log("Store enabled");
      var url = "http://aliinfotech.com/vdeovalet/change/store-status/api";

      this.http.post(url, {
        user_id: this.myId,
        status: 1
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe(res => {
          console.log(res);
          localStorage.setItem('MemberStore',JSON.stringify(res));
          this.currentDetails = res;
          this.loading.hide();
        },
          (err: HttpErrorResponse) => {
            if (err.status == 500) {
              this.loading.hide();
              this.loading.presentToast('Please Try Again!.', 15000, 'top');
            }
          });
        }
    if(!this.enableStore){
      this.loading.show('Loading...');
      console.log("Store disabled");
      var url = "http://aliinfotech.com/vdeovalet/change/store-status/api";

      this.http.post(url,{
        user_id: this.myId,
        status: 0
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe(res => {
          console.log(res);
          localStorage.setItem('MemberStore',JSON.stringify(res));
          this.currentDetails = res;
          this.loading.hide();
        },
          (err: HttpErrorResponse) => {
            if (err.status == 500) {
              this.loading.hide();
              this.loading.presentToast('Please Try Again!.', 15000, 'top');
            }
          });
    }
  }
  }
  setStoreInfo() {
    let profileModal = this.modalCtrl.create(SetStoreInfoPage);
    profileModal.present();
  }

  Settings(){
    this.navCtrl.push(SettingsPage);
  }
  goToTheHOme(){
    localStorage.clear();
    this.navCtrl.pop();
    this.navCtrl.setRoot(LiveChanelsPage);
    this.navCtrl.popToRoot();
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
