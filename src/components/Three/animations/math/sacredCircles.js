import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#math_sacred_circles',
	category: 'math',
	controllable: true,
	dynamic: false,
	hidden: false,
	name: 'sacred circles',
	parameters: {
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 64,
			minValue: 3
		},
		numCircles: {
			label: 'Number of Circles',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 64,
			minValue: 1
		},
		circleRadius: {
			label: 'Circle Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 5,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 10,
			minValue: 0
		}
	},
	text: 'sacred circles'
}

export default class SacredCircles extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);
		this.circleRadius = parseFloat(this.parameters.circleRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);
		this.color = colorNodes(0);

		this.camera.position.set(0, 0, 4);

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

				const poly = new polygon(center, this.circleRadius, 100, 0, this.color);

				this.scene.add(poly.line);

			}

		}

	}

}
