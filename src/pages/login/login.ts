import { Component } from '@angular/core';
import { NavController, App, ModalController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
//import { Http } from '../../../node_modules/@angular/http';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { NgForm } from '../../../node_modules/@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { IndexPage } from '../index';

@Component({
selector: 'page-login',
templateUrl: 'login.html'
})
export class LoginPage {

url:string;
constructor(
public navCtrl: NavController,
public appCtrl: App,
private http: HttpClient,
public loading:LoadingProvider,
public modalCtrl: ModalController, 
) {
this.chkLogin();
}


signup(){ 
this.navCtrl.push(SignupPage);
}

chkLogin(){
if(localStorage.getItem("Member") == "yes"){
  this.navCtrl.setRoot(IndexPage);
} 
else{
// No user is signed in.
console.log('login here');
}
console.log('login');
}

ionViewDidLoad() {
console.log('ionViewDidLoad SignupPage');
}



openForgetPasswordPage() {
let modal = this.modalCtrl.create(ForgotPasswordPage);
modal.present();
}

signin(form: NgForm){ 
  var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var data = form.value; 
  var logincredentials = {
  "userpassword" : data.userpassword,
  "useremail" : data.useremail, 
  } 
  
  if(data.useremail == "" || data.useremail == undefined || data.useremail == null ){
  this.loading.presentToast('Please Enter Email',15000,'top','failedToast'); 
  return false; 
  }
  
  if(!regexp.test(data.useremail)){
  this.loading.presentToast('Email Format is not correct',15000,'top','failedToast');
  return false; 
  }
  
  if(data.userpassword == "" || data.userpassword == null || data.userpassword == undefined ){
  this.loading.presentToast('Please Enter Password',15000,'top','failedToast'); 
  return false;
  }
  
  this.loading.show('Loading...');
  
  this.url ="http://aliinfotech.com/vdeovalet/signin/api";
  
  this.http.post(this.url,logincredentials,{
  headers: { 'Content-Type': 'application/json' }})
  .subscribe(LoginDetails => { 
  if(LoginDetails !=='Not Found'){ 
  this.loading.hide(); 
  this.loading.presentToast('Login Successfully!.',15000,'top','successToast');
  localStorage.setItem('Member','yes'); 
  localStorage.setItem('MemberId',LoginDetails['id']); 
  localStorage.setItem('MemberName',LoginDetails['name']); 
  localStorage.setItem('MemberEmail',LoginDetails['email']); 
  this.appCtrl.getRootNav().setRoot(IndexPage); 
  }
  else{ 
  this.loading.hide(); 
  this.loading.presentToast('Credentials are not correct !.',15000,'top','failedToast'); 
  } 
  }, 
  (err: HttpErrorResponse) => {
  if(err.status == 500){
  this.loading.hide(); 
  this.loading.presentToast('Please Try Again!.',15000,'top'); 
  } 
  });
  }
  }