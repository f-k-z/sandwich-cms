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
	$ npm install firebase vuefire --save
	$ npm install --save jquery
	$ npm install --save toastr

	RUN:
	$ npm run dev

	BUILD (files in dist):
	$ npm run build
