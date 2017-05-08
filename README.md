# sandwich-cms
Sandwich CMS

Firebase DB Setting (access & write for everybody):
	{
		"rules": {
			".read": true,
			".write": true
		}
	}

Firebase Storage Setting (access & write for everybody):
	service firebase.storage {
	  match /b/{bucket}/o {
	    match /{allPaths=**} {
	      allow read, write;
	    }
	  }
	}

Vue.js CLI command:

	INIT:
	$ vue init webpack sandwich-cms
	$ npm install

	DEPENDENCY:
	$ npm install vue-sortable
	$ npm install sass-loader node-sass webpack --save-dev
	$ npm install -g firebase-tools
	$ npm install firebase vuefire --save
	$ npm install --save jquery
	$ npm install --save toastr
	$ npm install vue-html5-editor --save-dev

	FIREBASE:
	$ firebase init

	RUN:
	$ npm run dev

	BUILD (files in dist):
	$ npm run build

	DEPLOY:
	$ firebase deploy
