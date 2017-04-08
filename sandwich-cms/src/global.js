import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAcP7Mdrq2LkOshkwZWGGwz-T8yFfBihCI",
    authDomain: "test-project-c9e5c.firebaseapp.com",
    databaseURL: "https://test-project-c9e5c.firebaseio.com",
    storageBucket: "test-project-c9e5c.appspot.com",
    messagingSenderId: "70554115470"
  };
  
const app = Firebase.initializeApp(firebaseConfig)
const db = app.database()
const storage = app.storage().ref()

export default {
	test: 'Variable Global !!',
	db: db,
	storage: storage,
}