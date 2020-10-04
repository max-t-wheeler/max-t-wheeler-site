import Animation from '../animation';

import {

  phi,
  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_antigua',
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
}

export default class Antigua extends Animation {

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
    this.graph.initialize('null', 'concentric');

    this.scene.add(this.graph.vertexGroup);

  }

  update (t) {

    let count = 0;

    for (let i = 0; i < this.graph.partitionSizes.length; ++i) {

      for (let j = 0; j < this.graph.partitionSizes[i]; ++j) {
        this.graph.vertexGroup.children[count + j].position.set(
          this.graph.vertexGroup.children[count + j].position.x + Math.cos(phi(this.rate * t, i + 1)) / 5e2,
          this.graph.vertexGroup.children[count + j].position.y + Math.sin(phi(this.rate * t, i + 1)) / 5e2,
          0
        );
      }

      count += this.graph.partitionSizes[i];

    }

  }

}
