import Animation from '../animation';

import {

	colorNodes,
	offsetStar

} from '../utils';

export default class OffsetStar extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);
		this.offset = parseFloat(this.parameters.offset.currentValue);
		this.color = colorNodes(0);

	}

	draw () {

		const x = [0, 0, 0];
		const star = new offsetStar(this.numVertices, x, this.radius, 0, this.offset, this.color);

		this.scene.add(star.line);

	}

}