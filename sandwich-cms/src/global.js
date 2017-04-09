import Firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyCSVG7-XelqpFOuiIC-XmuQGT212ROCneg",
    authDomain: "sandwich-cms.firebaseapp.com",
    databaseURL: "https://sandwich-cms.firebaseio.com",
    storageBucket: "sandwich-cms.appspot.com",
    messagingSenderId: "390513086545"
};
  
const app = Firebase.initializeApp(firebaseConfig)
const db = app.database()
const storage = app.storage().ref()

export default {
	test: 'Variable Global !!',
	db: db,
	emptyPage: {
		        title: '',
		        slug: '',
		        created: '',
		        updated: '',
		        type: 'basic',
		        published: false
	      	},
	storage: storage,
}