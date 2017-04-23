<template>
	<div class="panel panel-default">
      <div class="panel-heading">
        <strong>Slices</strong>
      </div>
      <div class="panel-body">
        <button class="btn btn-primary" data-toggle="modal" data-target="#sliceModal">+ Add Slice</button>
        <div class="modal fade" id="sliceModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">New Slice</h4>
              </div>
              <div class="modal-body">
                <vue-html5-editor :content="content" v-on:change="onChangeSlice" :height="200" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" v-on:click="addSlice" class="btn btn-primary">Save</button>
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
      	content: '',
        slices: [],
    }
  },
	methods: {
    addSlice: function () {
      var newSlice = { content: this.content }
      global.db.ref('pages/'+this.pageKey+'/slices').push(newSlice);
      $('#sliceModal').modal('toggle');
      toastr.success('Slice added');
      this.dispatchUpdatedPage();
      this.content = '';
    },
    editSlice: function (slice) {

    },
    removeSlice: function (slice, sliceKey) {
      global.db.ref('pages/'+this.pageKey+'/slices').child(sliceKey).remove();
      toastr.success('Slice removed successfully');
      this.dispatchUpdatedPage();
    },
    dispatchUpdatedPage: function() {
      var scope = this;
      global.db.ref('pages/'+this.pageKey).on('value', function(snapshot) {
        var object = snapshot.val();
        scope.$emit('update', object);
      });
    },
    onChangeSlice: function(newContent) {
      this.content = newContent;
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
