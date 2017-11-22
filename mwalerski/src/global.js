import Firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyDehA5ITh0QsR8VL0xcaMmmiI7sQee-5m0",
    authDomain: "m-walerski.firebaseapp.com",
    databaseURL: "https://m-walerski.firebaseio.com",
    storageBucket: "m-walerski.appspot.com",
    messagingSenderId: "815071267600"
};
  
const app = Firebase.initializeApp(firebaseConfig)
const db = app.database()
const storage = app.storage().ref()

export default {
	/*** Project infos ***/
	PROJECT_NAME: "Medhi Walerski",
	/*** default page structure ***/
	getEmptyPage: function () {
    return { 
	    title: '',
	    slug: '',
	    created: '',
	    updated: '',
	    css_class: '',
	    position: 0,
	    type: 'basic',
	    published: false,
	    locked: false
  	}
	},
	/*** default slice structure ***/
	getEmptySlice: function () {
		return {
			name: '',
	    content: '',
	    visible: true,
	    css_class: '',
	    locked: false
  	}
	},
  /*** default file structure ***/
	getEmptyFile: function () {
		return {
			name: '',
			url: ''
		}
  },
	/*** firebase refs ***/
	db: db,
	storage: storage,
	/*** error messages ***/
	errorMessages: {
		SLUG_EXIST		: 'Page slug already exist',
		PAGE_ADDED		: 'Page added',
		PAGE_EDITED		: 'Page edited',
		SLICE_ADDED		: 'Slice added',
		SLICE_EDITED	: 'Slice edited',
		SLICE_REMOVED	: 'Slice removed',
		LOADING			: 'Loading',
		ERROR			: 'Error while update, please retry.',
	},
}