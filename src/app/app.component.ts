import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private fireService: FirebaseService,
    private router: Router
  ) {
   /*  authService.checkToken().then(() => {
      this.initializeApp();
    }); // TODO: correct code? */
       this.initializeApp(); // TODO: firebase service
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigate(['login']);
      /* this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      }); */
    });
  }
}
