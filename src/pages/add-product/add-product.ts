import { IonicPage, NavParams } from 'ionic-angular';
import { Component, ChangeDetectorRef } from '@angular/core';

import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera';

import { Platform, ActionSheetController, ToastController, LoadingController, Loading, normalizeURL, NavController } from 'ionic-angular';


import { DomSanitizer } from '@angular/platform-browser'

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { NgForm } from '../../../node_modules/@angular/forms';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Headers } from '../../../node_modules/@angular/http';
import { ProductViewPage } from '../product-view/product-view';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  ProToView;
    image: string;
    ProductImagePrimary: string = null;
    loading: Loading;
    UploadfileName: string = null;
    url: any;
    ProdcutCategory: object;
    headers: Headers;
    MemberStore: any;
    discountPrice: number;
    finalPrice: number;
    ProductImagePrimaryB64: any;
    myId: any;
    constructor(
        private http: HttpClient,
        private camera: Camera,
        private platform: Platform,
        private file: File,
        private filePath: FilePath,
        private transfer: FileTransfer,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        private sanitizer: DomSanitizer,
        private navCtrl: NavController,
        private cdref: ChangeDetectorRef,
    ) {
      this.getProductCategory();
      this.myId = localStorage.getItem('MemberId');
        this.getStoreById(this.myId);
    }
    getStoreById(MemberId) {
        console.log("Called");
        console.log(MemberId);
        this.url = 'http://aliinfotech.com/vdeovalet/getStoreById/api';
        this.http.post(this.url, { 'MemberId': MemberId }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .subscribe(res => {
                this.MemberStore = res;
                console.log(res);
            },
                (err: HttpErrorResponse) => {
                    if (err.status == 500) {
                        alert("Interal Server Error.Try Again");
                    }
                });
    }

    getProductCategory() {
        console.log("Called");
        this.url = 'http://aliinfotech.com/vdeovalet/getProductCategory/api';
        this.http.post(this.url, {
            headers: { 'Content-Type': 'application/json' }
        })
            .subscribe(res => {
                this.ProdcutCategory = res;
                console.log(res);

            },
                (err: HttpErrorResponse) => {
                    if (err.status == 500) {
                        alert("Interal Server Error.Try Again");
                    }
                });
    }

    calculatePrice(ev: any, orignalPrice) {
        // console.log();
        // console.log(ev.target.value);
        var op = orignalPrice;
        var dp = ev.target.value;
        this.discountPrice = (op * dp) / 100;
        this.finalPrice = orignalPrice - this.discountPrice;
        this.cdref.detectChanges();
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
    private copyFileToLocalDir(namePath, currentName, newFileName){
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
        .then(success => {
            this.ProductImagePrimary = newFileName;
            this.file.readAsDataURL(this.file.dataDirectory, newFileName)
            .then(imageBase64 => {
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
    public CreateProductWithImages(form: NgForm) {
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
    });
    this.loading.present();
   // Destination URL
   this.url = "http://aliinfotech.com/vdeovalet/uploadProductImage/api";

   // File for Upload
   var targetPath = this.pathForImage(this.ProductImagePrimary);

   // File name only
   var filename = this.ProductImagePrimary;
        this.url = "http://aliinfotech.com/vdeovalet/AddProducts/api";

        var data = form.value;
        data.ProductImage = this.image;
        data.OptionImage1 = this.image;
        data.OptionImage2 = this.image;
        data.OptionImage3 = this.image;
        data.MemberId = this.MemberStore.user_ref_id;
        data.StoreName = this.MemberStore.store_name;
        data.StoreId = this.MemberStore.id;


        console.log(data);



        this.http.post(this.url, data, {
            headers: { 'Content-Type': 'application/json' }
        })
            .subscribe(res => {
                this.ProToView = res;
                form.reset();

                // console.log("Product has been Created Successfully.....");
            },
                (err: HttpErrorResponse) => {
                    if (err.status == 500) {
                        alert("Interal Server Error.Try Again");
                    }
                });


        // Destination URL
        this.url = "http://aliinfotech.com/vdeovalet/uploadProductImage/api";

        // File for Upload
        var targetPath = this.pathForImage(this.ProductImagePrimary);

        // File name only
        var filename = this.ProductImagePrimary;

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
            this.loading.dismissAll()
            this.presentToast('Product Added.');
            this.navCtrl.push(ProductViewPage, this.ProToView);

        }, err => {
            this.loading.dismissAll()
            // this.presentToast('Error while uploading file.');
            let errstring = JSON.stringify(err);
            console.log(errstring);
            this.presentToast(errstring);
        });
    }
}
