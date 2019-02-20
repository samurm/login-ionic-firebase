import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ToastController } from '@ionic/angular';
import { ERROR_AUTH } from '../constants/user.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  user = {};

  constructor(private afAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private router: Router,
    private toastCtrl: ToastController) { }

  regForm() {
    try {
      const userModule = new User(this.user['username'], this.user['email'], this.user['pass1'], this.user['pass2']);
        this.afAuth.auth.createUserWithEmailAndPassword(userModule.email, this.user['pass1']).then(
          (response) => {
            userModule.uid = response.user.uid;

            const userRef = firebase.database().ref('/users/' + response.user.uid);

            this.authService.login(response.user.uid);

            userRef.update({
              'email': userModule.email,
              'created': firebase.database.ServerValue.TIMESTAMP,
              'username': userModule.username
            });

            this.router.navigate(['tabs']);
        }).catch(error => {
          this.presentToast(ERROR_AUTH[error.code]);
        });
    } catch (e) {
      throw new Error(e.FIELD + ', ' + e.MESSAGE);
    }
  }

  async presentToast(errorMessage) {
      const toast = await this.toastCtrl.create({
          message: errorMessage,
          duration: 3000
      });
      toast.present();
  }
}
