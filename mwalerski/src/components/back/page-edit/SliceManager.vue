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
              <div class="form-group">
                <label for="sliceCSSClass">Name</label>
                <input type="text" id="sliceCSSClass" v-model="currentSlice.name">
              </div>
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
              <div class="form-group">
                <label for="sliceCSSStyle">CSS Style</label>
                <input type="text" id="sliceCSSStyle" v-model="currentSlice.css_style">
              </div>
              <div class="form-group">
                <input type="checkbox" id="sliceLocked" v-model="currentSlice.locked">
                <label for="sliceLocked">Locked</label>
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
              		<span class="action handle">
                    <i class="fa fa-bars handle" aria-hidden="true"></i>
                  </span>
                  <a v-if="slice.name == '' || !slice.name" data-toggle="collapse" data-parent="#slices" :href="'#'+ slice.sliceKey">
                    Slice #{{ slice.sliceKey }}
                  </a>
                  <a v-else data-toggle="collapse" data-parent="#slices" :href="'#'+ slice.sliceKey">
                    {{ slice.name }}
                  </a>
                  <b>Index: {{ slice.index }}</b>
                  <a class="action" v-on:click="removeSlice(slice, slice.sliceKey)" v-bind:class="{ disabled: slice.locked }">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                  <a class="action" v-on:click="editSlice(slice, slice.sliceKey)">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                </h4>
            </div>
            <div :id="slice.sliceKey" class="panel-collapse collapse">
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

var sliceRef;

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
      currentSlice: global.getEmptySlice(),
      //this table only contains slices key. Useful to reorder table with splice
      draggedSlices: [], 
      //slices data (display)
      slices: [],
    }
  },
	methods: {
    saveSlice: function () {
      if(!this.sliceKey ) {
      	var scope = this;
        //add new slice
        this.currentSlice.index = this.draggedSlices.length;
        sliceRef.push(this.currentSlice, function(error) {
				    scope.refreshSliceView();
            scope.resetSlice();
				});
        toastr.success(global.errorMessages.SLICE_ADDED);
      }
      else {
        //edit slice
        sliceRef.child(this.sliceKey).set(this.currentSlice, function(error) {
				    scope.refreshSliceView();
            scope.resetSlice();
				});
        toastr.success(global.errorMessages.SLICE_EDITED);
      }
      $('#sliceModal').modal('toggle');
      this.dispatchUpdatedPage();
    },
    resetSlice: function() {
      this.sliceKey = false;
      this.modalTitle = 'New Slice';
      this.currentSlice = global.getEmptySlice();
    },
    editSlice: function (slice, sliceKey) {
      this.currentSlice = slice;
      this.sliceKey = sliceKey;
      this.modalTitle = 'Edit Slice: '+sliceKey;
      this.content = slice.content;
      $('#sliceModal').modal('toggle');
    },
    removeSlice: function (slice, sliceKey) {
    	var scope = this;
      sliceRef.child(sliceKey).remove(function(error) {
      		//update snapshot table
      	 	scope.draggedSlices.splice(scope.draggedSlices.indexOf(sliceKey), 1);
      	 	scope.updateDragIndex(true);
				});
      toastr.success(global.errorMessages.SLICE_REMOVED);
      this.dispatchUpdatedPage();
    },
    onDragSlice: function (event) {
    	//update snapshot table (reorder)
      this.draggedSlices.splice(event.newIndex, 0, this.draggedSlices.splice(event.oldIndex, 1)[0]);
      //update firebase
      this.updateDragIndex(true);
    },
    updateDragIndex: function(updateView) {
    	var scope = this;
    	var updates = {};
      $('#slices .handle').addClass('disabled');
      for (var i = 0; i < this.draggedSlices.length; i++) {
      	var sliceKey = this.draggedSlices[i];
      	var path = this.pageKey + '/slices/' + sliceKey + '/index';
      	updates[path] = i;
        //update related slice index
        for (var j = 0; j < this.slices.length; j++) {
          if(this.slices[j].sliceKey == sliceKey)
            this.slices[j].index = i;
        };
      };
      global.db.ref('pages').update(updates, function(error) {
        
         console.log("updateDragIndex: update");
      	if(updateView)
      		setTimeout(function() { 
            $('#slices .handle').removeClass('disabled');
            
            scope.refreshSliceView(); 
          }, 1000);
      });
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
    },
    refreshSliceView: function() {
    	var scope = this;
      console.log("refreshSliceView");
      sliceRef = global.db.ref('pages/'+this.pageKey+'/slices');
	    //get slices in an array
	    sliceRef.orderByChild('index').once('value', function(slicesSnapshot) {
	      scope.slices = [];
	      scope.draggedSlices = [];
	      //snapshot table to handle drag and drop
	      slicesSnapshot.forEach(function (snapshot) {
	         var sliceKey = snapshot.key;
           var object = snapshot.val();
           object.sliceKey = sliceKey;
	         scope.slices.push(object);
	         scope.draggedSlices.push(sliceKey);
	     	});
        console.log("refreshSliceView: value", scope.slices);
	    });
    }
	},
   //load object on created
  created: function() {
    this.refreshSliceView();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.panel-title { 
  position: relative;
  .action {
    float: right;
    margin: -10px 0 0 0;
    padding: 10px;
  }
  .action.handle {
    float: none;
    margin: 0;
    padding: 8px;
  }
}

#slices .panel-heading { padding: 0; background: transparent; }

.panel-body { overflow: hidden; width: 100%;}

#sliceModal {
  height: 100%;
  position: fixed;

  .modal-dialog {
    width: 70%;
  }
   
}

.panel-default>.panel-heading+.panel-collapse>.panel-body {
  border-top-color: transparent;
}
.panel-collapse { overflow: hidden; }

.disabled { 
  opacity: .2;
  pointer-events: none;
  cursor: default;
}
</style>
<style lang="scss">
//hide upload button
.vue-html5-editor .dashboard input[type="file"] + button { display: none!important; }
</style>
