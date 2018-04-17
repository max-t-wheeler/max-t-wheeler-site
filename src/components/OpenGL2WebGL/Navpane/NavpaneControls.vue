<template>

  <div>
    <br>
    <div v-for="parameter in animation.parameters" :key="parameter.label" class="opengl2webgl-navpane-controls" :class='screenType'>
      <p> {{parameter.label }} </p>
      <input class="opengl2webgl-navpane-input" type="number" v-model="parameter.currentValue"/>
      <br>
    </div>
    <br>
    <div class="opengl2webgl-navpane-controls" :class='screenType'>
      <b-button v-on:click="activate(animation)">
        <span class="glyphicon glyphicon-play-circle opengl2webgl-navpane-button"></span>
      </b-button>
      <b-button v-on:click="resetAnimation(animation)">
        <span class="glyphicon glyphicon-refresh opengl2webgl-navpane-button"></span>
      </b-button>
      <b-button v-on:click="toFullScreen()">
        <span class="glyphicon glyphicon-move opengl2webgl-navpane-button"></span>
      </b-button>
    </div>
    <br>
  </div>

</template>

<script>

export default {
  props: ['animation', 'screenType', 'activate', 'resetAnimation', 'toFullScreen']
}

</script>

<style>

.opengl2webgl-navpane-controls {
  text-align: left;
}

.opengl2webgl-navpane-controls.monitor {
  text-align: center;
}

.opengl2webgl-navpane-input {
  width: 80%;
}

.opengl2webgl-navpane-button {
  font-size: 20px;
}

</style>
