<template>
  <div>
    <b-container fluid id="opengl2webgl-container">
      <b-row v-if="screenType === 'phone'">
        <b-col>
          <h1 id="opengl2webgl-phone-message">FLIP ME</h1>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col id="opengl2webgl-navpane" md="2" sm="3">
          <h2 id="opengl2webgl-navpane-title" :class="screenType">Animations</h2>
          <opengl2webgl-navpane id="opengl2webgl-navpane-menu" :screenType="screenType"/>
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
  props: ['screenType'],
  name: 'OpenGL2WebGLApp',
  components: {
    'opengl2webgl-navpane': Navpane
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
  right: 10%;
  text-align: center;
}

#opengl2webgl-navpane-title.monitor {
  position: relative;
  left: 5%;
}

#opengl2webgl-navpane-title.tablet {
  position: relative;
  right: 10%;
}

#opengl2webgl-navpane-menu {
  height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: absolute;
  text-align: center;
}

#opengl2webgl-display {
  height:90vh;
  overflow: hidden;
}

</style>
