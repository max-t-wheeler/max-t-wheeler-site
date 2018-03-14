import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class SacredCircles extends Animation {

	constructor (scene, animation) {

		super(scene, animation);

		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);
		this.circleRadius = parseFloat(this.parameters.circleRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);
		this.color = colorNodes(0);

	}

	draw () {

	  let center = [0, 0, 0];

	  for (let i = 0; i < this.numCircles; ++i) {

	    for (let j = 0; j < this.numLayers; ++j) {

				center = [
	      	this.globalRadius * (Math.cos(phi(i, this.numCircles)) + Math.sin(phi(j, this.numLayers))),
	      	this.globalRadius * (Math.sin(phi(i, this.numCircles)) + Math.cos(phi(j, this.numLayers))),
					0
				];

	      let poly = new polygon(center, this.circleRadius, 100, 0, this.color);

	      this.scene.add(poly.line);

	    }

	  }

		this.scene.position.set(0, 0, -1);

	}

}
