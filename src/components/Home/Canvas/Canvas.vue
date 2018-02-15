<template>

    <canvas></canvas>

</template>

<script>

import CanvasManager from './canvasManager';

let canvasManager;

export default {
  mounted () {
    const canvas = document.getElementById('home-canvas');
    if (canvasManager) {
      if (canvasManager.animationId > 0) {
        cancelAnimationFrame(canvasManager.animationId);
      }
    }
    canvasManager = new CanvasManager(canvas);
  }
}

</script>

<style>

</style>
