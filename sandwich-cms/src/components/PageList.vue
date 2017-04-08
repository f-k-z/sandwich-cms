<template>
	<div class="panel panel-default">
      <div class="panel-heading">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Cover</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects">
              <td><a v-bind:href="project.url">{{project.title}}</a></td>
              <td>{{project.description}}</td>
              <td><img v-bind:src="project.cover.url" /></td>
              <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeProject(project)"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>

import global from '@/global'

export default {
  name: 'page-list',

  firebase: {
    projects: global.db.ref('projects')
  },

  data () {
    return {
      	msg: global.test,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
