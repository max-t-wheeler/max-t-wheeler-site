import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#art_fauxlidoscope',
	cameraZoomMax: 100,
	cameraZoomMin: 1,
	category: 'art',
	controllable: false,
	dynamic: true,
	hidden: false,
	name: 'fauxlidoscope',
	parameters: {
		numSteps: {
			label: 'Number of Steps',
			defaultValue: 12,
			currentValue: 12,
			maxValue: 120,
			minValue: 1
		},
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 20,
			currentValue: 20,
			maxValue: 120,
			minValue: 2
		},
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 64,
			minValue: 3
		},
		numLanes: {
			label: 'Number of Lanes',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 60,
			minValue: 2
		},
		polygonRadius: {
			label: 'Polygon Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 64,
			minValue: 1
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 10,
			minValue: 0
		}
	},
	text: 'fauxlidoscope'
}

export default class Fauxlidoscope extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numSteps = parseFloat(this.parameters.numSteps.currentValue);
		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numLanes = parseFloat(this.parameters.numLanes.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

		this.cameraAmplitude = (animation.cameraZoomMax - animation.cameraZoomMin) / 2;
		this.cameraDisplacement = (animation.cameraZoomMax + animation.cameraZoomMin) / 2

  }

  draw () {

		const concentricPolygonGroup = new THREE.Group();

    for (let i = 0; i < this.numLayers; ++i) {

			const layerGroup = new THREE.Group();

			for (let j = 0; j < this.numLanes; ++j) {

				for (let k = 1; k <= this.numSteps; ++k) {

					const polyCenter = [
							this.numSteps * i * (this.globalRadius / k) * Math.cos(phi(j, this.numLanes)),
							this.numSteps * i * (this.globalRadius / k) * Math.sin(phi(j, this.numLanes)),
							0
					];

					const poly = new polygon(polyCenter, this.polygonRadius / k, this.numNodes, Math.PI / 2, colorNodes(3));

					layerGroup.add(poly.line);

				}

			}

			concentricPolygonGroup.add(layerGroup);

    }

		this.scene.add(concentricPolygonGroup);

  }

  update (t) {

    for (let i = 0; i < this.scene.children[0].children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[0].children[i].rotateZ(2e-3 * phi(1, this.numNodes) * (i - Math.sin(t)) / (i + 1));
      } else {
				this.scene.children[0].children[i].rotateZ(-2e-3 * phi(1, this.numNodes) * (i - Math.sin(t)) / (i + 1));
      }

    }

		this.camera.position.set(0, 0, this.cameraAmplitude * Math.sin(1e-1 * t + phi(3, 4)) + this.cameraDisplacement);

  }

}
