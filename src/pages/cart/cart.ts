import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartList; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cartList = JSON.parse(localStorage.getItem("myCart"));
    // console.log(this.cartList);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    console.log(this.cartList);
  }

}
