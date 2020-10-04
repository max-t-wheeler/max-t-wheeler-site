import Animation from '../animation';

import {

	colorNodes,
	offsetStar

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#math_star',
	category: 'math',
	controllable: true,
	dynamic: false,
	hidden: true,
	name: 'star',
	parameters: {
		numVertices: {
			label: 'Number of Vertices',
			defaultValue: 10,
			currentValue: 10,
			maxValue: 1000,
			minValue: 0
		},
		radius: {
			label: 'Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 1000,
			minValue: 0
		},
		offset: {
			label: 'Offset',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 1000,
			minValue: 0
		}
	},
	text: 'star'
}

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
