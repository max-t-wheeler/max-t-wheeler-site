import Animation from '../../animation';

import {

	colorNodes,
	phi,
	Star

} from '../../../utils';

export default class StarryNight extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numStars = parseFloat(this.parameters.numStars.currentValue);
		this.numStems = parseFloat(this.parameters.numStems.currentValue);
		this.numSplits = parseFloat(this.parameters.numSplits.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

  }

  draw () {

		for (let i = 0; i < this.numStars; ++i) {

			let starCenter = [
				(Math.random() * this.radius - this.radius) * Math.cos(phi(i, this.numStars)),
				(Math.random() * this.radius - this.radius) * Math.sin(phi(i, this.numStars)),
				(Math.random() * this.radius - this.radius)
			];

			let starRadius = Math.abs(Math.random() - 0.5);

			let star = new Star(starCenter, this.numStems, this.numSplits, starRadius, colorNodes(i, 'hot'));

			this.scene.add(star.stemGroup);
			this.scene.add(star.splitGroup);

		}

  }

}
