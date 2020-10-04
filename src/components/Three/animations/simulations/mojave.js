import Animation from '../animation';

import {

  phi,
  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_mojave',
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
}

export default class Mojave extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

    this.numPartitions = parseFloat(this.parameters.numPartitions.currentValue);
    this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
    this.graphRadius = parseFloat(this.parameters.graphRadius.currentValue);
    this.vertexRadius = parseFloat(this.parameters.vertexRadius.currentValue);
    this.rate = parseFloat(this.parameters.rate.currentValue);

    this.camera.position.set(0, 0, 4);

  }

  draw () {

    const partitionSizes = [];

    for (let i = 0; i < this.numPartitions; ++i) {
      partitionSizes.push(Math.floor(this.numVertices / this.numPartitions));
    }

    const center = [
      0,
      0,
      0
    ]

    this.graph = new Graph(partitionSizes, center, this.graphRadius, this.vertexRadius, 'ball');
    this.graph.initialize();

    this.scene.add(this.graph.vertexGroup);

  }

  update (t) {

		for (let i = 0; i < this.graph.numVertices; ++i) {

      this.graph.vertexGroup.children[i].position.set(
        this.graph.radius * Math.cos(phi(i, this.graph.numVertices)) + Math.sin(phi(this.rate * i * t, 1e3)),
        this.graph.radius * Math.sin(phi(i, this.graph.numVertices)) + Math.cos(phi(this.rate * i * t, 1e3)),
        0
      );

		}

  }

}
