<template>

  <div id="app-base">
    <app-toolbar :homeContents="home" :appContents="contents" class="toolbar"/>
    <transition name="fade" mode="out-in">
      <home-page v-if="home.display" :screenType="screenType" class="application"/>
      <opengl2webgl-app v-if="contents[0].display" :screenType="screenType" class="application"/>
      <media-app v-if="contents[1].display" :screenType="screenType" class="application"/>
      <cv-app v-if="contents[2].display" :screenType="screenType" class="application"/>
      <contact-app v-if="contents[3].display" :screenType="screenType" class="application"/>
    </transition>
  </div>

</template>

<script>

import Toolbar from './components/Toolbar';
import Home from './components/Home/Home';
import OpenGL2WebGLApp from './components/OpenGL2WebGL/OpenGL2WebGLApp';
import MediaApp from './components/Media/MediaApp';
import CVApp from './components/CV/CVApp';
import ContactApp from './components/Contact/ContactApp';

export default {
  name: 'App',
  components: {
    'app-toolbar': Toolbar,
    'home-page': Home,
    'opengl2webgl-app': OpenGL2WebGLApp,
    'media-app': MediaApp,
    'cv-app': CVApp,
    'contact-app': ContactApp
  },
  data () {
    return {
      home: {
        name: 'Home',
        address: '#home',
        display: true
      },
      contents: [
        {
          name: 'WebGL Projects',
          address: '#webgl-projects',
          display: false
        },
        {
          name: 'Media',
          address: '#media',
          display: false
        },
        {
          name: 'CV',
          address: '#cv',
          display: false
        },
        {
          name: 'Contact',
          address: '#contact',
          display: false
        }
      ],
      screenType: '',
      screenAspectRatio: ''
    }
  },
  methods: {
    checkScreenSize: function () {

      if (window.innerWidth < 576) {
        this.screenType = 'phone';
      } else if (window.innerWidth < 768) {
        this.screenType = 'tablet';
      } else {
        this.screenType = 'monitor';
      }

      if (window.innerWidth / window.innerHeight > 2) {
        this.screenAspectRatio = 'widescreen';
      } else {
        this.screenAspectRatio = 'normal';
      }

    },
    resizeApp: function () {
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  },
  mounted () {
    this.checkScreenSize();
  },
  updated () {
    this.resizeApp();
  }
}

</script>

<style>

body {
  background: linear-gradient(10deg, rgba(0, 255, 255, 0.9), rgba(0, 102, 0, 0.9)), url(./assets/stars.jpg);
}

#app-base {
  height: 100vh;
  overflow: hidden;
}

.application {
  height: 90vh;
  overflow: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
