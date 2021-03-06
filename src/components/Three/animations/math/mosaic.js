import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#math_mosaic',
	category: 'math',
	controllable: true,
	dynamic: true,
	hidden: true,
	name: 'mosaic',
	parameters: {
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 8,
			currentValue: 8,
			maxValue: 1000,
			minValue: 3
		},
		numPolygons: {
			label: 'Number of Polygons',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 1000,
			minValue: 0
		},
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 8,
			currentValue: 8,
			maxValue: 100,
			minValue: 2
		},
		polygonRadius: {
			label: 'Polygon Radius',
			defaultValue: 3,
			currentValue: 3,
			maxValue: 50,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 50,
			minValue: 0
		}
	},
	text: 'mosaic'
}

export default class Mosaic extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

		for (let i = 0; i < this.numNodes; ++i) {

			const polyClusterCenter = [
				this.globalRadius * Math.cos(phi(i, this.numNodes)),
				this.globalRadius * Math.sin(phi(i, this.numNodes)),
				0
			];

			for (let j = 0; j < this.numNodes; ++j) {

				const polyCenterOffset = [
					this.polygonRadius * Math.cos(phi(j, this.numNodes)),
					this.polygonRadius * Math.sin(phi(j, this.numNodes)),
					0
				];

				for (let k = 0; k < this.numLayers; ++k) {

					for (let l = 0; l < this.numPolygons; ++l) {

						const polyCenter = [
							k * (polyClusterCenter[0] + polyCenterOffset[0]) * Math.sin(phi(l, this.numPolygons)),
							k * (polyClusterCenter[1] + polyCenterOffset[1]) * Math.cos(phi(l, this.numPolygons)),
							0
						];

					const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(i, 'cool'), 'relative');
					this.scene.add(poly.line);

					}

				}
			}

		}

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].position.set(0, Math.sin(t / 10) / this.polygonRadius, 0);
      } else {
				this.scene.children[i].position.set(0, -Math.sin(t / 10) / this.polygonRadius, 0);
      }

    }

  }

}
