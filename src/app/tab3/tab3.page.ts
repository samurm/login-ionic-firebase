import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private user: any;
  constructor(private fireService: FirebaseService,
    private photoViewer: PhotoViewer) {
    this.user = { id: fireService.currentUserId,
      username: fireService.currentUser.displayName,
      email: fireService.currentUser.email,
      photoURL: fireService.currentUser.photoURL};
  }

  logOut() {
    this.fireService.signOut();
  }

  showPhoto() {
    this.photoViewer.show(this.user.photoURL);
  }
}
