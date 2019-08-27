import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  private user = {};

  constructor(
    private fireService: FirebaseService,
    private loginService: LoginService) { }

  regForm() {
    try {
      const currentUser = new User(this.user['username'], this.user['email'], this.user['pass1'], this.user['pass2']);
      this.loginService.emailSignUp(this.user['pass1'], currentUser);
      // this.fireService.emailSignUp(this.user['pass1'], currentUser);
    } catch (e) {
      throw new Error(e.FIELD + ', ' + e.MESSAGE);
    }
  }
}
