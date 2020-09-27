import Animation from '../animation';

import {

  Graph

} from '../../utils';

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
