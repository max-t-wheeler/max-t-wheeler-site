<template>

  <div>
    <div v-for="category in visibleCategories" :key="category.name" class="three-navpane-category" >
      <p v-b-toggle="'category-' + category.name" class="three-navpane-category-text"> {{ category.name }} </p>
      <b-collapse :id="'category-' + category.name">
        <ul class="three-navpane-list">
          <li
            v-for='item in visibleAnimations'
            :key='item.name'
            class = "three-navpane-item"
            >
            <div v-if='item.category == category.name'>
              <p
                v-b-toggle="item.name"
                class="three-navpane-text"
                :class='{active: item.active}'
                v-on:click='activate(item)'
                > {{ item.text }}
              </p>
              <three-navpane-controls
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
    'three-navpane-controls': NavpaneControls
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
      const canvas = document.getElementById('three-canvas');
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
      const canvas = document.getElementById('three-canvas');
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

.three-navpane-category-text {
  font-family: "Arial";
  font-weight: bold;
  cursor: pointer;
  position: relative;
  margin: 0;
}

.three-navpane-category-text:focus {
  outline: none;
}

.three-navpane-list {
  list-style-type: none;
  padding: 0;
}

.three-navpane-text {
  color: purple;
  text-decoration: underline;
  font-family: "Arial";
  cursor: pointer;
  position: relative;
  margin: 0;
}

.three-navpane-text:focus {
  outline: none;
}

</style>
