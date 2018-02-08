<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ modalTitle }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="sliceName">Name</label>
            <input type="text" id="sliceName" v-model="currentSlice.name">
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
</template>

<script>

export default {
  name: 'modal-slice',
  props: ['currentSlice', 'modalTitle'],
  data () {
    return {
    }
  },
  methods: {
    saveSlice: function () {
      this.$emit('save', 'modal-slice');
    },
    onChangeContent: function(newContent) {
      this.currentSlice.content = newContent;
    },
  },
  components: {
  }
}
</script>

<style lang="scss">
//hide upload button
.vue-html5-editor .dashboard input[type="file"] + button { display: none!important; }
</style>
