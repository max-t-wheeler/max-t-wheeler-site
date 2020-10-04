import Animation from '../animation';

import {

  phi,
  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_tereza',
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
}

export default class Tereza extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

    this.numPartitions = parseFloat(this.parameters.numPartitions.currentValue);
    this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
    this.graphRadius = parseFloat(this.parameters.graphRadius.currentValue);
    this.vertexRadius = parseFloat(this.parameters.vertexRadius.currentValue);
    this.rate = parseFloat(this.parameters.rate.currentValue);

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
        this.graph.radius * Math.cos(phi(i, this.graph.numVertices)) + Math.sin(t / 10) * Math.sin(this.rate * i * t / 10),
        this.graph.radius * Math.sin(phi(i, this.graph.numVertices)) * Math.cos(this.rate * (i - 1) * t / 10),
        0
      );

		}

  }

}
