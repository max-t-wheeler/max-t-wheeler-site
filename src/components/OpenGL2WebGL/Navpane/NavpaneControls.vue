<template>

  <div>
    <div v-for="parameter in animationParameters" :key="parameter.label" class="opengl2webgl-navpane-controls">
      <p> {{parameter.label }} </p>
      <input class="opengl2webgl-navpane-input" type="number" v-model="parameter.currentValue">
      <br>
      <br>
    </div>
  </div>

</template>

<script>

export default {
  props: ['animationParameters']
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
