import Animation from '../animation';

import {

  phi,
  Graph

} from '../../utils';

export default class Triste extends Animation {

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

    let partitionSizes = [];

    for (let i = 0; i < this.numPartitions; ++i) {
      partitionSizes.push(Math.floor(this.numVertices / this.numPartitions));
    }

    let center = [
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
        this.graph.radius * Math.cos(phi(i, this.graph.numVertices)) - Math.sin(this.rate * (i % this.divisor) * t / 10),
        this.graph.radius * Math.sin(phi(i, this.graph.numVertices)) + Math.cos(this.rate * (i % this.divisor) * t / 10),
        0
      );

		}

  }

}