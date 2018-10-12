import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';





@Injectable()
export class LoadingProvider {
loading;
constructor(
public loadingCtrl: LoadingController,
public toastCtrl: ToastController,
) {
}

show(message) {
this.loading = this.loadingCtrl.create({
duration: 10000,
content :message,
});
this.loading.present();
}
hide() {
try {
this.loading.dismiss();
} catch (error) { }



}
autoHide(time,message) {
this.loading = this.loadingCtrl.create({
duration: time,
content:message,
});
this.loading.present();
}

public presentToast(text?,duration?,position?,cssClass?) {
let toast = this.toastCtrl.create({
message: text,
duration: duration,
position: position,
cssClass:cssClass,
showCloseButton: true,
closeButtonText: "X", 
}); 
toast.present();
}





}