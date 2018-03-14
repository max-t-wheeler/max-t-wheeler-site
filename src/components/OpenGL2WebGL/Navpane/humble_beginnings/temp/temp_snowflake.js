// import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Temp extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numPistols = parseFloat(this.parameters.numPistols.currentValue);
		this.numPetals = parseFloat(this.parameters.numPetals.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

		let center = [-0.1, 0.1, 0];

		for (let i = 0; i < this.numPistols; ++i) {

			for (let j = 0; j < this.numPetals; ++j) {

				let polyCenterOffset = [
						this.globalRadius * (Math.cos(phi(j, this.numPetals)) + 2 * Math.cos(phi(i, this.numPistols))),
						this.globalRadius * (Math.sin(phi(j, this.numPetals)) + 2 * Math.sin(phi(i, this.numPistols)))
				];

		    for (let l = 0; l < this.numPolygons; ++l) {

					let polyCenter = [
						center[0] * Math.sin(phi(l, this.numPolygons)) + polyCenterOffset[0],
						center[1] * Math.cos(phi(l, this.numPolygons)) + polyCenterOffset[1]
					];

		      let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(5), 'relative');

					this.scene.add(poly.line);

		    }

			}

		}

		console.log(this.scene)

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

			// this.scene.children[i].rotateZ(1e-1 * Math.pow(Math.sin(1e-1 * t), 2) * Math.sin(1e-1 * t));
			this.scene.children[i].rotateZ(1e-2);
			// this.scene.children[i].matrix.makeRotationZ(1);

			// if (i % 4 === 0) {
			// this.scene.children[i].scale.set(1 + 0.6 * Math.cos(t), 1 + 0.6 * Math.cos(t), 1);
			// } else if (i % 4 === 1) {
			// 	this.scene.children[i].scale.set(1 - 0.6 * Math.cos(t), 1 - 0.6 * Math.cos(t), 1);
			// } else if (i % 4 === 2) {
			// 	this.scene.children[i].scale.set(1 + 0.4 * Math.sin(t), 1 + 0.4 * Math.sin(t), 1);
			// } else {
			// 	this.scene.children[i].scale.set(1 - 0.4 * Math.sin(t), 1 - 0.4 * Math.sin(t), 1);
			// }
			// this.scene.children[i].scale.set(1 + 0.4 * Math.cos(4 * t) + 0.4 * Math.cos(2 * t), 1 + 0.4 * Math.cos(4 * t) + 0.4 * Math.cos(2 * t), 1);
			this.scene.children[i].scale.set(1 + 1e-2 * Math.cos(4 * t) * (Math.cos(2 * t) + Math.sin(4 * t)), 1 + 1e-2 * Math.cos(4 * t) * (Math.cos(2 * t) + Math.sin(4 * t)), 1);
			// this.scene.children[i].scale.set(1 + 0.4 * Math.cos(4 * t * t), 1 + 0.4 * Math.cos(4 * t), 1);
			// this.scene.children[i].position.set(0, Math.sin((i % (this.numLayers * this.numPolygons)) * t / 500), Math.cos((i % (this.numLayers * this.numPolygons)) * t / 500));

		}

  }

}
