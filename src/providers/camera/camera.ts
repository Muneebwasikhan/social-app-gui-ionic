import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController, Platform, ToastController, LoadingController, NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
 
  
  constructor(
    public http: HttpClient,
  
  ) {
    console.log('Hello CameraProvider Provider');
    

  }


}
