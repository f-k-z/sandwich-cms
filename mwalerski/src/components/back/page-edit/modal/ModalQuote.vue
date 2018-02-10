<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ modalTitle }}</h4>
        </div>
        <div class="modal-body">
          <br>
          <div class="form-group">
            <label>Quote</label>
            <textarea class="form-control" v-model="quote" rows="5"></textarea>
          </div>
           <div class="form-group">
            <label for="sliceQuoteAuthor">Author</label>
            <input type="text" class="form-control" id="sliceQuoteAuthor" v-model="author">
          </div>
          <div class="form-group">
            <label for="sliceQuoteStar">Star</label>
            <v-select id="sliceQuoteStar" v-model="star" :options="['0', '1', '2', '3', '4']"></v-select>
          </div>
          <div class="form-group">
            <input type="checkbox" id="sliceQuoteVisible" v-model="currentSlice.visible">
            <label for="sliceQuoteVisible">Visible</label>
          </div>
          <div class="form-group">
            <input type="checkbox" id="sliceQuoteLocked" v-model="currentSlice.locked">
            <label for="sliceQuoteLocked">Locked</label>
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
  name: 'modal-quote',
  props: ['currentSlice', 'modalTitle'],
  data () {
    return {
      quote: '',
      author: '',
      star: '0'
    }
  },
  methods: {
    saveSlice: function () {
      this.currentSlice.name = 'Quote';
      this.currentSlice.content = this.quote;
      if(this.author != '')
      {
        this.currentSlice.content += '<br>';
        this.currentSlice.content += '<b>'+this.author;
        var nStar = parseInt(this.star);
        if(nStar > 0)
          this.currentSlice.content += '<span class="space-star"></span>';
        for (var i = 0; i < nStar; i++) {
          this.currentSlice.content += '<span class="star"></span>';
        };
        this.currentSlice.content += '</b>';
      }
      this.currentSlice.css_class = 'quote';
      this.$emit('save', 'modal-quote');
      this.quote = '';
      this.author = '';
      this.star = '0';
    },
  },
  components: {
    vSelect
  }
}
</script>

<style lang="scss">
</style>
