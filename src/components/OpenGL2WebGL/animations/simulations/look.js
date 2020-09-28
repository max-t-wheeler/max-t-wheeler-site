import Animation from '../animation';

import {

  Graph

} from '../utils';

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
