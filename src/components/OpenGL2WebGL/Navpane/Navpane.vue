<template>

  <div>
    <ul id="opengl2webgl-navpane-list" class="nav flex-column">
      <li
        class = "nav-link opengl2webgl-navpane-item"
        v-for='item in filter'
        :key='item.name'
        >
        <b-row v-if="screenType === 'monitor'" class="opengl2webgl-navpane-selector">
          <b-col cols="10">
            <p class="opengl2webgl-navpane-text" :class='[{active: item.active}, screenType]' v-on:click='activate(item)'>{{ item.text }}</p>
          </b-col>
          <b-col cols="2" v-if="item.parameters.length !== 0 && item.active">
            <b-btn v-b-toggle="item.name" class="opengl2webgl-navpane-button" :class="screenType">
              <span class="glyphicon glyphicon-chevron-down"></span>
            </b-btn>
          </b-col>
        </b-row>
        <b-row v-else class="opengl2webgl-navpane-selector">
          <b-col cols="9">
            <p class="opengl2webgl-navpane-text" :class='[{active: item.active}, screenType]' v-on:click='activate(item)'>{{ item.text }}</p>
          </b-col>
          <b-col cols="3" v-if="item.parameters.length !== 0 && item.active">
            <b-btn v-b-toggle="item.name" class="opengl2webgl-navpane-button" :class="screenType">
              <span class="glyphicon glyphicon-chevron-down"></span>
            </b-btn>
          </b-col>
        </b-row>
        <div v-if="item.parameters.length !== 0 && item.active" class="opengl2webgl-navpane-options" :class="screenType">
          <b-collapse :id="item.name">
            <opengl2webgl-navpane-controls :animation="item" v-bind="{activate, resetAnimation}"/>
          </b-collapse>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>

import NavpaneControls from './NavpaneControls';
import CanvasManager from './canvasManager';

let canvasManager;

export default {
  props: ['screenType', 'searchedText'],
  components: {
    'opengl2webgl-navpane-controls': NavpaneControls
  },
  data () {
    return {
      display: false,
      animations: [
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
          text: 'art / chrysanthedad',
          name: 'chrysanthedad',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthedad',
          active: false,
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 4,
              currentValue: 4
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 32,
              currentValue: 32
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 2,
              currentValue: 2
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
        },
        {
          text: 'art / chrysanthemum',
          name: 'chrysanthemum',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum',
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
        },
        {
          text: 'art / chrysanthemum 2',
          name: 'chrysanthemum2',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_chrysanthemum2',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'art / chrysanthemum 3',
          name: 'chrysanthemum3',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum3',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 12,
              currentValue: 12
            }
          }
        },
        {
          text: 'art / chrysanthemum 4',
          name: 'chrysanthemum4',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum4',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'art / chrysanthemum 5',
          name: 'chrysanthemum5',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum5',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 6,
              currentValue: 6
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'art / chrysanthemum 6',
          name: 'chrysanthemum6',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum6',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 16,
              currentValue: 16
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'art / chrysanthemum 7',
          name: 'chrysanthemum7',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_chrysanthemum7',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 8,
              currentValue: 8
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1
            }
          }
        },
        {
          text: 'art / chrysanthemum8',
          name: 'chrysanthemum8',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_chrysanthemum8',
          active: false,
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 6,
              currentValue: 6
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 3,
              currentValue: 3
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 3,
              currentValue: 3
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'art / chrysanthemum 9',
          name: 'chrysanthemum9',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_chrysanthemum9',
          active: false,
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 6,
              currentValue: 6
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 32,
              currentValue: 32
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 6,
              currentValue: 6
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'art / clam',
          name: 'clam',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#art_clam',
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
          text: 'art / fauxlidoscope',
          name: 'fauxlidoscope',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#art_fauxlidoscope',
          cameraZoomMax: 100,
          cameraZoomMin: 1,
          parameters: {
            numSteps: {
              label: 'Number of Steps',
              defaultValue: 12,
              currentValue: 12
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 20,
              currentValue: 20
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 6,
              currentValue: 6
            },
            polygonRadius: {
              label: 'Polygon Radius',
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
          text: 'art / flowers',
          name: 'flowers',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#art_flowers',
          active: false,
          parameters: {
            numFlowers: {
              label: 'Number of Flowers',
              defaultValue: 3,
              currentValue: 3
            },
            numPetals: {
              label: 'Number of Petals',
              defaultValue: 8,
              currentValue: 8
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8
            },
            petalRadius: {
              label: 'Petal Radius',
              defaultValue: 1,
              currentValue: 1
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
          text: 'art / pearl',
          name: 'pearl',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#art_pearl',
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
          text: 'art / snowflake',
          name: 'snowflake',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#art_snowflake',
          active: false,
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 1,
              currentValue: 1
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 12,
              currentValue: 12
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 12,
              currentValue: 12
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6
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
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10
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
          text: 'art / starry night',
          name: 'starry night',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#art_starry_night',
          active: false,
          parameters: {
            numStars: {
              label: 'Number of Stars',
              defaultValue: 42,
              currentValue: 42
            },
            numStems: {
              label: 'Number of Stems',
              defaultValue: 12,
              currentValue: 12
            },
            numSplits: {
              label: 'Number of Splits',
              defaultValue: 8,
              currentValue: 8
            },
            radius: {
              label: 'Radius',
              defaultValue: 42,
              currentValue: 42
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
          text: 'math / mosaic',
          name: 'mosaic',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#math_mosaic',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 6,
              currentValue: 6
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 8,
              currentValue: 8
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 3,
              currentValue: 3
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            }
          }
        },
        {
          text: 'math / mosaic2',
          name: 'mosaic2',
          dynamic: true,
          controllable: false,
          address: '/opengl_webgl_conversion#math_mosaic2',
          active: false,
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 40,
              currentValue: 40
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 40,
              currentValue: 40
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 24,
              currentValue: 24
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 0.5,
              currentValue: 0.5
            }
          }
        },
        {
          text: 'math / sacred circles',
          name: 'sacred circles',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#math_sacred_circles',
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
          text: 'math / star',
          name: 'star',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#math_star',
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
          text: 'math / unoriginal',
          name: 'unoriginal',
          dynamic: true,
          controllable: true,
          address: '/opengl_webgl_conversion#math_unoriginal',
          active: false,
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 24,
              currentValue: 24
            },
            nodeRadius: {
              label: 'Node Radius',
              defaultValue: 1,
              currentValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2
            },
            rate: {
              label: 'Rate',
              defaultValue: 4,
              currentValue: 4
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 1,
              currentValue: 1
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
            amplitude: {
              label: 'Amplitude',
              defaultValue: 0.5,
              currentValue: 0.5
            },
            frequency: {
              label: 'Frequency',
              defaultValue: 10,
              currentValue: 10
            },
            phase: {
              label: 'Phase',
              defaultValue: 0,
              currentValue: 0
            },
            displacement: {
              label: 'Displacement',
              defaultValue: 0,
              currentValue: 0
            },
            numPoints: {
              label: 'Number of Points',
              defaultValue: 1500,
              currentValue: 1500
            }
          }
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
          text: 'shapes / cube',
          name: 'cube',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_cube',
          active: false,
          parameters: []
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
          text: 'shapes / rectangle',
          name: 'rectangle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_rectangle',
          active: false,
          parameters: []
        },
        {
          text: 'shapes / triangle',
          name: 'triangle',
          dynamic: false,
          controllable: true,
          address: '/opengl_webgl_conversion#shapes_triangle',
          active: false,
          parameters: []
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
  },
  computed: {
    filter () {
      return this.animations.filter(
        animation => {
          return animation.text.toLowerCase().includes(this.searchedText.toLowerCase())
        }
      );
    }
  }
}

</script>

<style>

.opengl2webgl-navpane-item {
  padding-left: 0;
}

.opengl2webgl-navpane-text {
  color: blue;
  text-decoration: underline;
  font-family: "Arial";
  cursor: pointer;
  position: relative;
  margin: 0;
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

</style>
