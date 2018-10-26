import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, App } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';

import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { LoadingProvider } from '../../providers/loading/loading';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { IndexPage } from '../index';


import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera';

import { Platform, ActionSheetController, ToastController, LoadingController, Loading, normalizeURL } from 'ionic-angular';


import { DomSanitizer } from '@angular/platform-browser'

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Headers } from '../../../node_modules/@angular/http';
/**
 * Generated class for the SetStoreInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-store-info',
  templateUrl: 'set-store-info.html',
})
export class SetStoreInfoPage {
myId = null;
catList = null;

ProToView;
    image: string;
    ProductImagePrimary: string = null;
    UploadfileName: string = null;
    url: any;
    ProdcutCategory: object;
    headers: Headers;
    MemberStore: any;
    discountPrice: number;
    finalPrice: number;
    ProductImagePrimaryB64: any;

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    public loading: LoadingProvider,
    public modalCtrl: ModalController,
    public appCtrl: App,
     public navParams: NavParams,private view: ViewController,
        private camera: Camera,
        private platform: Platform,
        private file: File,
        private filePath: FilePath,
        private transfer: FileTransfer,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        private sanitizer: DomSanitizer,
        private cdref: ChangeDetectorRef,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetStoreInfoPage');
    this.myId = localStorage.getItem('MemberId');

    this.getCatList();
  }
  close(){
    this.view.dismiss();
  }


  getCatList(){
    this.loading.show('Loading...');
    var url = "http://aliinfotech.com/vdeovalet/get/store-category/api";
    fetch(url)
    .then(response => response.json()).then(res => {
      console.log(res);
      this.catList = res;
              this.loading.hide();
    });

  }

  public CreateProductWithImages(form: NgForm) {
    // console.log(
    //   {
    //     user_id: this.myId,...form.value
    //   }
    // );

    this.loading.show('Uploading...');
    // Destination URL
    this.url = "http://aliinfotech.com/vdeovalet/uploadProductImage/api";
    // File for Upload
    var targetPath = this.pathForImage(this.ProductImagePrimary);
    // File name only
    var filename = this.ProductImagePrimary;

    var url = "http://aliinfotech.com/vdeovalet/add/store-info/api";
  
    this.http.post(url,{
      user_id: this.myId,...form.value,image: this.image
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(res => {
        console.log('store------------');
        console.log(res);
        localStorage.setItem('MemberStore',JSON.stringify(res));
        
      },
        (err: HttpErrorResponse) => {
          if (err.status == 500) {
            this.loading.presentToast('Please Try Again!.', 15000, 'top');
          }
        });
        
    var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, this.url, options).then(data => {
        this.loading.hide();
        this.presentToast('Product Added.');
        console.log('addedd');
        this.view.dismiss();

    }, err => {
      this.loading.hide();
        // this.presentToast('Error while uploading file.');
        let errstring = JSON.stringify(err);
        console.log(errstring);
        this.presentToast(errstring);
    });

  }



  
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
            {
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    actionSheet.present();
}

takePicture(sourceType) {


    try {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: sourceType,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: true,
        };

        this.camera.getPicture(options).then((imagePath) => {
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        console.log("path:: " + filePath);


                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    } catch (e) {
        console.error(e);
    }
}
// Create a new name for the image
private createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.ProductImagePrimary = newFileName;
        this.file.readAsDataURL(this.file.dataDirectory, newFileName).then(imageBase64 => {
            this.ProductImagePrimaryB64 = imageBase64;
            console.log(imageBase64);
        }).catch(e => {
            console.log(e);
        });



    }, error => {
        this.presentToast('Error while storing file.');
    });
}

private presentToast(text) {
    let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
    });
    toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
    if (img === null) {
        return '';
    } else {
        this.image = this.file.dataDirectory + img;
        this.image = "http://aliinfotech.com/vdeovalet/public/uploads/product-images/" + img;
        return this.file.dataDirectory + img;
    }
}

}
