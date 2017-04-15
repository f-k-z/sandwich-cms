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
                <vue-html5-editor :content="content" :height="200" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
      </div>
    </div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'

export default {
  name: 'slice-manager',

  firebase: {
    pages: global.db.ref('pages')
  },

  data () {
    return {
      	content: '',
    }
  },
	methods: {
		editPage: function (page) {
			this.$router.push('/page/edit/'+page['.key']);
		},
	  removePage: function (page) {
			this.$firebaseRefs.pages.child(page['.key']).remove()
	    toastr.success('Page removed successfully')
		},
	},
  computed: {
      active: function () {
        return (this.slug != '');
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action {  cursor: pointer; }
.action:hover { background: #DDD; }
</style>
