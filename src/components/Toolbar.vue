<template>
    <div>
      <b-navbar toggleable="md" type="dark" variant="success">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand v-on:click="selectHome()">WebGL Projects</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item v-for="app in appContents" :key="app.name" v-on:click="selectApp(app)">{{ app.name }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>

export default {
  props: ['homeContents', 'appContents'],
  methods: {
    selectHome: function () {
      for (let i = 0; i < this.appContents.length; ++i) {
        this.appContents[i].display = false;
      }
      this.homeContents.display = true;
    },
    selectApp: function (application) {
      this.homeContents.display = false;
      for (let i = 0; i < this.appContents.length; ++i) {
        this.appContents[i].display = false;
      }
      application.display = true;
    }
  }
}

</script>
