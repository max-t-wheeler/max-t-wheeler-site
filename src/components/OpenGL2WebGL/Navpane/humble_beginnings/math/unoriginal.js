import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes,
	phi

} from '../../../utils';

export default class Temp extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.nodeRadius = parseFloat(this.parameters.nodeRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);
		this.rate = parseFloat(this.parameters.rate.currentValue);
		this.divisor = parseFloat(this.parameters.divisor.currentValue);

  }

  draw () {

		let geometry = new THREE.CircleBufferGeometry(this.globalRadius, this.numNodes);
		let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
		let mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

		if (this.numNodes > 100) {
			mesh.visible = false;
		}

		for (let i = 0; i < this.numNodes; ++i) {

			let geometry = new THREE.CircleBufferGeometry(this.nodeRadius / 10, 32);
			let material = new THREE.MeshBasicMaterial({color: colorNodes(i), wireframe: false});
			let mesh = new THREE.Mesh(geometry, material);

			mesh.position.set(
				this.globalRadius * Math.cos(phi(i, this.numNodes)),
				this.globalRadius * Math.sin(phi(i, this.numNodes)),
				0
			);

			this.scene.add(mesh);

		}

  }

  update (t) {

		let n = this.numNodes / this.divisor;
		let rate = this.rate;

		for (let i = 0; i < this.numNodes; ++i) {

			if (Math.floor(rate * t) >= i % n) {

				this.scene.children[i + 1].position.set(
					this.globalRadius * Math.cos(phi(i, this.numNodes)) * (1 - 2 * Math.abs(Math.sin(t - ((i % n) / rate)))),
					this.globalRadius * Math.sin(phi(i, this.numNodes)) * (1 - 2 * Math.abs(Math.sin(t - ((i % n) / rate)))),
					0
				);

			}

		}

  }

}
