import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user = {};

  constructor(private afAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private fireSerivce: FirebaseService) { }

  logForm() {
    this.fireSerivce.emailLogin(this.user['email'], this.user['pass1']);

    /* this.afAuth.auth.signInWithEmailAndPassword(this.user['email'], this.user['pass1']).then(
      response => {
        console.log('loguin');
        this.authService.login(response.user.uid);
      }
    ).catch(
      error => {
        console.log('Email o Contraseña incorrectos');
      }); */
  }

}
