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

let canvasManager;

export default {
  props: ['screenType', 'searchedText'],
  components: {
    'opengl2webgl-navpane-controls': NavpaneControls
  },
  data () {
    return {
      display: false,
      categories: [
        {
          active: false,
          hidden: false,
          name: 'art'
        },
        {
          active: false,
          hidden: false,
          name: 'math'
        },
        {
          active: false,
          hidden: true,
          name: 'physics'
        },
        {
          active: false,
          hidden: true,
          name: 'shapes'
        },
        {
          active: false,
          hidden: false,
          name: 'simulations'
        }
      ],
      animations: [
        {
          active: false,
          address: '/opengl_webgl_conversion#art_blanket',
          category: 'art',
          controllable: false,
          dynamic: false,
          hidden: false,
          name: 'blanket',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 1
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 500,
              minValue: 3
            }
          },
          text: 'blanket'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_bounce_ripple',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'bounce ripple',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            radius: {
              label: 'Radius',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 6,
              minValue: 1
            }
          },
          text: 'bounce ripple'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthedad',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'chrysanthedad',
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 32,
              minValue: 2
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 32,
              currentValue: 32,
              maxValue: 32,
              minValue: 2
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30,
              maxValue: 32,
              minValue: 1
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 8,
              minValue: 1
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 10,
              minValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 8,
              minValue: 1
            }
          },
          text: 'chrysanthedad'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 120,
              minValue: 4
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 16,
              currentValue: 16,
              maxValue: 120,
              minValue: 12
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 6,
              minValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 6,
              minValue: 1
            }
          },
          text: 'chrysanthemum'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum2',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum2',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 2'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum3',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum3',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 3'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum4',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum4',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 4'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum5',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum5',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 5'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'chrysanthemum6',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 120,
              minValue: 4
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 16,
              currentValue: 16,
              maxValue: 120,
              minValue: 12
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 6,
              minValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 6,
              minValue: 1
            }
          },
          text: 'chrysanthemum'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum7',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum7',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 7'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum8',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum8',
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30,
              maxValue: 1000,
              minValue: 0
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum8'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum9',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'chrysanthemum9',
          parameters: {
            numCenters: {
              label: 'Number of Centers',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 32,
              currentValue: 32,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 30,
              currentValue: 30,
              maxValue: 1000,
              minValue: 0
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'chrysanthemum 9'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_clam',
          category: 'art',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'clam',
          parameters: {
            numRidges: {
              label: 'Number of Ridges',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 0
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'clam'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_collide0scope',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'collide',
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 100,
              minValue: 2
            }
          },
          text: 'collide0scope'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'concentric polygons',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 3
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 48,
              minValue: 3
            }
          },
          text: 'concentric polygons'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons2',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'concentric polygons 2',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 100,
              minValue: 1
            },
            radius: {
              label: 'Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 20,
              minValue: 1
            }
          },
          text: 'concentric polygons 2'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_fauxlidoscope',
          cameraZoomMax: 100,
          cameraZoomMin: 1,
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'fauxlidoscope',
          parameters: {
            numSteps: {
              label: 'Number of Steps',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 120,
              minValue: 1
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 120,
              minValue: 2
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 64,
              minValue: 3
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 60,
              minValue: 2
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 64,
              minValue: 1
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 10,
              minValue: 0
            }
          },
          text: 'fauxlidoscope'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_flowers',
          category: 'art',
          controllable: true,
          dynamic: false,
          hidden: false,
          name: 'flowers',
          parameters: {
            numFlowers: {
              label: 'Number of Flowers',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 10,
              minValue: 1
            },
            numPetals: {
              label: 'Number of Petals',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 256,
              minValue: 0
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 64,
              minValue: 2
            },
            petalRadius: {
              label: 'Petal Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1,
              minValue: 1
            }
          },
          text: 'flowers'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_gyr0scope',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'gyro',
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 100,
              minValue: 0
            }
          },
          text: 'gyr0scope'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_pearl',
          category: 'art',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'pearl',
          parameters: {
            numRidges: {
              label: 'Number of Ridges',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 0
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'pearl'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_pinwheel',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'pinwheel',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 20,
              minValue: 1
            },
            numFaces: {
              label: 'Number of Faces',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 32,
              minValue: 3
            }
          },
          text: 'pinwheel'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_snowflake',
          category: 'art',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'snowflake',
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 12,
              minValue: 1
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 64,
              minValue: 8
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 100,
              minValue: 3
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 64,
              minValue: 2
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 500,
              minValue: 0
            }
          },
          text: 'snowflake'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_slosh_ripple',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'slosh ripple',
          parameters: {
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 500,
              minValue: 10
            },
            radius: {
              label: 'Radius',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 10,
              minValue: 1
            }
          },
          text: 'slosh ripple'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_starry_night',
          category: 'art',
          controllable: true,
          dynamic: false,
          hidden: false,
          name: 'starry night',
          parameters: {
            numStars: {
              label: 'Number of Stars',
              defaultValue: 42,
              currentValue: 42,
              maxValue: 1000,
              minValue: 1
            },
            numStems: {
              label: 'Number of Stems',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 64,
              minValue: 2
            },
            numSplits: {
              label: 'Number of Splits',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 8,
              minValue: 1
            },
            radius: {
              label: 'Radius',
              defaultValue: 42,
              currentValue: 42,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'starry night'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_wriggling_donut',
          category: 'art',
          controllable: false,
          dynamic: true,
          hidden: true,
          name: 'wriggling donut',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 40,
              currentValue: 40,
              maxValue: 1000,
              minValue: 0
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 0
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 0.2,
              currentValue: 0.2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'wriggling donut'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_mosaic',
          category: 'math',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'mosaic',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 3
            },
            numPolygons: {
              label: 'Number of Polygons',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 100,
              minValue: 2
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 50,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 50,
              minValue: 0
            }
          },
          text: 'mosaic'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_mosaic2',
          category: 'math',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'mosaic2',
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 40,
              currentValue: 40,
              maxValue: 120,
              minValue: 1
            },
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 64,
              currentValue: 64,
              maxValue: 64,
              minValue: 3
            },
            numLanes: {
              label: 'Number of Lanes',
              defaultValue: 24,
              currentValue: 24,
              maxValue: 120,
              minValue: 4
            },
            polygonRadius: {
              label: 'Polygon Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 20,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 0.5,
              currentValue: 0.5,
              maxValue: 5,
              minValue: 0
            }
          },
          text: 'mosaic'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_sacred_circles',
          category: 'math',
          controllable: true,
          dynamic: false,
          hidden: false,
          name: 'sacred circles',
          parameters: {
            numLayers: {
              label: 'Number of Layers',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 64,
              minValue: 3
            },
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 12,
              currentValue: 12,
              maxValue: 64,
              minValue: 1
            },
            circleRadius: {
              label: 'Circle Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 5,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 10,
              minValue: 0
            }
          },
          text: 'sacred circles'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_star',
          category: 'math',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'star',
          parameters: {
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 0
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            },
            offset: {
              label: 'Offset',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'star'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_unoriginal',
          category: 'math',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'unoriginal',
          parameters: {
            numNodes: {
              label: 'Number of Nodes',
              defaultValue: 24,
              currentValue: 24,
              maxValue: 1000,
              minValue: 3
            },
            nodeRadius: {
              label: 'Node Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 10,
              minValue: 0
            },
            globalRadius: {
              label: 'Global Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 10,
              minValue: 0
            },
            rate: {
              label: 'Rate',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 1000,
              minValue: 0
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'unoriginal'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#physics_sine_wave',
          category: 'physics',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'sine wave',
          parameters: {
            amplitude: {
              label: 'Amplitude',
              defaultValue: 0.5,
              currentValue: 0.5,
              maxValue: 1000,
              minValue: 0
            },
            frequency: {
              label: 'Frequency',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 0
            },
            phase: {
              label: 'Phase',
              defaultValue: 0,
              currentValue: 0,
              maxValue: 1000,
              minValue: 0
            },
            displacement: {
              label: 'Displacement',
              defaultValue: 0,
              currentValue: 0,
              maxValue: 1000,
              minValue: 0
            },
            numPoints: {
              label: 'Number of Points',
              defaultValue: 1500,
              currentValue: 1500,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'sine wave'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_circle',
          category: 'shapes',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'circle',
          parameters: {
            numSpokes: {
              label: 'Number of Spokes',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 1000,
              minValue: 0
            },
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'circle'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_cube',
          category: 'shapes',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'cube',
          parameters: [],
          text: 'cube'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#polystarter',
          category: 'shapes',
          controllable: true,
          dynamic: true,
          hidden: true,
          name: 'polystarter',
          parameters: {
            radius: {
              label: 'Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 0
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 0
            },
            theta: {
              label: 'Theta',
              defaultValue: 0,
              currentValue: 0,
              maxValue: 1000,
              minValue: 0
            }
          },
          text: 'polystarter'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_rectangle',
          category: 'shapes',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'rectangle',
          parameters: [],
          text: 'rectangle'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_triangle',
          category: 'shapes',
          controllable: true,
          dynamic: false,
          hidden: true,
          name: 'triangle',
          parameters: [],
          text: 'triangle'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_amparo',
          category: 'simulations',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'amparo',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'amparo'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_andorinha',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'andorinha',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 500,
              currentValue: 500,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2.25,
              currentValue: 2.25,
              maxValue: 100,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'andorinha'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_antigua',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'antigua',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 50,
              currentValue: 50,
              maxValue: 1000,
              minValue: 10
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 10,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 50,
              minValue: 1
            }
          },
          text: 'antigua'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_batidinha',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'batidinha',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 40,
              currentValue: 40,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'batidinha'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_bicardi',
          category: 'simulations',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'bicardi',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 10,
              minValue: 2
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 10,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 2
            }
          },
          text: 'bicardi'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_blouse',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'blouse',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 100,
              minValue: 2
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 100,
              currentValue: 100,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'blouse'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_brazil',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'brazil',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 100,
              minValue: 2
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 1000,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'brazil'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_choro',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'choro',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 50,
              minValue: 1
            }
          },
          text: 'choro'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_dialogo',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'dialogo',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 40,
              currentValue: 40,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 10,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'dialogo'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_flower',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'flower',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 10,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'flower'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_games',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'games',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 100,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'games'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_lamento',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'lamento',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 100,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 100,
              currentValue: 100,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'lamento'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_look',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'look',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6,
              maxValue: 100,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            dampening: {
              label: 'Dampening',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'look'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_mojave',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'mojave',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'mojave'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_sabia',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'sabia',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'sabia'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_tereza',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'tereza',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'tereza'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_triste',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          hidden: false,
          name: 'triste',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 100,
              currentValue: 100,
              maxValue: 1000,
              minValue: 1
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200,
              maxValue: 1000,
              minValue: 100
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1,
              maxValue: 5,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 1
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 20,
              currentValue: 20,
              maxValue: 1000,
              minValue: 3
            },
            rate: {
              label: 'Rate',
              defaultValue: 3,
              currentValue: 3,
              maxValue: 100,
              minValue: 1
            }
          },
          text: 'triste'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_wave',
          category: 'simulations',
          controllable: false,
          dynamic: true,
          hidden: false,
          name: 'wave',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 2,
              currentValue: 2,
              maxValue: 100,
              minValue: 2
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 120,
              currentValue: 120,
              maxValue: 1000,
              minValue: 10
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 4,
              currentValue: 4,
              maxValue: 100,
              minValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10,
              maxValue: 100,
              minValue: 1
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5,
              maxValue: 1000,
              minValue: 1
            }
          },
          text: 'wave'
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
    },
    toFullScreen: function () {
      let canvas = document.getElementById('opengl2webgl-canvas');
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

</style>
