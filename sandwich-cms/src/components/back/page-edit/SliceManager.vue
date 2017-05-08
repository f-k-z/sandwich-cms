<template>
	<div class="panel panel-default">
    <div class="panel-heading">
      <strong>Slices</strong>
    </div>
    <div class="panel-body">
      <button class="btn btn-primary" v-on:click="resetSlice" data-toggle="modal" data-target="#sliceModal">+ Add Slice</button>
      <div class="modal fade" id="sliceModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{ modalTitle }}</h4>
            </div>
            <div class="modal-body">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#html-editor">HTML: editor</a></li>
                <li><a data-toggle="tab" href="#html-source">HTML: source</a></li>
              </ul>
              <br>
              <div class="tab-content">
                <div id="html-editor" class="tab-pane fade in active">
                 <vue-html5-editor :content="currentSlice.content" v-on:change="onChangeContent" :height="200" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
                </div>
                <div id="html-source" class="tab-pane fade">
                  <label>HTML code only :</label>
                  <textarea class="form-control" v-model="currentSlice.content" rows="10"></textarea>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <input type="checkbox" id="sliceVisible" v-model="currentSlice.visible">
                <label for="sliceVisible">Visible</label>
              </div>
              <div class="form-group">
                <label for="sliceCSSClass">CSS Class</label>
                <input type="text" id="sliceCSSClass" v-model="currentSlice.css_class">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" v-on:click="saveSlice" class="btn btn-primary">Save</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
      <hr/>
      <div id="slices" class="panel-group list-group" v-sortable="{ handle: '.handle', onUpdate: onDragSlice }">
        <div v-for="(slice, sliceKey) in slices" class="panel panel-default list-group-item" >
            <div class="panel-heading">
                <h4 class="panel-title">
              		<a class="action handle">
                    <i class="fa fa-bars handle" aria-hidden="true"></i>
                  </a>
                  <a data-toggle="collapse" data-parent="#slices" :href="'#'+ sliceKey">
                    {{ sliceKey }}
                  </a>
                  <a class="action" v-on:click="removeSlice(slice, sliceKey)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                  <a class="action" v-on:click="editSlice(slice, sliceKey)">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                </h4>
            </div>
            <div :id="sliceKey" class="panel-collapse collapse">
                <div class="panel-body">
                    <p v-html="slice.content"></p>
                </div>
            </div>
      	</div>
      </div>
    </div>
  </div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'

export default {
  name: 'slice-manager',
  props: ['pageKey'],
  firebase: {
    pages: global.db.ref('pages')
  },

  data () {
    return {
      sliceKey: false,
      modalTitle:'New Slice', 
      currentSlice: {
        content: ''},
      totalSlices: 0,
      slices: [],
    }
  },
	methods: {
    saveSlice: function () {
      if(!this.sliceKey ) {
        //add new slice
        global.db.ref('pages/'+this.pageKey+'/slices').push(this.currentSlice);
        toastr.success(global.errorMessages.SLICE_ADDED);
      }
      else {
        //edit slice
        global.db.ref('pages/'+this.pageKey+'/slices').child(this.sliceKey).set(this.currentSlice);
        toastr.success(global.errorMessages.SLICE_EDITED);
      }
      $('#sliceModal').modal('toggle');
      this.dispatchUpdatedPage();
      this.resetSlice();
    },
    resetSlice: function() {
      this.sliceKey = false;
      this.modalTitle = 'New Slice';
      this.currentSlice = { content: '' };
    },
    editSlice: function (slice, sliceKey) {
      this.currentSlice = slice;
      this.sliceKey = sliceKey;
      this.modalTitle = 'Edit Slice: '+sliceKey;
      this.content = slice.content;
      $('#sliceModal').modal('toggle');
    },
    removeSlice: function (slice, sliceKey) {
      global.db.ref('pages/'+this.pageKey+'/slices').child(sliceKey).remove();
      toastr.success(global.errorMessages.SLICE_REMOVED);
      this.dispatchUpdatedPage();
    },
    onDragSlice: function (event) {
    	console.log(event);
      console.log(this.slices);
    	console.log(this.totalSlices);
      //this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
    },
    dispatchUpdatedPage: function() {
      var scope = this;
      global.db.ref('pages/'+this.pageKey).on('value', function(snapshot) {
        var object = snapshot.val();
        scope.$emit('update', object);
      });
    },
    onChangeContent: function(newContent) {
      this.currentSlice.content = newContent;
    }
	},
   //load object on created
  created: function() {
    var scope = this;
    global.db.ref('pages/'+this.pageKey+'/slices').on('value', function(snapshot) {
        scope.totalSlices = snapshot.numChildren();
        scope.slices = snapshot.val();
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.action {  cursor: pointer; }
.action:hover { background: #DDD; }
.panel-title { 
  position: relative;
  .action {
    float: right;
    margin: -10px 0 0 0;
    padding: 10px;
  }
  .action.handle {
    float: none;
    margin: 0 0 0 -10px;
    padding: 8px;
  }
}

.panel-body { overflow: hidden; width: 100%;}

#sliceModal {
  height: 100%;
  position: fixed;

  .modal-dialog {
    width: 70%;
  }
   
}
</style>
