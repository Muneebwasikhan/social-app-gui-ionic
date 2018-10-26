import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ToastController } from 'ionic-angular';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BroadcasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const APPLICATION_ID:string = 'aAcEcAJ65jvAqYaJIyXHRA';

@IonicPage()
@Component({
  selector: 'page-broadcaster',
  templateUrl: 'broadcaster.html',
})
export class BroadcasterPage {
  isBroadcasting = false;
  isPending = false;
  broadcaster: any;
  errListenerId = false;
  showEye = true;
  logedin: boolean = false;
  proAtBottom : any;
  items: any;
  constructor(
    private toastCtrl: ToastController,
    public platform: Platform,
    public navCtrl: NavController, 
    private http: HttpClient,
    public loading: LoadingProvider,
    public navParams: NavParams) {
 this.items = this.navParams.data;
//  console.log(this.items);
    platform.ready().then(() => {
      // Using array syntax workaround, since types are not declared.
      if (window['bambuser']) {
        this.broadcaster = window['bambuser']['broadcaster'];
        this.broadcaster.setApplicationId(APPLICATION_ID);
      } else {
        // Cordova plugin not installed or running in a web browser
      }
    });
  }

  getProducts(){
    

    var url = "http://aliinfotech.com/vdeovalet/get/pro-by-ids/api";
console.log( JSON.stringify({productList: this.items}));
    this.http.post(url, {productList: this.items}, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(res => {
        console.log(res);
        this.proAtBottom = res;
      },
        (err: HttpErrorResponse) => {
          if (err.status == 500) {
            this.loading.hide();
            this.loading.presentToast('Please Try Again!.', 1500, 'top');
          }
        });
  }
  chkLogin(){
    if(localStorage.getItem("Member") == "yes"){
      this.logedin = true;
      }
    }
  eye(){
    this.showEye = !this.showEye;
  }
  ionViewDidLoad(){
    this.chkLogin();
    this.getProducts();
  }
  async ionViewDidEnter() {
    if (APPLICATION_ID === 'change') {
      await new Promise(resolve => setTimeout(resolve, 500)); // Let page animations to finish before using alert()
      alert('Warning: APPLICATION_ID is not set. Get your application id at https://dashboard.bambuser.com/developer and update pages/broadcaster/broadcaster.ts, then rebuild the app.');
    }

    // Engage our Ionic CSS background overrides that ensure viewfinder is visible.
    document.getElementsByTagName('body')[0].classList.add("show-viewfinder");

    if (!this.broadcaster) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Let page animations to finish before using alert()
      alert('broadcaster is not ready yet');
      return;
    }

    console.log('Starting viewfinder');
    this.broadcaster.showViewfinderBehindWebView();
  }
  ionViewWillLeave() {
    // Disengage our Ionic CSS background overrides, to ensure the rest of the app looks ok.
    document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");

    console.log('Removing viewfinder');
    if (this.broadcaster) {
      this.broadcaster.hideViewfinder();
    }
  }
  async start() {
    if (this.isBroadcasting || this.isPending) return;
    this.isPending = true;
    const toast = this.toastCtrl.create({
      message: 'Starting broadcast...',
      position: 'middle',
    });
    await toast.present();

    console.log('Starting broadcast');
    try {
      await this.broadcaster.startBroadcast();
      toast.dismiss();
      this.isBroadcasting = true;
      this.isPending = false;

      this.listenForError();

    } catch (e) {
      toast.dismiss();
      this.isPending = false;
      alert('Failed to start broadcast');
      console.log(e);
    }
  }
  async stop() {
    if (!this.isBroadcasting || this.isPending) return;
    this.isPending = true;
    const toast = this.toastCtrl.create({
      message: 'Ending broadcast...',
      position: 'middle'
    });
    await toast.present();

    console.log('Ending broadcast');
    try {
      await this.broadcaster.stopBroadcast();
      toast.dismiss();
      this.isBroadcasting = false;
      this.isPending = false;
    } catch (e) {
      toast.dismiss();
      this.isPending = false;
      alert('Failed to stop broadcast');
      console.log(e);
    }
  }
  switchCamera(){
   
    this.broadcaster.switchCamera();
  }
  back(){
    console.log('Removing viewfinder');
    if (this.broadcaster) {
      this.broadcaster.hideViewfinder();
    }
    if(this.isBroadcasting){
      this.stop();
    }
    document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");

    
    console.log("back");
    this.navCtrl.pop();
  }
  listenForError() {
    if (this.errListenerId) return;
    this.errListenerId = this.broadcaster.addEventListener('connectionError', status => {
      this.isBroadcasting = false;
      this.isPending = false;
      const toast = this.toastCtrl.create({
        message: 'Connection error',
        position: 'middle',
        duration: 3000,
      });
      toast.present();
    });
  }
}