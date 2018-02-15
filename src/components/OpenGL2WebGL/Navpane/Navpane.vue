<template>

  <div>
    <ul id="opengl2webgl-navpane-list" class="nav flex-column">
      <li
        class = "nav-link opengl2webgl-navpane-item"
        v-for='item in animations'
        :key='item.name'
        >
        <b-row v-if="screenType === 'monitor'" class="opengl2webgl-navpane-selector">
          <b-col cols="10">
            <p class="opengl2webgl-navpane-text" :class='[{active: item.active}, screenType]' v-on:click='activate(item)'>{{ item.text }}</p>
          </b-col>
          <b-col cols="2">
            <b-btn v-if="item.parameters.length !== 0 && item.active" v-b-toggle="item.name" class="opengl2webgl-navpane-button" :class="screenType">
              <span class="glyphicon glyphicon-chevron-down"></span>
            </b-btn>
          </b-col>
        </b-row>
        <b-row v-else class="opengl2webgl-navpane-selector">
          <b-col cols="9">
            <p class="opengl2webgl-navpane-text" :class='[{active: item.active}, screenType]' v-on:click='activate(item)'>{{ item.text }}</p>
          </b-col>
          <b-col cols="3">
            <b-btn v-if="item.parameters.length !== 0 && item.active" v-b-toggle="item.name" class="opengl2webgl-navpane-button" :class="screenType">
              <span class="glyphicon glyphicon-chevron-down"></span>
            </b-btn>
          </b-col>
        </b-row>
        <div v-if="item.parameters.length !== 0 && item.active" class="opengl2webgl-navpane-options" :class="screenType">
          <b-collapse :id="item.name">
            <opengl2webgl-navpane-controls :animationParameters="item.parameters"/>
            <br v-if="screenType === 'monitor'">
            <div>
              <b-button v-on:click="activate(item)">Submit</b-button>
              <b-button v-on:click="resetAnimation(item)">Reset</b-button>
            </div>
          </b-collapse>
        </div>
        <br v-if="screenType === 'monitor'">
      </li>
    </ul>
  </div>

</template>

<script>

import NavpaneControls from './NavpaneControls';
import CanvasManager from './canvasManager';

let canvasManager;

export default {
  props: ['screenType'],
  components: {
    'opengl2webgl-navpane-controls': NavpaneControls
  },
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
          active: false,
          parameters: []
        },
        {
          text: 'shapes / rectangle',
          name: 'rectangle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_rectangle',
          active: false,
          parameters: []
        },
        {
          text: 'shapes / cube',
          name: 'cube',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_cube',
          active: false,
          parameters: []
        },
        {
          text: 'shapes / circle',
          name: 'circle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_circle',
          active: false,
          parameters: {
            numSpokes: {
              label: 'Number of Spokes',
              defaultValue: 5,
              currentValue: 5
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'shapes / clam',
          name: 'clam',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_clam',
          active: false,
          parameters: {
            numRidges: {
              label: 'Number of Ridges',
              defaultValue: 200,
              currentValue: 200
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'shapes / pearl',
          name: 'pearl',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_pearl',
          active: false,
          parameters: {
            numRidges: {
              label: 'Number of Ridges',
              defaultValue: 200,
              currentValue: 200
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'shapes / polystarter',
          name: 'polystarter',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#polystarter',
          active: false,
          parameters: {
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 6,
              currentValue: 6
            },
            theta: {
              label: 'Theta',
              defaultValue: 0,
              currentValue: 0
            }
          }
        },
        {
          text: 'shapes / sacred circles',
          name: 'sacred circles',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#sacred_circles',
          active: false,
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 12,
              currentValue: 12
            },
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 12,
              currentValue: 12
            },
            circleRadius: {
              label: 'Circle Radius',
              defaultValue: 1,
              currentValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'shapes / star',
          name: 'star',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#star',
          active: false,
          parameters: {
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 10,
              currentValue: 10
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1
            },
            offset: {
              label: 'Offset',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'physics / sine wave',
          name: 'sine wave',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#physics_sine_wave',
          active: false,
          parameters: {
            numPoints: {
              label: 'Number of Points',
              defaultValue: 1500,
              currentValue: 1500
            }
          }
        },
        {
          text: 'art / collide0scope',
          name: 'collide',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_collide0scope',
          active: false,
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 20,
              currentValue: 20
            }
          }
        },
        {
          text: 'art / gyr0scope',
          name: 'gyro',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_gyr0scope',
          active: false,
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 20,
              currentValue: 20
            }
          }
        },
        {
          text: 'art / concentric polygons',
          name: 'concentric polygons',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4
            }
          }
        },
        {
          text: 'art / concentric polygons 2',
          name: 'concentric polygons 2',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons2',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 20,
              currentValue: 20
            },
            radius: {
              label: 'Radius',
              defaultValue: 5,
              currentValue: 5
            }
          }
        },
        {
          text: 'art / pinwheel',
          name: 'pinwheel',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_pinwheel',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4
            }
          }
        },
        {
          text: 'art / blanket',
          name: 'blanket',
          dynamic: false,
          controllable: false,
          address: '/opengl_webgl_conversion#art_blanket',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4
            }
          }
        },
        {
          text: 'art / bounce ripple',
          name: 'bounce ripple',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_bounce_ripple',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            radius: {
              label: 'Radius',
              defaultValue: 3,
              currentValue: 3
            }
          }
        },
        {
          text: 'art / slosh ripple',
          name: 'slosh ripple',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_slosh_ripple',
          active: false,
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 200,
              currentValue: 200
            },
            radius: {
              label: 'Radius',
              defaultValue: 3,
              currentValue: 3
            }
          }
        },
        {
          text: 'art / wriggling donut',
          name: 'wriggling donut',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_wriggling_donut',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 40,
              currentValue: 40
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 0.2,
              currentValue: 0.2
            }
          }
        },
        {
          text: 'art / apollo',
          name: 'apollo',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_apollo',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 4,
              currentValue: 4
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 12,
              currentValue: 12
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
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
    },
    resetAnimation: function (animation, parameters) {
      for (let parameter in animation.parameters) {
        let param = animation.parameters[parameter];
        param.currentValue = param.defaultValue;
      }
      this.activate(animation);
    }
  }
}

</script>

<style>

.opengl2webgl-navpane-text {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  position: relative;
  float: center;
}

.opengl2webgl-navpane-text.monitor {
  position: relative;
  left: 12.5%;
}

.active {
  color: purple;
}

.opengl2webgl-navpane-button, .opengl2webgl-navpane-button:hover, .opengl2webgl-navpane-button:active, .opengl2webgl-navpane-button:focus, .opengl2webgl-navpane-button:visited {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  float: right;
  position: relative;
  z-index: 10;
}

.glyphicon-chevron-down {
  color: purple;
}

.opengl2webgl-navpane-options.tablet {
  position: relative;
  right: 10%;
}

</style>
