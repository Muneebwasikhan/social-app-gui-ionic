import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
