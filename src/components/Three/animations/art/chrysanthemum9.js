import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#art_chrysanthemum9',
	category: 'art',
	controllable: true,
	dynamic: true,
	hidden: true,
	name: 'chrysanthemum9',
	parameters: {
		numCenters: {
			label: 'Number of Centers',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 1000,
			minValue: 0
		},
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 32,
			currentValue: 32,
			maxValue: 1000,
			minValue: 0
		},
		numPolygons: {
			label: 'Number of Polygons',
			defaultValue: 30,
			currentValue: 30,
			maxValue: 1000,
			minValue: 0
		},
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 1000,
			minValue: 0
		},
		polygonRadius: {
			label: 'Polygon Radius',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 1000,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 1000,
			minValue: 0
		}
	},
	text: 'chrysanthemum 9'
}

export default class Chrysanthemum9 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numCenters = parseFloat(this.parameters.numCenters.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

		this.camera.position.set(0, 0, 8);

  }

  draw () {

		const center = [-0.1, 0.1, 0];

		for (let i = 0; i < this.numCenters; ++i) {

			const polyCenterOffset = [
					this.globalRadius * Math.cos(phi(i, this.numCenters)),
					this.globalRadius * Math.sin(phi(i, this.numCenters)),
					0
			];

			for (let j = 0; j < this.numLayers; ++j) {

				const polyClusterCenter = [
					j * center[0],
					j * center[1]
				];

				for (let k = 0; k < this.numPolygons; ++k) {

					const polyCenter = [
						polyClusterCenter[0] * Math.sin(phi(k, this.numPolygons)) + polyCenterOffset[0],
						polyClusterCenter[1] * Math.cos(phi(k, this.numPolygons)) + polyCenterOffset[1],
						0
					];

					const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(j));

					this.scene.add(poly.line);

				}

			}

		}

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

			this.scene.children[i].position.set(0, 0, 1 + Math.sin((i % (this.numCenters * this.numPolygons)) * t / 75));

		}

  }

}
