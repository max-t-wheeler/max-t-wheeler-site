<template>

  <div>
    <div v-for="category in categories" :key="category.name" class="opengl2webgl-navpane-category" >
      <p v-b-toggle="'category-' + category.name" class="opengl2webgl-navpane-category-text"> {{ category.name }} </p>
      <b-collapse :id="'category-' + category.name">
        <ul class="opengl2webgl-navpane-list">
          <li
            v-if='item.category == category.name'
            v-for='item in filter'
            :key='item.name'
            class = "opengl2webgl-navpane-item"
            >
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
              v-bind="{activate, resetAnimation, toFullScreen}"
              />
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
          name: 'art'
        },
        {
          active: false,
          name: 'math'
        },
        {
          active: false,
          name: 'physics'
        },
        {
          active: false,
          name: 'shapes'
        },
        {
          active: false,
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
          name: 'blanket',
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
          },
          text: 'blanket'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_bounce_ripple',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'bounce ripple',
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
          },
          text: 'bounce ripple'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthedad',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthedad',
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
          },
          text: 'chrysanthedad'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthemum',
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
          },
          text: 'chrysanthemum'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum2',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'chrysanthemum2',
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
          },
          text: 'chrysanthemum 2'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum3',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthemum3',
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
          },
          text: 'chrysanthemum 3'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum4',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthemum4',
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
          },
          text: 'chrysanthemum 4'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum5',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthemum5',
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
          },
          text: 'chrysanthemum 5'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum6',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'chrysanthemum6',
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
          },
          text: 'chrysanthemum 6'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum7',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'chrysanthemum7',
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
          },
          text: 'chrysanthemum 7'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum8',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'chrysanthemum8',
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
          },
          text: 'chrysanthemum8'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_chrysanthemum9',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'chrysanthemum9',
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
          },
          text: 'chrysanthemum 9'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_clam',
          category: 'art',
          controllable: true,
          dynamic: false,
          name: 'clam',
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
          },
          text: 'clam'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_collide0scope',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'collide',
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 20,
              currentValue: 20
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
          name: 'concentric polygons',
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
          },
          text: 'concentric polygons'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_concentric_polygons2',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'concentric polygons 2',
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
          name: 'fauxlidoscope',
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
          },
          text: 'fauxlidoscope'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_flowers',
          category: 'art',
          controllable: true,
          dynamic: false,
          name: 'flowers',
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
          },
          text: 'flowers'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_gyr0scope',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'gyro',
          parameters: {
            numCircles: {
              label: 'Number of Circles',
              defaultValue: 20,
              currentValue: 20
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
          name: 'pearl',
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
          },
          text: 'pearl'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_snowflake',
          category: 'art',
          controllable: true,
          dynamic: true,
          name: 'snowflake',
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
          },
          text: 'snowflake'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_pinwheel',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'pinwheel',
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
          },
          text: 'pinwheel'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_slosh_ripple',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'slosh ripple',
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
          },
          text: 'slosh ripple'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_starry_night',
          category: 'art',
          controllable: true,
          dynamic: false,
          name: 'starry night',
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
          },
          text: 'starry night'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#art_wriggling_donut',
          category: 'art',
          controllable: false,
          dynamic: true,
          name: 'wriggling donut',
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
          },
          text: 'wriggling donut'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_mosaic',
          category: 'math',
          controllable: true,
          dynamic: true,
          name: 'mosaic',
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
          },
          text: 'mosaic'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_mosaic2',
          category: 'math',
          controllable: false,
          dynamic: true,
          name: 'mosaic2',
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
          },
          text: 'mosaic2'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_sacred_circles',
          category: 'math',
          controllable: true,
          dynamic: false,
          name: 'sacred circles',
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
          },
          text: 'sacred circles'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_star',
          category: 'math',
          controllable: true,
          dynamic: false,
          name: 'star',
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
          },
          text: 'star'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#math_unoriginal',
          category: 'math',
          controllable: true,
          dynamic: true,
          name: 'unoriginal',
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
          },
          text: 'unoriginal'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#physics_sine_wave',
          category: 'physics',
          controllable: true,
          dynamic: false,
          name: 'sine wave',
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
          },
          text: 'sine wave'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_circle',
          category: 'shapes',
          controllable: true,
          dynamic: false,
          name: 'circle',
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
          },
          text: 'circle'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_cube',
          category: 'shapes',
          controllable: true,
          dynamic: false,
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
          name: 'polystarter',
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
          },
          text: 'polystarter'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#shapes_rectangle',
          category: 'shapes',
          controllable: true,
          dynamic: false,
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
          name: 'triangle',
          parameters: [],
          text: 'triangle'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_amparo',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          name: 'amparo',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 10,
              currentValue: 10
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 10,
              currentValue: 10
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2
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
          name: 'andorinha',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2.25,
              currentValue: 2.25
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1
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
          name: 'antigua',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 50,
              currentValue: 50
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 5,
              currentValue: 5
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 20,
              currentValue: 20
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5
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
          name: 'batidinha',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 40,
              currentValue: 40
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2
            }
          },
          text: 'batidinha'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_bicardi',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          name: 'bicardi',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5
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
          name: 'blouse',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            rate: {
              label: 'Rate',
              defaultValue: 100,
              currentValue: 100
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
          name: 'brazil',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 20,
              currentValue: 20
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1
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
          name: 'choro',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 5,
              currentValue: 5
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1
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
          name: 'dialogo',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 40,
              currentValue: 40
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 2,
              currentValue: 2
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
          name: 'flower',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2
            },
            rate: {
              label: 'Rate',
              defaultValue: 20,
              currentValue: 20
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
          name: 'games',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10
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
          name: 'lamento',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 5,
              currentValue: 5
            },
            rate: {
              label: 'Rate',
              defaultValue: 100,
              currentValue: 100
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
          name: 'look',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 6,
              currentValue: 6
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 1000,
              currentValue: 1000
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            dampening: {
              label: 'Dampening',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10
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
          name: 'mojave',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10
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
          name: 'sabia',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2
            },
            rate: {
              label: 'Rate',
              defaultValue: 10,
              currentValue: 10
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
          name: 'tereza',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 8,
              currentValue: 8
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 2,
              currentValue: 2
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2
            },
            rate: {
              label: 'Rate',
              defaultValue: 1,
              currentValue: 1
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
          name: 'triste',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 100,
              currentValue: 100
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 200,
              currentValue: 200
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 1,
              currentValue: 1
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 2,
              currentValue: 2
            },
            divisor: {
              label: 'Divisor',
              defaultValue: 20,
              currentValue: 20
            },
            rate: {
              label: 'Rate',
              defaultValue: 3,
              currentValue: 3
            }
          },
          text: 'triste'
        },
        {
          active: false,
          address: '/opengl_webgl_conversion#simulations_wave',
          category: 'simulations',
          controllable: true,
          dynamic: true,
          name: 'wave',
          parameters: {
            numPartitions: {
              label: 'Number of Partitions',
              defaultValue: 2,
              currentValue: 2
            },
            numVertices: {
              label: 'Number of Vertices',
              defaultValue: 120,
              currentValue: 120
            },
            graphRadius: {
              label: 'Graph Radius',
              defaultValue: 4,
              currentValue: 4
            },
            vertexRadius: {
              label: 'Vertex Radius',
              defaultValue: 10,
              currentValue: 10
            },
            rate: {
              label: 'Rate',
              defaultValue: 5,
              currentValue: 5
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

</style>
