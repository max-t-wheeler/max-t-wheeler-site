import Animation from '../animation';

import {

  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_brazil',
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
}

export default class Brazil extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

    this.numPartitions = parseFloat(this.parameters.numPartitions.currentValue);
    this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
    this.graphRadius = parseFloat(this.parameters.graphRadius.currentValue);
    this.vertexRadius = parseFloat(this.parameters.vertexRadius.currentValue);
    this.divisor = parseFloat(this.parameters.divisor.currentValue);
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
    this.graph.initialize('null', 'concentric');

    this.scene.add(this.graph.vertexGroup);

  }

  update (t) {

		for (let i = 0; i < this.graph.numVertices; ++i) {

      this.graph.vertexGroup.children[i].position.set(
        this.graph.vertexGroup.children[i].position.x * (1 + this.rate * Math.cos(t) * Math.sin((i % this.divisor + 1) * t / 10) / 100),
        this.graph.vertexGroup.children[i].position.y * (1 + this.rate * Math.cos(t) * Math.sin((i % this.divisor + 1) * t / 10) / 100),
        0
      );

		}

  }

}
