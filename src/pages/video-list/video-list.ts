import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { LoginModalPage } from '../login-modal/login-modal';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';




@IonicPage()
@Component({
  selector: 'page-video-list',
  templateUrl: 'video-list.html',
})
export class VideoListPage {

  
  // Bind '<div #player>' in template to this.playerEl
  @ViewChild('player') playerEl: ElementRef;
  playerLog = [];
  showCloseButton = false;
  logedin: boolean = false;
  disp: boolean = false;
  disp2: boolean = false;

  constructor(
    private element: ElementRef,
    public navCtrl: NavController,
    private navParams: NavParams,
    private zone: NgZone,
    public modalCtrl: ModalController
    ) {
      this.chkLogin();
  }
  loginButton(){
    this.navCtrl.push(LoginPage);
  }
  registerButton(){
    this.navCtrl.push(SignupPage);
  }

  modal(){
    this.disp = true;
  }
  closeModal(){
    this.disp = false;
  }
  modal2(){
    this.disp2 = true;
  }
  closeModal2(){
    this.disp2 = false;
  }
  
  login(){
    console.log("login required");
    // this.presentProfileModal();
    this.modal2();
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(LoginModalPage);
    profileModal.present();
  }
  chkLogin(){
    if(localStorage.getItem("Member") == "yes"){
      this.logedin = true;
      }
    }
  ionViewDidEnter() {
    
    console.log('starting basic player');

    // BambuserPlayer is loaded to window in index.html
    const BambuserPlayer:any = window['BambuserPlayer'];

    // https://bambuser.com/docs/key-concepts/resource-uri/
    // The resourceUri is used to fetch the broadcast media
    //
    // Either use a broadcast provided by another page in the application
    let resourceUri = this.navParams.get('resourceUri');
    console.log(resourceUri);
    if (!resourceUri) {
      // ...or fall back to using a static resourceUri, for demo purposes
      var resourceUri2 = 'https://cdn.bambuser.net/broadcasts/3dab4df8-9cb0-21f0-a086-a866b0cd813f?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1482921565&da_static=1&da_ttl=0&da_signature=088e4972f5138cbcde1eb1991b505122eebbe47e911e7383ca4278745bc7ace1';

      // normally you would get the resourceUri from the GET /broadcasts API
      // either by directly accessing it from your mobile app, or with your
      // custom backend as mediator.
      // https://bambuser.com/docs/api/get-broadcast-metadata/
    }

    // https://bambuser.com/docs/playback/web-player/#javascript-api
    const player = BambuserPlayer.create(this.playerEl.nativeElement, resourceUri);
    player.controls = true;
    // console.log(this.playerEl.document.getElementsByTagName("iframe")[0]);
    console.log(this.playerEl);
    const log = str => {
      // Ensure template is re-rendered even though caller might be an
      // event listener on an emitter outside of Angular's zone.
      // https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html
      this.zone.run(() => {
        this.playerLog.unshift(`${player.currentTime} ${player.duration} ${str}`);
      });
    }

    // Make player available in console, for debugging purposes
    console.log('The player object is now assigned to window.player to enable manual debugging of the player API. Try player.pause(), player.play(), reading from and assigning to player.currentTime etc...', player);
    window['player'] = player;

    // Log all player events as they occur, for debugging purposes
    [
      'canplay',
      'durationchange',
      'ended',
      'error',
      'loadedmetadata',
      'pause',
      'play',
      'playing',
      'progress',
      'seeked',
      'seeking',
      'timeupdate',
      'volumechange',
      'waiting'
    ].map(eventName => player.addEventListener(eventName, e => log(eventName)));
    // player.play();
    if (this.navParams.get('autoplay')) {
      
        player.play();
        
    }

    if (this.navParams.get('showCloseButton')) {
      this.showCloseButton = true;
    }
  }
  


  closePlayer() {
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Remove player from DOM.
    //
    // By design, Ionic tabs controller keeps the page alive in the background
    // when navigating away. Leaving a player in the background might be
    // resource-consuming and otherwise unexpected though...
    //
    // If retaining the player state is desired when navigating back and forth,
    // consider replacing the below assignment with player.pause() / player.play()

    console.log('closing basic player');
    this.playerEl.nativeElement.innerHTML = '';
    this.playerLog = [];
  }

  back(){
    console.log("back");
    this.navCtrl.pop();
  }

  heart(){
    console.log("liked");
}
product(){
  console.log("product");
    // this.navCtrl.push(ProductDetailsPage);
    this.modal();
}

}
