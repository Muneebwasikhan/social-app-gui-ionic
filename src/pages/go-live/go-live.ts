import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import * as agent from 'superagent';
import { BasicPlayerPage } from '../basic-player/basic-player';


const READONLY_API_KEY: string = 'cjgfbym5ve0yus3ir9jc829ld';
@IonicPage()
@Component({
  selector: 'page-go-live',
  templateUrl: 'go-live.html',
})
export class GoLivePage {
  isFetching = false;
  errorMessage = '';
  mayShowSpinner = true;
  refresher: any;
  broadcasts = [];
  moment: any;
  constructor(public navCtrl: NavController,
    private http: HttpClient,
    public navParams: NavParams,
    private storage: Storage,
    public modalCtrl: ModalController) {
    this.moment = moment;
  }
  ionViewDidEnter() {
    console.log('showing broadcast list');
    this.reloadData();
  }

  reloadData() {
    if (READONLY_API_KEY === 'change') {
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        alert('Warning: READONLY_API_KEY is not set. Get your key at https://dashboard.bambuser.com/developer and update pages/broadcast-list/broadcast-list.ts, then rebuild the app.');
      });
      return;
    }
    this.errorMessage = '';
    this.isFetching = true;
    console.log('Fetching broadcast list');
    return agent.get('https://api.bambuser.com/broadcasts')
      .set('Accept', 'application/vnd.bambuser.v1+json')
      .set('Authorization', 'Bearer ' + READONLY_API_KEY)
      .then(res => {
        (res.body.results).map(res => {

          if (res.type !== "live") {
            console.log(res);
            this.broadcasts = this.broadcasts.concat(res);
          }
        })
        this.isFetching = false;
      }).catch(e => {
        console.log('error while fetching broadcasts', e);
        this.errorMessage = e.message;
        this.isFetching = false;
      });
  }

  onPullToRefresh(refresher) {
    this.mayShowSpinner = false;
    this.reloadData().then(() => {
      refresher.complete();
      this.mayShowSpinner = true;
    })
  }



  playBroadcast(broadcast) {
    let playerModal = this.modalCtrl.create(BasicPlayerPage, {
      resourceUri: broadcast.resourceUri,
      autoplay: true,
      showCloseButton: true,
    });
    playerModal.present();
  }

  ionViewWillLeave() {
    console.log('leaving broadcast list');
  }

}
