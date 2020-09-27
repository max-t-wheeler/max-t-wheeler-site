<template>

    <div>
      <b-navbar toggleable="md" type="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand @click="selectHome()">
          <span class="fa fa-home"/>
          {{ homeContents.name }}
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item v-for="app in appContents" :key="app.name" @click="selectApp(app)">{{ app.name }}</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item right v-for="toolbarLink in toolbarLinks" :key="toolbarLink.name">
              <a rel="noopener" class="toolbar-icon external" :href="toolbarLink.src" target="_blank" v-b-tooltip.hover :title="toolbarLink.tooltip">
                <span class="fa" :class="toolbarLink.icon"/>
              </a>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

</template>

<script>

export default {
  props: ['homeContents', 'appContents'],
  data () {
    return {
      toolbarLinks: [
        {
          name: 'github',
          src: 'https://github.com/max-t-wheeler',
          icon: 'fa-github',
          tooltip: 'Must'
        },
        {
          name: 'linkedin',
          src: 'https://www.linkedin.com/in/max-wheeler-39557074/',
          icon: 'fa-linkedin',
          tooltip: 'use'
        },
        {
          name: 'facebook',
          src: 'https://www.facebook.com/max.t.wheeler',
          icon: 'fa-facebook',
          tooltip: 'right'
        },
        {
          name: 'soundcloud',
          src: 'https://soundcloud.com/empty-dubs',
          icon: 'fa-soundcloud',
          tooltip: 'click'
        }
      ]
    }
  },
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

<style>

.navbar-brand {
  font-size: 1rem;
  padding: 0;
}

.nav-link {
  font-size: 1rem;
  padding: 0;
}

.toolbar-icon {

  color: black;
  text-decoration: none;
}

.toolbar-icon:hover, .toolbar-icon:active, .toolbar-icon:visited {
  color: black;
}

</style>
