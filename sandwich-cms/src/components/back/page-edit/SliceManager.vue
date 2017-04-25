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
                <vue-html5-editor :content="currentSlice.content" v-on:change="onChangeContent" :height="200" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" v-on:click="saveSlice" class="btn btn-primary">Save</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <hr/>
        <div id="slices" class="panel-group">
            <div v-for="(slice, sliceKey) in slices" class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
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
        
        </p>
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
        var object = snapshot.val();
        scope.slices = object;
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action {  cursor: pointer; }
.action:hover { background: #DDD; }
.panel-title { position: relative; }
.panel-title .action {
  float: right;
  margin: -10px 0 0 0;
  padding: 10px;
}
</style>
