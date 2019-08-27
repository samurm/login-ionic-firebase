import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ERROR_AUTH, ERROR_DEFAULT } from '../constants/user.constant';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState: any = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, public http: HttpClient) {

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
    return this.authenticated ? this.authState.id : '';
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
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
    const data = { password : password, name: user.username, email: user.email };
    this.authState = this.sendPostRequest('http://localhost:8000/register', data)['api_key'];
    /* return this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
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
      }); */
  }

  emailLogin(email: string, password: string) {
    const data = { password : password, email: email };
    this.sendPostRequest('http://localhost:8000/login', data);
    return this.authState.next(true);
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

  private sendPostRequest(url, data) {
      /* const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers }); */
      this.http.post(url, data)
      .subscribe(result => {
        this.authState = result['api_key'];
      }, error => {
          console.log(error);
      });
  }
}

