import Animation from '../animation';

import {

  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_wave',
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

export default class Wave extends Animation {

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
				Math.sin(this.scene.children[0].children[i].position.y - t * this.rate / 100) * Math.sin(i * t * this.rate / 100),
				0
			);

		}

  }

}
