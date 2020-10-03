<template>

  <div>
    <div v-for="category in visibleCategories" :key="category.name" class="opengl2webgl-navpane-category" >
      <p v-b-toggle="'category-' + category.name" class="opengl2webgl-navpane-category-text"> {{ category.name }} </p>
      <b-collapse :id="'category-' + category.name">
        <ul class="opengl2webgl-navpane-list">
          <li
            v-for='item in visibleAnimations'
            :key='item.name'
            class = "opengl2webgl-navpane-item"
            >
            <div v-if='item.category == category.name'>
              <p
                v-b-toggle="item.name"
                class="opengl2webgl-navpane-text"
                :class='{active: item.active}'
                v-on:click='activate(item)'
                > {{ item.text }}
              </p>
              <opengl2webgl-navpane-controls
                v-if="item.parameters.length !== 0 && item.active"
                :animation="item"
                :screenType="screenType"
                v-bind="{activate, resetAnimation, toFullScreen, resetInput}"
                />
            </div>
          </li>
        </ul>
      </b-collapse>
    </div>
  </div>

</template>

<script>

import NavpaneControls from './NavpaneControls';
import CanvasManager from './canvasManager';
import { CATEGORIES } from './categoryManager';
import { ANIMATIONS } from './animationManager';

let canvasManager;

export default {
  props: ['screenType', 'searchedText'],
  components: {
    'opengl2webgl-navpane-controls': NavpaneControls
  },
  data () {
    return {
      display: false,
      categories: CATEGORIES,
      animations: ANIMATIONS
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
    },
    resetAnimation: function (animation) {
      for (const parameter in animation.parameters) {
        const param = animation.parameters[parameter];
        param.currentValue = param.defaultValue;
      }
      this.activate(animation);
    },
    toFullScreen: function () {
      const canvas = document.getElementById('opengl2webgl-canvas');
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    },
    resetInput: function (parameter) {
      if (parameter.currentValue > parameter.maxValue) {
        parameter.currentValue = parameter.maxValue
      } else if (parameter.currentValue < parameter.minValue) {
        parameter.currentValue = parameter.minValue
      }
    }
  },
  computed: {
    visibleAnimations () {
      return this.animations.filter(
        animation => {
          if (!animation.hidden) {
            return animation.text.toLowerCase().includes(this.searchedText.toLowerCase())
          }
        }
      );
    },
    visibleCategories () {
      return this.categories.filter(
        category => {
          if (!category.hidden) {
            return category
          }
        }
      );
    }
  }
}

</script>

<style>

.opengl2webgl-navpane-category-text {
  font-family: "Arial";
  font-weight: bold;
  cursor: pointer;
  position: relative;
  margin: 0;
}

.opengl2webgl-navpane-category-text:focus {
  outline: none;
}

.opengl2webgl-navpane-list {
  list-style-type: none;
  padding: 0;
}

.opengl2webgl-navpane-text {
  color: purple;
  text-decoration: underline;
  font-family: "Arial";
  cursor: pointer;
  position: relative;
  margin: 0;
}

.opengl2webgl-navpane-text:focus {
  outline: none;
}

</style>
