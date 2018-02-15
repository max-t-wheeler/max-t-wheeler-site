import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class SacredCircles extends Animation {

	constructor (scene, animation) {
		super(scene, animation);
	}

	draw () {

		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);
		this.circleRadius = parseFloat(this.parameters.circleRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);
		this.color = colorNodes(0);

	  let center = [0, 0];

	  for (let i = 0; i < this.numCircles; ++i) {

	    for (let j = 0; j < this.numLayers; ++j) {

	      let x = center;

	      x[0] = this.globalRadius * (Math.cos(phi(i, this.numCircles)) + Math.sin(phi(j, this.numLayers)));
	      x[1] = this.globalRadius * (Math.sin(phi(i, this.numCircles)) + Math.cos(phi(j, this.numLayers)));

	      let poly = new polygon(x, this.circleRadius, 100, 0, this.color);

	      this.scene.add(poly.line);

	    }

	  }

	}

}
