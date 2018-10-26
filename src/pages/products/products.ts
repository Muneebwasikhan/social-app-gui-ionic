
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { ProductViewPage } from '../product-view/product-view';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddProductPage } from '../add-product/add-product';

import { ViewController } from 'ionic-angular';
import { VideoListPage } from '../video-list/video-list';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { LoginPage } from '../login/login';
import { IndexPopoverPage } from '../index-popover/index-popover';
import { GoLivePage } from '../go-live/go-live';
import { BroadcasterPage } from '../broadcaster/broadcaster';
import { LoadingProvider } from '../../providers/loading/loading';
import { HomePage } from '../home/home';
import { LiveChanelsPage } from '../live-chanels/live-chanels';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  myId: any;
  myProList: any;
  myProApi: any;
  private url = 'http://aliinfotech.com/vdeovalet/getAllProdcutsByMemberId/api';
  MemberProducts:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private http: HttpClient,
     public appCtrl: App,
     public loadingCtrl: LoadingController,  
     public popoverCtrl: PopoverController,
     public loading:LoadingProvider
    ) {
      this.myId =+ localStorage.getItem('MemberId');
      console.log(this.myId);
      // this.getAllProdcutsByMemberId(this.MemberId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
    this.getMyProducts();
  }

  viewProductDetails(ProductId){
    //var ViewProuctDetails = questions.find(x => x.id === id);
     var ViewProuctDetails = this.myProList.find( val => val.id === ProductId );
     
     console.log(ViewProuctDetails);
     this.navCtrl.push(ProductViewPage,ViewProuctDetails); 
   }

   
   
  //  getAllProdcutsByMemberId(MemberId){    
  //    this.http.post(this.url,{'MemberId':MemberId},{
  //      headers: { 'Content-Type': 'application/json' }})
       
  //        .subscribe(res => {      
  //        this.MemberProducts = res;
  //        console.log(this.MemberProducts);
  //        console.log("MemberId"+MemberId );
  //        },        
  //        (err: HttpErrorResponse) => {
  //          if(err.status == 500){
  //            console.log(err);
  //            alert("Interal Server Error.Try Again");
  //          }
  //      });
  //  }

   getMyProducts(){
    this.myProApi = "http://aliinfotech.com/vdeovalet/getAllProdcutsByMemberId/api";

    this.http.post(this.myProApi,{MemberId: this.myId},{
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(res => {
        console.log(res);
        this.myProList = res;
        console.log('res');
      },
        (err: HttpErrorResponse) => {
          if (err.status == 500) {
            this.loading.hide();
            this.loading.presentToast('TimeOut.', 1500, 'top');
          }
        });
  }

   newProduct(){
    this.navCtrl.push(AddProductPage);
}

// newstore(){
// this.navCtrl.push(NewstorePage,this.MemberId);
// }

// EventPage(){
// this.navCtrl.push(EventsPage);  
// }
}
