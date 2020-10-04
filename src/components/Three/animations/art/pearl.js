import * as THREE from 'three';

import Animation from '../animation';

export default class Pearl extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numRidges = parseFloat(this.parameters.numRidges.currentValue);
    this.radius = parseFloat(this.parameters.radius.currentValue);

	}

	draw () {

		const phi = [];

		for (let i = 0; i <= this.numRidges; ++i) {
			phi.push(2 * Math.PI * i / this.numRidges);
		}

		const vertices = new Float32Array(phi.length * 3);

		for (let i = 0; i < phi.length; ++i) {
			vertices[3 * i + 0] = this.radius * Math.sqrt(1 - Math.pow(Math.cos(phi[i]), 2)) * Math.cos(phi[i]);
			vertices[3 * i + 1] = this.radius * Math.sqrt(1 - Math.pow(Math.cos(phi[i]), 2)) * Math.sin(phi[i]);
			vertices[3 * i + 2] = 0;
		}

		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute(
			'position',
			new THREE.BufferAttribute(vertices, 3)
		);

		const material = new THREE.LineBasicMaterial(
			{
			color: 0x00ffff
			}
		);

		const line = new THREE.Line(geometry, material);

		this.scene.add(line);

		for (let i = 0; i < this.numRidges; ++i) {

			const endpoints = new Float32Array(6);

			endpoints[0] = 0;
			endpoints[1] = 0;
			endpoints[2] = 0;
			endpoints[3] = vertices[(3 * i) + 0];
			endpoints[4] = vertices[(3 * i) + 1];
			endpoints[5] = vertices[(3 * i) + 2];

			const geometry = new THREE.BufferGeometry();

			geometry.setAttribute(
				'position',
				new THREE.BufferAttribute(endpoints, 3)
			);

			const material = new THREE.LineBasicMaterial(
				{
					color: 0x00ffff
				}
			);

			const line = new THREE.Line(geometry, material);

			this.scene.add(line);

		}

		const pearlGeometry = new THREE.CircleBufferGeometry(this.radius / 10, 32);

		const pearlMaterial = new THREE.MeshBasicMaterial(
			{
				color: 0xffffff
			}
		);

		const pearl = new THREE.Mesh(pearlGeometry, pearlMaterial);

		this.scene.add(pearl);

	}

}
