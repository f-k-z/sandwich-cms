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
            <th class="hidden-xs">Created</th>
            <th class="hidden-xs">Updated</th>
            <th>Published</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in pages">
            
            <td><router-link :to="'work/'+page.slug">{{page.title}}</router-link></td>
            <td>{{page.slug}}</td>
            <td class="hidden-xs">{{page.created | timestampToDate}}</td>
            <td class="hidden-xs">{{page.updated | timestampToDate}}</td>
            <td>{{page.published}}</td>
            <td class="action" v-on:click="clonePage(page)"><i class="fa fa-clone" v-tooltip:top="'Clone'" aria-hidden="true"></i></td>
            <td class="action" v-on:click="editPage(page)"><i class="fa fa-pencil" v-tooltip:top="'Edit'" aria-hidden="true"></i></td>
            <td v-bind:class="{ disabled: page.locked }" class="action" v-on:click="removePage(page)" v-tooltip:top="'Remove'"><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import global from '@/global'
import toastr from 'toastr'
import moment from 'moment'

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
    clonePage: function (page) {
      var newPage = {};
      var newRef = this.$firebaseRefs.pages.push(newPage);
      //copy page to newEmpty
      this.$firebaseRefs.pages.child(page['.key']).once('value', function(snap)  {
          var pageVal = snap.val();
          //set dates
          pageVal.created = pageVal.updated = moment().format('x');
          pageVal.files = [];
          pageVal.slug = pageVal.slug+"-c";
          newRef.set( pageVal, function(error) {
            if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
      });
    },
		editPage: function (page) {

			this.$router.push('/admin/edit/'+page['.key']);
		},
	  removePage: function (page) {
			this.$firebaseRefs.pages.child(page['.key']).remove()
	    toastr.success('Page removed successfully')
		},
	},
  created: function() {

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

.fa { margin-left: 10px; }
.disabled { 
  opacity: .2;
  pointer-events: none;
  cursor: default;
}
</style>
