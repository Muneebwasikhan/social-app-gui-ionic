import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, ToastController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { LoadingProvider } from '../../providers/loading/loading';
import { BroadcasterPage } from '../broadcaster/broadcaster';

/**
 * Generated class for the SelectProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-product',
  templateUrl: 'select-product.html',
})
  
export class SelectProductPage {
  data = [
    {
      ProductName: "Phone",
      ProductDetail1:" vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app ",
      ProductDetail2: " vdeovalet app",
      ProductImage: "https://cdn57.androidauthority.net/wp-content/uploads/2017/04/Samsung-Galaxy-S7-vs-S7-Edge-532-1340x754.jpg"
    },
    {
      ProductName: "Phone",
      ProductDetail1:" vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app ",
      ProductDetail2: " vdeovalet app",
      ProductImage: "https://cdn57.androidauthority.net/wp-content/uploads/2017/04/Samsung-Galaxy-S7-vs-S7-Edge-532-1340x754.jpg"
    },
    {
      ProductName: "Phone",
      ProductDetail1:" vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app vdeovalet app ",
      ProductDetail2: " vdeovalet app",
      ProductImage: "https://cdn57.androidauthority.net/wp-content/uploads/2017/04/Samsung-Galaxy-S7-vs-S7-Edge-532-1340x754.jpg"
    },
  ]
  
  MemberId = 0;
  private url = 'http://aliinfotech.com/vdeovalet/getAllProdcutsByMemberId/api';
  MemberProducts: any;
  eventData: object;
  LiveEventCoverPhoto: string;
  fileName:string;
  // file = new File();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private http: HttpClient,
    public appCtrl: App,
    //public file:File,
    public filePath: FilePath,
    public transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,

  ) {
    this.MemberId = + localStorage.getItem('MemberId');
  
    this.getAllProdcutsByMemberId(this.MemberId);
    // this.eventData = this.navParams.data;
    // this.LiveEventCoverPhoto = this.eventData['LiveEventCoverPhoto'];
   // console.log(this.LiveEventCoverPhoto);

    // this.fileName = this.LiveEventCoverPhoto.split("/").pop();
    // console.log(this.fileName);
    // this.eventData['LiveEventCoverPhoto'] ="http://aliinfotech.com/vdeovalet/public/uploads/event-cps/"+this.fileName;
    // console.log(this.eventData['LiveEventCoverPhoto']);







    //console.log(this.navParams.data());   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  getAllProdcutsByMemberId(MemberId) {
    this.http.post(this.url, { 'MemberId': MemberId }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(res => {
        this.MemberProducts = res;
        console.log(this.MemberProducts);
        console.log("MemberId" + MemberId);
      },
        (err: HttpErrorResponse) => {
          if (err.status == 500) {
            console.log(err);
            alert("Interal Server Error.Try Again");
          }
        });
  }

  completeEventDetails: object;
  eventSelectedProduct = [];
  eventProducts(ProductId: number, ev: any) {

    console.log(ev.checked);
    var product = {
      ProductId: ProductId,
      EventProduct: ev.checked,
    }
    const ProdcutIds = this.eventSelectedProduct.map(res => {
      return res.ProductId;
    });
    if (ProdcutIds.indexOf(ProductId) !== -1) {
      this.eventSelectedProduct.splice(ProdcutIds.indexOf(ProductId), 1);
    }
    else {
      this.eventSelectedProduct.push(product);
    }
    //  console.log(this.eventSelectedProduct);

    this.completeEventDetails = {
      Products: this.eventSelectedProduct,
      LiveEvent: this.eventData,
    };
    console.log(this.eventSelectedProduct);

  }

  createLiveEvent() {
    // this.url = "http://aliinfotech.com/vdeovalet/createLiveEvent/api";
    // var EventtoPreview = {};
    // var evpro = [];
    // this.http.post(this.url, this.completeEventDetails, {
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .subscribe(res => {

    //     // this.UploadImage();

    //     res[1].forEach(pd => {
    //       evpro.push(pd.original[0]);
    //       //pd.original[0];




    //     });
    //     EventtoPreview = {
    //       'Event': res[0],
    //       'Products': evpro,

    //     };
    //     console.log(EventtoPreview);
    //   },
    //     (err: HttpErrorResponse) => {
    //       console.log(err);
    //     });
if(this.eventSelectedProduct.length){
  console.log(this.eventSelectedProduct);
  const th = this;
   
      var promise1 = new Promise(function(resolve, reject) {
        var arr = th.eventSelectedProduct.map(val => {
          return val.ProductId
          });
          resolve(arr);
      });
      promise1.then((res) => {
        console.log(res);
        this.navCtrl.push(BroadcasterPage,res);
      })
  
}
else{
  console.log("Please select eny item");
}
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // public UploadImage() {
  //   // Destination URL
  //   this.url = "http://aliinfotech.com/vdeovalet/uploadEventCP/api";

  //   // File for Upload
  //   console.log(this.LiveEventCoverPhoto);
  //   var targetPath = this.LiveEventCoverPhoto;


  //   var nameString = targetPath;
  //   // File name only
  //   this.fileName = nameString.split("/").pop();

  //   //var filename = this.LiveEventCoverPhoto;

  //   var options = {
  //     fileKey: "file",
  //     fileName: this.fileName,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params: { 'fileName': this.fileName }
  //   };

  //   // const fileTransfer: FileTransferObject = this.transfer.create();


  //   this.loading.show('Uploading...');


  //   // Use the FileTransfer to upload the image
  //   fileTransfer.upload(targetPath, this.url, options).then(data => {
  //     this.loading.hide();
  //     this.presentToast('Event Created.');
  //       console.log(data);

  //   }, err => {
  //     this.loading.hide();
  //     // this.presentToast('Error while uploading file.');
  //     let errstring = JSON.stringify(err);
  //     console.log(errstring);
  //     this.presentToast(errstring);
  //   });
  // }




}
