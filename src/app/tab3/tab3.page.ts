import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private user: any;
  constructor(private fireService: FirebaseService,
    private photoViewer: PhotoViewer) {

  }

  ngOnInit() {
    this.user = { id: this.fireService.currentUserId,
      username: this.fireService.currentUser.displayName,
      email: this.fireService.currentUser.email,
      photoURL: this.fireService.currentUser.photoURL};
  }

  logOut() {
    this.fireService.signOut();
  }

  showPhoto() {
    this.photoViewer.show(this.user.photoURL);
  }
}
