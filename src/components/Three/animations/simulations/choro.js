import Animation from '../animation';

import {

  phi,
  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_choro',
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
}

export default class Choro extends Animation {

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

			this.scene.children[0].children[i].position.set(
				this.graphRadius * Math.cos(phi(i, this.graph.numVertices) + this.rate * Math.sin(this.scene.children[0].children[i].position.x - t) / 10),
				this.graphRadius * Math.sin(phi(i, this.graph.numVertices) + this.rate * Math.cos(this.scene.children[0].children[i].position.y - t) / 10),
				0
			);

		}

  }

}
