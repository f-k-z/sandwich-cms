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
            <label for="sliceImgUrl">Image URL</label>
            <input class="form-control" type="text" v-on:change="onChangeImgUrl" id="sliceImgUrl" v-model="imgUrl">
          </div>
          <div class="form-group">
            <label for="sliceImgPosition">Position</label>
            <v-select id="sliceImgPosition" v-model="position" :options="[{label: 'Left', value: 'img-float-left'}, {label: 'Center', value: 'asset'}, {label: 'Right', value: 'img-float-right'}, {label: 'Header', value: 'header'}, {label: 'Header Wide', value: 'header header-wide'}]"></v-select>
          </div>
          <div class="form-group">
            <label for="sliceImgAnimation">Animation</label>
            <v-select id="sliceImgAnimation" v-model="animation" :options="[{label: 'Rotation', value: 'rotation'}, {label: 'Slide', value: 'slide'}, {label: 'Reveal', value: 'reveal'}]"></v-select>
          </div>
          <div class="form-group">
            <input type="checkbox" id="sliceImgVisible" v-model="currentSlice.visible">
            <label for="sliceImgVisible">Visible</label>
          </div>
          <div class="form-group">
            <input type="checkbox" id="sliceImgLocked" v-model="currentSlice.locked">
            <label for="sliceImgLocked">Locked</label>
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

import vSelect from 'vue-select'

export default {
  name: 'modal-img-slice',
  props: ['currentSlice', 'modalTitle'],
  data () {
    return {
      imgUrl:'',
      animation: null,
      position: null
    }
  },
  methods: {
    saveSlice: function () {
      this.currentSlice.name = 'Image';
      var pos = (this.position) ? this.position.value : '';
      var anim = (this.animation) ? this.animation.value : '';
      if(this.position && this.animation)
        anim = ' '+anim;
      this.currentSlice.css_class = pos+anim;
      this.currentSlice.css_style = '';
      this.$emit('save', 'modal-img-slice');
      this.animation = this.position = null;
      this.imgUrl = '';
    },
    onChangeImgUrl: function() {
      this.currentSlice.content = '<img src="'+this.imgUrl+'">';
    },
  },
  components: {
    vSelect
  }
}
</script>

<style lang="scss">

</style>
