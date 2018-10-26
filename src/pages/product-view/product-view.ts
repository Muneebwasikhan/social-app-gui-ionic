import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { LoadingProvider } from '../../providers/loading/loading';
import { IndexPage } from '../index';

/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html',
})
export class ProductViewPage {
  @ViewChild(Slides) slides: Slides;
  ProductDescription:any;
  quantity;
  constructor(public navCtrl: NavController, public navParams: NavParams,private selector: WheelSelector,private loading: LoadingProvider) {
    if(localStorage.getItem("myCart")){
      console.log("cart available");
    }else{
      localStorage.setItem("myCart","[]");
      console.log("Created cart");
    }
        this.ProductDescription =   this.navParams.data;
        console.log(this.ProductDescription);
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductViewPage');
  }

  showAllProducts(){
    this.navCtrl.push(IndexPage);
  }


  addCart(){
    console.log(this.ProductDescription);

    const jsonData = {
      numbers: [
       { description: "1" },
        { description: "2" },
        { description: "3" },
        { description: "4" },
        { description: "5" },
        { description: "6" },
        { description: "7" },
        { description: "8" },
        { description: "9" },
      ]
    };

    
      this.selector.show({
        title: "How Many?",
        items: [
          jsonData.numbers
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.quantity = result[0].description;
          var obj = {
            quantity: result[0].description,
            item: this.ProductDescription
          }

          console.log(obj);
          var oldCart = JSON.parse(localStorage.getItem("myCart"));
          console.log(oldCart);
          oldCart.push(obj);

          localStorage.setItem("myCart",JSON.stringify(oldCart));
          this.loading.presentToast("Successfully added to cart",3000,"top");
        },
        err => console.log('Error: ', err)
        );
  }

  addCart2(){
    console.log(this.ProductDescription);

   
    
          var obj = {
            quantity: 1,
            item: this.ProductDescription
          }

          console.log(obj);
          var oldCart = JSON.parse(localStorage.getItem("myCart"));
          console.log(oldCart);
          oldCart.push(obj);

          localStorage.setItem("myCart",JSON.stringify(oldCart));
          this.loading.presentToast("Successfully added to cart",3000,"top");
  }
  

}
