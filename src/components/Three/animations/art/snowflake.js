import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes,
	phi,
	sacredGeometry

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#art_snowflake',
	category: 'art',
	controllable: true,
	dynamic: true,
	hidden: false,
	name: 'snowflake',
	parameters: {
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 12,
			minValue: 1
		},
		numLanes: {
			label: 'Number of Lanes',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 64,
			minValue: 8
		},
		numPolygons: {
			label: 'Number of Polygons',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 100,
			minValue: 3
		},
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 64,
			minValue: 2
		},
		polygonRadius: {
			label: 'Polygon Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 1000,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 1000,
			minValue: 0
		},
		rate: {
			label: 'Rate',
			defaultValue: 10,
			currentValue: 10,
			maxValue: 500,
			minValue: 0
		}
	},
	text: 'snowflake'
}

export default class Snowflake extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numLanes = parseFloat(this.parameters.numLanes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);
		this.rate = parseFloat(this.parameters.rate.currentValue);

		this.camera.position.set(0, 0, 10);

  }

  draw () {

    for (let i = 1; i <= this.numLayers; ++i) {

			const layerGroup = new THREE.Group();

			for (let j = 0; j < i * this.numLanes; ++j) {

				const polyCenter = [
						2 * i * this.globalRadius * Math.cos(phi(j, this.numLanes * i) + phi(1, 2 * this.numLanes)),
						2 * i * this.globalRadius * Math.sin(phi(j, this.numLanes * i) + phi(1, 2 * this.numLanes)),
						0
				];

				const geom = new sacredGeometry(polyCenter, this.numPolygons, this.numNodes, this.polygonRadius, this.globalRadius, colorNodes(3));

				layerGroup.add(geom.geomGroup);

			}

			this.scene.add(layerGroup);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

			for (let j = 0; j < this.scene.children[i].children.length; ++j) {

				if (j % 2 === 0) {
					this.scene.children[i].children[j].rotation.set(0, 0, this.rate * 1e-2 * t);
				} else {
					this.scene.children[i].children[j].rotation.set(0, 0, -this.rate * 1e-2 * t);
				}

			}

    }

  }

}
