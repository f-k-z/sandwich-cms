<template>
	<div class="panel panel-default">
      <div class="panel-heading">
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
              <td class="hidden-xs">{{page.created}}</td>
              <td class="hidden-xs">{{page.updated}}</td>
              <td>{{page.published}}</td>
              <td><span class="glyphicon glyphicon-edit" aria-hidden="true" v-on:click="editPage(page)"></span></td>
              <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removePage(page)"></span></td>
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
			global.db.ref('pages').child(page['.key']).remove()
	    toastr.success('Page removed successfully')
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
