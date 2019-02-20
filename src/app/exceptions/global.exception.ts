import { ErrorHandler, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorUser implements ErrorHandler {

    constructor(private toastCtrl: ToastController) { }

    handleError(error: any) {
        this.presentToast(error.message);
    }

    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
}
