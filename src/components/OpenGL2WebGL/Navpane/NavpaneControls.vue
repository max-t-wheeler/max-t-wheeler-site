<template>

  <div>
    <div v-for="parameter in animation.parameters" :key="parameter.label" class="opengl2webgl-navpane-controls">
      <p> {{parameter.label }} </p>
      <input class="opengl2webgl-navpane-input" type="number" v-model="parameter.currentValue"/>
      <br>
    </div>
    <br>
    <div class="opengl2webgl-navpane-controls">
      <b-button v-on:click="activate(animation)">Submit</b-button>
      <b-button v-on:click="resetAnimation(animation)">Reset</b-button>
    </div>
  </div>

</template>

<script>

export default {
  props: ['animation', 'activate', 'resetAnimation']
}

</script>

<style>

.opengl2webgl-navpane-controls {
  text-align: center;
}

.opengl2webgl-navpane-input {
  width: 80%;
}

</style>
