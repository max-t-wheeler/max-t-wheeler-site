import Animation from '../animation';

import {

  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_andorinha',
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
}

export default class Andorinha extends Animation {

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
				this.graph.radius * Math.cos(i) * Math.cos(i * this.rate * t / this.graph.numVertices),
				this.graph.radius * Math.cos(i) * Math.sin(i * this.rate * t / this.graph.numVertices),
				0
			);

		}

  }

}
