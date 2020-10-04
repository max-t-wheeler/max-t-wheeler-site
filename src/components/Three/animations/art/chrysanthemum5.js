import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#art_chrysanthemum5',
	category: 'art',
	controllable: false,
	dynamic: true,
	hidden: true,
	name: 'chrysanthemum5',
	parameters: {
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 1000,
			minValue: 0
		},
		numPolygons: {
			label: 'Number of Polygons',
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
			defaultValue: 1,
			currentValue: 1,
			maxValue: 1000,
			minValue: 0
		}
	},
	text: 'chrysanthemum 5'
}

export default class Chrysanthemum5 extends Animation {

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

		this.scene.position.set(0, 0, -3);

  }

  update () {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotateX(1e-2);
      } else {
				this.scene.children[i].rotateZ(-1e-2);
      }

    }

  }

}
