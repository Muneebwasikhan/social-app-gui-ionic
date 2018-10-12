import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form} from 'ionic-angular';
import { Http, Headers,  } from '@angular/http';
import { HttpClient,HttpErrorResponse   } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';
//import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
url:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private http: HttpClient,
      public loading:LoadingProvider,       
    
    ) {
    console.log('using sign up page');
  }
  
  
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


 

    ifUserExist(userEmail) { 
      var userExist = 1;    
      this.url = 'http://aliinfotech.com/vdeovalet/ifUserExist/api';
        var headers = new Headers();
            headers.append('Content-Type', 'application/json');
       this.http.post(this.url,{'UserEmail': userEmail},{
        headers: { 'Content-Type': 'application/json' }})
         .subscribe(res =>{                           
            console.log(res);
                  if(res = 0){
                  return userExist = 0;
                  }
         },        
         (err: HttpErrorResponse) => {
            if(err.status == 500){
              this.loading.presentToast('Error',15000,'top','failedToast');
              return userExist = 1;
            
            }
            
       });

      
      }





  signup(form: NgForm){     

   

  var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);              
      var headers = new Headers();
          headers.append('Content-Type', 'application/json');

      var data = form.value;      
      var email = regexp.test(data.useremail);

      console.log(email);


        if(data.username == "" || data.username == null || data.username == undefined  ){
            this.loading.presentToast('Please Enter Name',15000,'top','failedToast');
            return false;
        }

        if(data.useremail == "" || data.useremail == undefined || data.useremail == null   ){
            this.loading.presentToast('Please Enter Email',15000,'top','failedToast');
            return false;            
        }

        if(!regexp.test(data.useremail)){
          this.loading.presentToast('Email Format is not correct',15000,'top','failedToast');
          return false;          
        }

        if(this.ifUserExist(data.useremail)){
          this.loading.presentToast('Email Already Exist',15000,'top','failedToast');
          return false;
        }

        if(data.userpassword == "" || data.userpassword == null || data.userpassword == undefined ){
          this.loading.presentToast('Please Enter Password',15000,'top','failedToast');
          return false;
      }
         
      if(data.userpassword.length < 7 ){
        this.loading.presentToast('Paswword Min Length 7 Characters',15000,'top','failedToast');
        return false;
    }
       

      var myPostObject ={
          "username" :data.username,
          "userpassword" :data.userpassword,
          "useremail" :data.useremail,                
      }     

      console.log(myPostObject); 


      



    this.url ="http://aliinfotech.com/vdeovalet/signup/api"; 
     this.http.post(this.url,myPostObject,{
      headers: { 'Content-Type': 'application/json' }})
        .subscribe(res => {          
          this.loading.presentToast('Registered Successfully!.',15000,'top','successToast');              
            setTimeout(() =>{
                this.navCtrl.push(LoginPage);                  
              },
              4000);                      
        },        
        (err: HttpErrorResponse) => {
          if(err.status == 500){
            this.loading.presentToast('Unknown Error',15000,'top','failedToast');
          }
      });
    }
  }