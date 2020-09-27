<template>

  <div>
    <br>
    <div v-for="parameter in animation.parameters" :key="parameter.label" class="opengl2webgl-navpane-controls" :class='screenType'>
      <p> {{parameter.label }} </p>
      <input
        class="opengl2webgl-navpane-input"
        type="number"
        :max="parameter.maxValue"
        :min="parameter.minValue"
        v-on:blur="resetInput(parameter)"
        v-model="parameter.currentValue"/>
      <br>
    </div>
    <br>
    <div class="opengl2webgl-navpane-controls" :class='screenType'>
      <b-button @click="activate(animation)">
        <span class="fa fa-play-circle opengl2webgl-navpane-button"></span>
      </b-button>
      <b-button @click="resetAnimation(animation)">
        <span class="fa fa-refresh opengl2webgl-navpane-button"></span>
      </b-button>
      <b-button @click="toFullScreen()">
        <span class="fa fa-arrows-alt opengl2webgl-navpane-button"></span>
      </b-button>
    </div>
    <br>
  </div>

</template>

<script>

export default {
  props: ['animation', 'screenType', 'activate', 'resetAnimation', 'toFullScreen', 'resetInput']
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
