import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';




@IonicPage()
@Component({
  selector: 'page-video-list',
  templateUrl: 'video-list.html',
})
export class VideoListPage {

  
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
    this.modal2();
  }
  
  chkLogin(){
    if(localStorage.getItem("Member") == "yes"){
      this.logedin = true;
      }
    }
  ionViewDidEnter() {
    
    console.log('starting basic player');

    const BambuserPlayer:any = window['BambuserPlayer'];
    let resourceUri = this.navParams.get('resourceUri');
    console.log(resourceUri);
    if (!resourceUri) {
      var resourceUri2 = 'https://cdn.bambuser.net/broadcasts/3dab4df8-9cb0-21f0-a086-a866b0cd813f?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1482921565&da_static=1&da_ttl=0&da_signature=088e4972f5138cbcde1eb1991b505122eebbe47e911e7383ca4278745bc7ace1';

    }
    const player = BambuserPlayer.create(this.playerEl.nativeElement, resourceUri);
    player.controls = true;
    console.log(this.playerEl);
    const log = str => {
      this.zone.run(() => {
        this.playerLog.unshift(`${player.currentTime} ${player.duration} ${str}`);
      });
    }

    console.log('The player object is now assigned to window.player to enable manual debugging of the player API. Try player.pause(), player.play(), reading from and assigning to player.currentTime etc...', player);
    window['player'] = player;
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
    this.modal();
}

}
