<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <router-view></router-view>
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
</template>

<script>
import global from '@/global'

export default {
  name: 'app',
  firebase: {
    projects: global.db.ref('projects')
  },
  data () {
    return {
      title: 'Sandwich CMS'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
