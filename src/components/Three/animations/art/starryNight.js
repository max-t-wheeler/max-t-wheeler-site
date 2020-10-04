import Animation from '../animation';

import {

	colorNodes,
	phi,
	Star

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#art_starry_night',
	category: 'art',
	controllable: true,
	dynamic: false,
	hidden: false,
	name: 'starry night',
	parameters: {
		numStars: {
			label: 'Number of Stars',
			defaultValue: 42,
			currentValue: 42,
			maxValue: 1000,
			minValue: 1
		},
		numStems: {
			label: 'Number of Stems',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 64,
			minValue: 2
		},
		numSplits: {
			label: 'Number of Splits',
			defaultValue: 8,
			currentValue: 8,
			maxValue: 8,
			minValue: 1
		},
		radius: {
			label: 'Radius',
			defaultValue: 42,
			currentValue: 42,
			maxValue: 1000,
			minValue: 1
		}
	},
	text: 'starry night'
}

export default class StarryNight extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numStars = parseFloat(this.parameters.numStars.currentValue);
		this.numStems = parseFloat(this.parameters.numStems.currentValue);
		this.numSplits = parseFloat(this.parameters.numSplits.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

  }

  draw () {

		for (let i = 0; i < this.numStars; ++i) {

			const starCenter = [
				(Math.random() * this.radius - this.radius) * Math.cos(phi(i, this.numStars)),
				(Math.random() * this.radius - this.radius) * Math.sin(phi(i, this.numStars)),
				(Math.random() * this.radius - this.radius)
			];

			const starRadius = Math.abs(Math.random() - 0.5);

			const star = new Star(starCenter, this.numStems, this.numSplits, starRadius, colorNodes(i, 'hot'));

			this.scene.add(star.stemGroup);
			this.scene.add(star.splitGroup);

		}

  }

}
