import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { Observable, from, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  signUp(credentials) {
    return this.afAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return this.db.doc(`users/${data.user.uid}`).set({
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          email: credentials.email,
          role: "USER",
          permissions: [],
          created: firebase.default.firestore.FieldValue.serverTimestamp(),
        });
      });
  }

  signIn(credentials): Observable<any> {
    return from(
      this.afAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((data) => {
        if (data) {
          return this.db
            .doc(`users/${data.user.uid}`)
            .valueChanges()
            .pipe(take(1));
        } else {
          of(null);
        }
      })
    );
  }
}
