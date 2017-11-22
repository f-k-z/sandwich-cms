<template>
	<div class="file-manager">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Files</strong>
      </div>
      <div class="panel-body">
         <form id="form" class="form" v-on:submit.prevent="addFile">
           <div class="form-group">
            <input type="file" id="fileBrowser" class="form-control" v-on:change="onFileChange">
          </div>
          <input type="submit" class="btn btn-primary" value="+ Add">
        </form>
        <hr>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Files</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files">
              <td><a target="_blank" v-bind:href="file.url">{{ file.name }}</a></td>
              <td class="action" v-tooltip:top="'Remove'" v-on:click="removeFile(file)">
              	<i class="fa fa-trash fa-fw" aria-hidden="true"></i>
              </td>
              <td class="action" v-tooltip:top="'Copy URL'" v-on:click="copyToClipboard(file)">
              	<i class="fa fa-clipboard fa-fw" aria-hidden="true"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
	</div>
</template>

<script>
import global from '@/global'
import toastr from 'toastr'

var pageFileRef;

export default {
  name: 'media-manager',
  props: ['pageKey'],
  data () {
    return {
      tmpFileData: {},
      currentFile: global.getEmptyFile(),
      files: []
    }
  },
  methods: {
    addFile: function () {
      //get the scope
      var scope = this;
      var currentFile = this.currentFile;
      //get the name
      currentFile.name = this.tmpFileData.name;
      //upload the file
      var fileStorageRef = global.storage.child(currentFile.name);
      var oldTimeout = toastr.options.timeOut;
      //set to 0 to make it sticky
      toastr.options.timeOut = 0;
      toastr.info('File is uploading... Please wait.');

      fileStorageRef.putString(this.tmpFileData.data, 'data_url').then(function(snapshot) {
        //media will only save image download URL
        currentFile.url = snapshot.downloadURL;
        pageFileRef.push(currentFile);
        toastr.options.timeOut = oldTimeout;
        toastr.clear();
        toastr.success('File uploaded successfully');
        //reset fields
        currentFile = global.getEmptyFile();
      });
    },
    //remove file in storage and DB
    removeFile: function (file) {
      var fileToRemoveRef = global.storage.child(file.name);
      // Delete the file
      fileToRemoveRef.delete().then(function() {
        pageFileRef.child(file.key).remove();
        toastr.success('File removed successfully');
      }).catch(function(error) {
        // error
      });
    },
    //copy file URL to clipboard
    copyToClipboard: function (file) {
    	var url = file.url;
      var $temp = $("<input>");
		  $("body").append($temp);
		  $temp.val(url).select();
		  document.execCommand("copy");
		  $temp.remove();
    },
    //create temporary file when file change
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createFile(files[0]);
    },
    createFile : function (fileData) {
      var reader = new FileReader();
      this.tmpFileData = {};
      //get file data and binding on object
      reader.onload = (e) => {
        this.tmpFileData.name = fileData.name;
        this.tmpFileData.data = e.target.result;
      };
      reader.readAsDataURL(fileData);
    },
  },
  //load object on created
  created: function() {
  	var scope = this;
    pageFileRef = global.db.ref('pages/'+this.pageKey+'/files');
    pageFileRef.on('value', function(filesSnapshot) {
	      scope.files = [];
	      //snapshot table to handle drag and drop
	      filesSnapshot.forEach(function (snapshot) {
           var object = snapshot.val();
           object.key = snapshot.key;
	         scope.files.push(object);
	     	});
	    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.action { 
	width: 30px; 
	font-weight: normal; 
	text-align: center;
}

</style>
