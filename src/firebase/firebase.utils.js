import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB82CsQmPgV-KPo5HHQxXFQIYyWgnac7kA",
  authDomain: "my-webshop-db.firebaseapp.com",
  databaseURL: "https://my-webshop-db.firebaseio.com",
  projectId: "my-webshop-db",
  storageBucket: "my-webshop-db.appspot.com",
  messagingSenderId: "758070396825",
  appId: "1:758070396825:web:d2a64ab7f1a215c9c7b508"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;