import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export default class Mosaic2 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numLanes = parseFloat(this.parameters.numLanes.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

		const group1 = new THREE.Group();
		const group2 = new THREE.Group();

    for (let i = 1; i <= this.numLayers; ++i) {

			for (let j = 0; j < this.numLanes; ++j) {

				const polyCenter = [
						2 * i * this.globalRadius * Math.cos(phi(j, this.numLanes)),
						2 * i * this.globalRadius * Math.sin(phi(j, this.numLanes)),
						0
				];

				const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, Math.PI / 2, colorNodes(3), 'relative');

				group1.add(poly.line);

			}

    }

		for (let i = 1; i <= this.numLayers; ++i) {

			for (let j = 0; j < this.numLanes; ++j) {

				const polyCenter = [
						2 * i * this.globalRadius * Math.cos(phi(j, this.numLanes)),
						2 * i * this.globalRadius * Math.sin(phi(j, this.numLanes)),
						0
				];

				const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, Math.PI / 2, colorNodes(4));

				group2.add(poly.line);

			}

    }

		this.scene.add(group1);
		this.scene.add(group2);

  }

  update () {

    for (let i = 0; i < this.scene.children[0].children.length; ++i) {

      if (i % (2) === 0) {
				this.scene.children[0].children[i].rotateZ(1e-3);
      } else {
				this.scene.children[0].children[i].rotateZ(-1e-3);
      }

    }

		for (let i = 0; i < this.scene.children[1].children.length; ++i) {

			if (i % (2) === 0) {
				this.scene.children[1].children[i].rotateZ(-1e-3);
			} else {
				this.scene.children[1].children[i].rotateZ(-1e-3);
			}

		}

  }

}
