<template>
	<div class="panel panel-default">
    <div class="panel-heading">
      <strong>Slices</strong>
    </div>
    <div class="panel-body">
      <button class="btn btn-primary" v-on:click="resetSlice" data-toggle="modal" data-target="#sliceModal">+ Add Slice</button>
      <button class="btn btn-primary" v-on:click="resetSlice" data-toggle="modal" data-target="#sliceImgModal">+ Add Image Slice</button>
      <modal-slice id="sliceModal" v-on:save="saveSlice" :modal-title="modalTitle" :current-slice="currentSlice"></modal-slice>
      <modal-img-slice id="sliceImgModal" v-on:save="saveSlice" :modal-title="modalTitle" :current-slice="currentSlice"></modal-img-slice>
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
                  <a class="action" v-on:click="removeSlice(slice, slice.sliceKey)" v-tooltip:top="'Remove'" v-bind:class="{ disabled: slice.locked }">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                  <a class="action" v-tooltip:top="'Edit'" v-on:click="editSlice(slice, slice.sliceKey)">
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

import ModalSlice from '@/components/back/page-edit/modal/ModalSlice'
import ModalImgSlice from '@/components/back/page-edit/modal/ModalImgSlice'

import global from '@/global'
import toastr from 'toastr'

var sliceRef;

export default {
  name: 'slice-manager',
  props: ['pageKey'],
  firebase: {
    pages: global.db.ref('pages')
  },
  components: {
    ModalSlice, ModalImgSlice
  },
  data () {
    return {
      sliceKey: false,
      modalTitle: '',
      currentSlice: global.getEmptySlice(),
      //this table only contains slices key. Useful to reorder table with splice
      draggedSlices: [], 
      //slices data (display)
      slices: [],
    }
  },
	methods: {
    saveSlice: function (modalName) {
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
      console.log(modalName);
      if (modalName == 'modal-slice') { 
        $('#sliceModal').modal('toggle'); 
      };
      if (modalName == 'modal-img-slice') { 
        $('#sliceImgModal').modal('toggle');
      }
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
      	 	scope.refreshSliceView();
				});
      toastr.success(global.errorMessages.SLICE_REMOVED);
      this.dispatchUpdatedPage();
    },
    onDragSlice: function (event) {
    	//update snapshot table (reorder)
      this.draggedSlices.splice(event.newIndex, 0, this.draggedSlices.splice(event.oldIndex, 1)[0]);
      //update firebase
      this.updateDragIndex(false);
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
      	if(updateView)
          scope.refreshSliceView(); 
        else
          $('#slices .handle').removeClass('disabled');
      });
    },
    dispatchUpdatedPage: function() {
      var scope = this;
      global.db.ref('pages/'+this.pageKey).on('value', function(snapshot) {
        var object = snapshot.val();
        scope.$emit('update', object);
      });
    },
    refreshSliceView: function() {
    	var scope = this;
      scope.slices = [];
      scope.draggedSlices = [];
      sliceRef = global.db.ref('pages/'+this.pageKey+'/slices');
	    //get slices in an array
	    sliceRef.orderByChild('index').once('value', function(slicesSnapshot) {
	      //snapshot table to handle drag and drop
	      slicesSnapshot.forEach(function (snapshot) {
	         var sliceKey = snapshot.key;
           var object = snapshot.val();
           object.sliceKey = sliceKey;
	         scope.slices.push(object);
	         scope.draggedSlices.push(sliceKey);
	     	});
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
