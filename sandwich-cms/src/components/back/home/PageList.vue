<template>
	<div class="panel panel-default">
    <div class="panel-heading">
      <strong>Pages</strong>
    </div>
    <div class="panel-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Type</th>
            <th class="hidden-xs">Created</th>
            <th class="hidden-xs">Updated</th>
            <th>Published</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in pages">
            <td>{{page.title}}</td>
            <td>{{page.slug}}</td>
            <td>{{page.type}}</td>
            <td class="hidden-xs">{{page.created | timestampToDate}}</td>
            <td class="hidden-xs">{{page.updated | timestampToDate}}</td>
            <td>{{page.published}}</td>
            <td class="action" v-on:click="editPage(page)"><i class="fa fa-pencil" aria-hidden="true"></i></td>
            <td  class="action" v-on:click="removePage(page)"><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'

export default {
  name: 'page-list',

  firebase: {
    pages: global.db.ref('pages')
  },

  data () {
    return {
      	msg: global.test,
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
.fa { margin-left: 10px; }
</style>
