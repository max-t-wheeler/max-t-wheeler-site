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
        <font-awesome-icon icon='play-circle' class='opengl2webgl-navpane-button'></font-awesome-icon>
      </b-button>
      <b-button @click="resetAnimation(animation)">
        <font-awesome-icon icon='sync' class='opengl2webgl-navpane-button'></font-awesome-icon>
      </b-button>
      <b-button @click="toFullScreen()">
        <font-awesome-icon icon='expand-arrows-alt' class='opengl2webgl-navpane-button'></font-awesome-icon>
      </b-button>
    </div>
    <br>
  </div>

</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExpandArrowsAlt, faPlayCircle, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faExpandArrowsAlt);
library.add(faPlayCircle);
library.add(faSync);

export default {
  props: ['animation', 'screenType', 'activate', 'resetAnimation', 'toFullScreen', 'resetInput'],
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  }
}

</script>

<style>

p {
  margin-top: 8px;
  margin-bottom: 0;
}

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
