import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes,
	phi

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#math_unoriginal',
	category: 'math',
	controllable: true,
	dynamic: true,
	hidden: false,
	name: 'unoriginal',
	parameters: {
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 24,
			currentValue: 24,
			maxValue: 1000,
			minValue: 3
		},
		nodeRadius: {
			label: 'Node Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 10,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 2,
			currentValue: 2,
			maxValue: 10,
			minValue: 0
		},
		rate: {
			label: 'Rate',
			defaultValue: 4,
			currentValue: 4,
			maxValue: 1000,
			minValue: 0
		},
		divisor: {
			label: 'Divisor',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 100,
			minValue: 1
		}
	},
	text: 'unoriginal'
}

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

		const geometry = new THREE.CircleBufferGeometry(this.globalRadius, this.numNodes);
		const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

		if (this.numNodes > 100) {
			mesh.visible = false;
		}

		for (let i = 0; i < this.numNodes; ++i) {

			const geometry = new THREE.CircleBufferGeometry(this.nodeRadius / 10, 32);
			const material = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: false });
			const mesh = new THREE.Mesh(geometry, material);

			mesh.position.set(
				this.globalRadius * Math.cos(phi(i, this.numNodes)),
				this.globalRadius * Math.sin(phi(i, this.numNodes)),
				0
			);

			this.scene.add(mesh);

		}

  }

  update (t) {

		const n = this.numNodes / this.divisor;
		const rate = this.rate;

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
