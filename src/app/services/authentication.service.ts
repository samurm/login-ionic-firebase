import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { TOKEN_KEY } from '../constants/user.constant';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    /* this.plt.ready().then(() => {
      this.checkToken();
    }); */
  }

  login(tokenValue) {
    this.storage.set(TOKEN_KEY, tokenValue).then(res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

  checkToken(): Promise<any> {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

}
