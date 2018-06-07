import Animation from '../animation';

import {

  phi,
  Graph,
  AssignVertexCoordinates

} from '../../utils';

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

    let partitionSizes = [];

    for (let i = 0; i < this.numPartitions; ++i) {
      partitionSizes.push(Math.floor(this.numVertices / this.numPartitions));
    }

    let center = [
      0,
      0,
      0
    ]

		this.graph = new Graph(partitionSizes, center, this.graphRadius, this.vertexRadius, 'ball', 'partite');

    AssignVertexCoordinates(this.graph, 'concentric');

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
