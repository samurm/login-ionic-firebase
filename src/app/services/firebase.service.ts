import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ERROR_AUTH, ERROR_DEFAULT } from '../constants/user.constant';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth) {

          }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((user) =>  {
          this.authState = user;
       })
      .catch(error => {
        throw new Error(ERROR_AUTH[error.code] ? ERROR_AUTH[error.code] : ERROR_DEFAULT);
      });
  }

  // COMMAND.exec(fileJson.default, file.originalname);

  emailSignUp(password: string, user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
      .then(async response => {
        await response.user.updateProfile({
          displayName: user.username,
          photoURL: 'https://www.meme-arsenal.com/memes/7f9958a6c00654cc7d3939d3e3c438dc.jpg'
        });

        this.authState = response.user;
        this.updateUserData(user);
      })
      .catch(error => {
        throw new Error(ERROR_AUTH[error.code] ? ERROR_AUTH[error.code] : ERROR_DEFAULT);
      });
  }

  emailLogin(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((response) => {
         this.authState = response.user;
       })
       .catch(error => {
          throw new Error(ERROR_AUTH[error.code] ? ERROR_AUTH[error.code] : ERROR_DEFAULT);
        });
  }

  getUserData() {
    firebase.database().ref('users/' + this.currentUser.uid).once('value').then(
      snapshot => {
        this.authState.user.username = snapshot.val().username;
      });
  }

  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .catch((error) => console.log(error));
  }

  changeEmail(email: string) {
    const auth = firebase.auth().currentUser;

    return auth.updateEmail(email)
      .catch((error) => {
        throw new Error(ERROR_AUTH[error.code] ? ERROR_AUTH[error.code] : ERROR_DEFAULT);
      });
  }

  signOut(): void {
    this.authState = null;
    this.afAuth.auth.signOut();
  }

  private updateUserData(user: User): void {
    const path = `users/${this.currentUserId}`;
    const data = {
                  email: user.email,
                  username: user.username,
                  created: firebase.database.ServerValue.TIMESTAMP
                };

    const userRef = firebase.database().ref(path);
    userRef.update(data)
    .catch(error => console.log(error));
  }
}

