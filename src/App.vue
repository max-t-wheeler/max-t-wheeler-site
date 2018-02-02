<template>
  <div>
    <app-toolbar :homeContents="home" :appContents="contents" class="toolbar"/>
    <home-page v-if="home.display" class="application"/>
    <opengl2webgl-app v-if="contents[0].display" class="application"/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar';
import Home from './components/Home/Home';
import OpenGL2WebGLApp from './components/OpenGL2WebGL/OpenGL2WebGLApp';

export default {
  name: 'App',
  components: {
    'app-toolbar': Toolbar,
    'home-page': Home,
    'opengl2webgl-app': OpenGL2WebGLApp
  },
  data () {
    return {
      home: {
        name: 'Home',
        id: 'home-app',
        address: '#home',
        display: true
      },
      contents: [
        {
          name: 'OpenGL2WebGL',
          id: 'opengl2webgl-app',
          address: '#opengl2webgl',
          display: false
        }
/**
        {
          name: 'jQuery Art',
          id: 'jquery-art-app',
          address: '#jquery-art'
        },
        {
          name: 'Media',
          id: 'media-app',
          address: '#media'
        },
        {
          name: 'CV',
          id: 'cv-app',
          address: '#cv'
        },
        {
          name: 'Contact',
          id: 'contact-app',
          address: '#contact'
        }
/**/
      ]
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

</style>
