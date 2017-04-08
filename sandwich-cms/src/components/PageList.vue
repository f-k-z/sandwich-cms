<template>
	<div class="panel panel-default">
      <div class="panel-heading">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages">
              <td>{{page.title}}</td>
              <td>{{page.slug}}</td>
              <td>{{page.created}}</td>
              <td>{{page.updated}}</td>
              <td>{{page.published}}</td>
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
	  removePage: function (project) {
			global.db.ref('pages').child(project['.key']).remove()
	    toastr.success('Page removed successfully')
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
