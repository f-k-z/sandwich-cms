<template>
  <div class="page-create">
    <form id="form" class="form-inline" v-on:submit.prevent="addProject">
		<div class="form-group">
			<label for="projectTitle">Title:</label>
			<input type="text" id="projectTitle" class="form-control" v-model="newProject.title">
		</div>
		<div class="form-group">
			<label for="projectDescription">Description:</label>
			<input type="text" id="projectDescription" class="form-control" v-model="newProject.description">
		</div>
		<div class="form-group">
			<label for="projectCover">Cover:</label>
			<input type="file" id="projectCover" class="form-control" @change="onFileChange">
		</div>
		<div class="form-group">
			<label for="projectUrl">Url:</label>
			<input type="text" id="projectUrl" class="form-control" v-model="newProject.url">
		</div>
		<input type="submit" class="btn btn-primary" value="Add Project">
	</form>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: 'page-create',

  firebase: {
    projects: global.db.ref('projects')
  },

  data () {
	    return {
	        newProject: {
		        title: '',
		        description: '',
		        url: 'http://'
	      	}
	    }
 	},
	methods: {
	  addProject: function () {
	    //get the scope
	    var newProject = this.newProject;
	    //upload the file
	    var imageRef = global.storage.child(newProject.cover.name);
	    imageRef.putString(newProject.cover.data, 'data_url').then(function(snapshot) {
	      //cover will only save image download URL
	      newProject.cover.url = snapshot.downloadURL;
	      //this simple line add the project to the database
	      global.db.ref('projects').push(newProject);
	      //reset fields
	      newProject.title = '';
	      newProject.description = '';
	      newProject.url = 'http://';
	    });
	  },
	  removeProject: function (project) {
	    var coverRef = global.storage.child(project.cover.name);

	    // Delete the file
	    coverRef.delete().then(function() {
	      global.db.ref('projects').child(project['.key']).remove()
	      toastr.success('Project removed successfully')
	    }).catch(function(error) {
	      // Uh-oh, an error occurred!
	    });
	  },
	  onFileChange: function (e) {
	    var files = e.target.files || e.dataTransfer.files;
	    if (!files.length)
	      return;
	    this.createImage(files[0]);
	  },
	  createImage : function (file) {
	    var image = new Image();
	    var reader = new FileReader();
	    var newProject = this.newProject;

	    //get file data and binding on project object
	    reader.onload = (e) => {
	      this.newProject.cover = {};
	      this.newProject.cover.name = file.name;
	      this.newProject.cover.data = e.target.result;
	    };
	    reader.readAsDataURL(file);
	  },
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
