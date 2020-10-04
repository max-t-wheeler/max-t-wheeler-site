import Animation from '../animation';

import {

  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_bicardi',
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
}

export default class Bicardi extends Animation {

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
    this.graph.initialize('null', 'grid');

    this.scene.add(this.graph.vertexGroup);

  }

  update (t) {

		for (let i = 0; i < this.graph.numVertices; ++i) {

			this.scene.children[0].children[i].position.set(
				this.scene.children[0].children[i].position.x,
				this.graphRadius * Math.sin(this.scene.children[0].children[i].position.y - t * this.rate / this.graph.numVertices) * Math.sin(this.scene.children[0].children[i].position.y - i * t * this.rate / this.graph.numVertices),
				0
			);

		}

  }

}
