import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  url: string;
  formData = {
    email: '',
  };
  errorMessage = '';
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loading: LoadingProvider,
    public http: HttpClient,
    public navParams: NavParams) {
  }



  forgetPassword() {
    this.url = 'http://aliinfotech.com/vdeovalet/forgetPassword/api';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.url, this.formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(res => {
        this.loading.presentToast('An email has been send it to you.', 15000, 'top', 'successToast');
      },
        (err: HttpErrorResponse) => {
          if (err.status == 500) {
            this.loading.presentToast('Error', 15000, 'top', 'failedToast');
          }
        });
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }
}