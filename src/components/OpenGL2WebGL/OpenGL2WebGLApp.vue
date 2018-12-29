<template>
  <div>
    <b-container fluid id="opengl2webgl-container">
      <b-row v-if="screenType === 'phone'">
        <b-col>
          <h1 id="opengl2webgl-phone-message">ROTATE ME</h1>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col id="opengl2webgl-navpane" md="2" sm="3">
          <h2 id="opengl2webgl-navpane-title" :class="screenType">Animations</h2>
          <input type="text" id="opengl2webgl-search-bar" placeholder="Search" onfocus="this.value=''" v-model="searchedText"/>
          <opengl2webgl-navpane-menu id="opengl2webgl-navpane-menu" :class="[screenAspectRatio, screenType]" :screenType="screenType" :searchedText="searchedText"/>
        </b-col>
        <b-col md="10" sm="9" id='opengl2webgl-display'>
          <canvas id='opengl2webgl-canvas'></canvas>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navpane from './Navpane/Navpane';

export default {
  props: ['screenType', 'screenAspectRatio'],
  name: 'OpenGL2WebGLApp',
  components: {
    'opengl2webgl-navpane-menu': Navpane
  },
  data () {
    return {
      searchedText: ''
    }
  }
}
</script>

<style>

#opengl2webgl-phone-message {
  position: relative;
  top: 70%;
  text-align: center;
}

#opengl2webgl-navpane {
  height: 90vh;
  background: none;
  overflow: hidden;
  position: relative;
}

#opengl2webgl-navpane-title {
  position: relative;
}

#opengl2webgl-search-bar {
  position: relative;
  width: 100%;
}

#opengl2webgl-navpane-menu {
  height: 87%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  margin-top: 10px;
}
::-webkit-scrollbar {
  background: transparent;
}

#opengl2webgl-navpane-menu.tablet, #opengl2webgl-navpane-menu.phone {
  height: 80%;
}

#opengl2webgl-navpane-menu.widescreen {
  height: 75%;
}

#opengl2webgl-display {
  height:90vh;
  overflow: hidden;
}

#opengl2webgl-display.tablet, #opengl2webgl-display.phone {
  height:85vh;
}

</style>
