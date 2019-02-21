import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private user = {};

  constructor(
    private fireService: FirebaseService) { }

  logForm() {
    this.fireService.emailLogin(this.user['email'], this.user['pass1']);
  }

  googleLogin() {
    this.fireService.googleLogin();
  }

}
