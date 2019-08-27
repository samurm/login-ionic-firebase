import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { LoginService } from './services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireService: FirebaseService,
    private loginService: LoginService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.loginService.authState.subscribe((state) => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      });

      /* this.afAuth.authState.subscribe((auth) => {
        this.loginService.authState = auth;
        if (auth === null) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['tabs']);
        }
      }); */
    });
  }
}
