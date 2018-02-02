<template>
  <div id="home-app" >
    <div id="home-display">
        <home-canvas id="home-canvas"/>
    </div>
  </div>
</template>

<script>

import Canvas from './Canvas/Canvas';

export default {
  components: {
    'home-canvas': Canvas
  }
}

</script>

<style>

#home-canvas {
  width: 100vw;
  height: 90vh;
}

</style>
