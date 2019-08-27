import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private user = {};

  constructor(
    private fireService: FirebaseService,
    private loginService: LoginService) { }

  logForm() {
    return this.loginService.emailLogin(this.user['email'], this.user['pass1']);
    this.fireService.emailLogin(this.user['email'], this.user['pass1']);
  }

  googleLogin() {
    this.fireService.googleLogin();
  }

}
