import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export default class Chrysanthemum6 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numPolygons; ++i) {

			const polyCenter = [
					this.globalRadius * Math.cos(phi(i, this.numPolygons)),
					this.globalRadius * Math.sin(phi(i, this.numPolygons)),
					0
			];

			const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(3), 'relative');
			this.scene.add(poly.line);

    }

  }

  update () {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotateZ(1e-2);
      } else {
				this.scene.children[i].rotateZ(-5e-3);
      }

    }

  }

}
