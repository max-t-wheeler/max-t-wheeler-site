<template>
  <div>
    <h2 id="opengl2webgl-navpane-title">Animations</h2>
    <ul class="nav flex-column">
      <li
        class = "nav-link opengl2webgl-navpane-item"
        v-for='item in animations'
        :key='item.name'
        :class='{active: item.active}'
        v-on:click='activate(item)'
        >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import CanvasManager from './canvasManager';

let canvasManager;

export default {
  data () {
    return {
      display: false,
      animations: [
        {
          text: 'shapes / triangle',
          name: 'triangle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_triangle',
          active: false
        },
        {
          text: 'shapes / rectangle',
          name: 'rectangle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_rectangle',
          active: false
        },
        {
          text: 'shapes / cube',
          name: 'cube',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_cube',
          active: false
        },
        {
          text: 'shapes / circle',
          name: 'circle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_circle',
          active: false
        },
        {
          text: 'shapes / clam',
          name: 'clam',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_clam',
          active: false
        },
        {
          text: 'shapes / pearl',
          name: 'pearl',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_pearl',
          active: false
        },
        {
          text: 'shapes / polystarter',
          name: 'polystarter',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#polystarter',
          active: false
        },
        {
          text: 'shapes / sacred circles',
          name: 'sacred circles',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#sacred_circles',
          active: false
        },
        {
          text: 'shapes / star',
          name: 'star',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#star',
          active: false
        },
        {
          text: 'art / collide0scope',
          name: 'collide',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_collide0scope',
          active: false
        },
        {
          text: 'art / gyr0scope',
          name: 'gyro',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_gyr0scope',
          active: false
        },
        {
          text: 'physics / sine wave',
          name: 'sine wave',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#physics_sine_wave',
          active: false
        },
        {
          text: 'art / concentric polygons',
          name: 'concentric polygons',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons',
          active: false
        },
        {
          text: 'art / concentric polygons 2',
          name: 'concentric polygons 2',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons2',
          active: false
        },
        {
          text: 'art / pinwheel',
          name: 'pinwheel',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_pinwheel',
          active: false
        },
        {
          text: 'art / blanket',
          name: 'blanket',
          dynamic: false,
          controllable: false,
          address: '/opengl_webgl_conversion#art_blanket',
          active: false
        },
        {
          text: 'art / bounce ripple',
          name: 'bounce ripple',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_bounce_ripple',
          active: false
        },
        {
          text: 'art / slosh ripple',
          name: 'slosh ripple',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_slosh_ripple',
          active: false
        },
        {
          text: 'art / wriggling donut',
          name: 'wriggling donut',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_wriggling_donut',
          active: false
        },
        {
          text: 'art / apollo',
          name: 'apollo',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_apollo',
          active: false
        }
      ]
    }
  },
  methods: {
    activate: function (animation) {
      for (let i = 0; i < this.animations.length; ++i) {
        this.animations[i].active = false;
      }

      animation.active = true;
      this.display = true;

      const canvas = document.getElementById('opengl2webgl-canvas');

      if (canvasManager) {
        if (canvasManager.animationId > 0) {
          cancelAnimationFrame(canvasManager.animationId);
        }
      }

      canvasManager = new CanvasManager(canvas, animation);
    }
  }
}
</script>

<style>
#opengl2webgl-navpane-title {
  text-align: center;
}

.opengl2webgl-navpane-item {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.active {
  color: green;
}

</style>
