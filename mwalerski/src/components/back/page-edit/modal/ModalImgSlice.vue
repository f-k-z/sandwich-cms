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
          <div class="form-group">
            <label for="sliceImgUrl">Image URL</label>
            <input type="text" v-on:change="onChangeImgUrl" id="sliceImgUrl" v-model="imgUrl">
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
  name: 'modal-img-slice',
  props: ['currentSlice', 'modalTitle'],
  data () {
    return {
      imgUrl:'',
    }
  },
  methods: {
    saveSlice: function () {
      this.$emit('save', 'modal-img-slice');
    },
    onChangeImgUrl: function() {
      this.currentSlice.content = '<img src="'+this.imgUrl+'">';
    },
  },
  components: {
  }
}
</script>

<style lang="scss">

</style>
