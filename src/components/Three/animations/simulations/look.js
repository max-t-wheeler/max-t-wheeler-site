import Animation from '../animation';

import {

  Graph

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#simulations_look',
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
}

export default class Look extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

    this.numPartitions = parseFloat(this.parameters.numPartitions.currentValue);
    this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
    this.graphRadius = parseFloat(this.parameters.graphRadius.currentValue);
    this.vertexRadius = parseFloat(this.parameters.vertexRadius.currentValue);
    this.dampening = parseFloat(this.parameters.dampening.currentValue);
    this.rate = parseFloat(this.parameters.rate.currentValue);

    this.camera.position.set(0, 0, 5);

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

  update () {

		for (let i = 0; i < this.graph.numVertices; ++i) {

      if (i % 4 === 0) {

        this.graph.vertexGroup.children[i].position.set(
          this.graph.vertexGroup.children[i].position.x * (1 + this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.x / 10) / 1e3),
          this.graph.vertexGroup.children[i].position.y * (1 + this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.y / 10) / 1e3),
          0
        );

      } else if (i % 4 === 1) {

        this.graph.vertexGroup.children[i].position.set(
          this.graph.vertexGroup.children[i].position.x * (1 - this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.x / 10) / 1e3),
          this.graph.vertexGroup.children[i].position.y * (1 + this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.y / 10) / 1e3),
          0
        );

      } else if (i % 4 === 2) {

        this.graph.vertexGroup.children[i].position.set(
          this.graph.vertexGroup.children[i].position.x * (1 + this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.x / 10) / 1e3),
          this.graph.vertexGroup.children[i].position.y * (1 - this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.y / 10) / 1e3),
          0
        );

      } else {

        this.graph.vertexGroup.children[i].position.set(
          this.graph.vertexGroup.children[i].position.x * (1 - this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.x / 10) / 1e3),
          this.graph.vertexGroup.children[i].position.y * (1 - this.rate * Math.sin(this.dampening * this.graph.vertexGroup.children[i].position.y / 10) / 1e3),
          0
        );

    }

		}

  }

}
