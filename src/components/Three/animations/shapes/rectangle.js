import * as THREE from 'three';

import Animation from '../animation';

export const metadata = {
	active: false,
	address: '/three#shapes_rectangle',
	category: 'shapes',
	controllable: true,
	dynamic: false,
	hidden: true,
	name: 'rectangle',
	parameters: [],
	text: 'rectangle'
}

export default class Rectangle extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

	}

	draw () {

		const geometry = new THREE.BufferGeometry();

		/* eslint-disable no-mixed-spaces-and-tabs */
		const vertices = new Float32Array([
			-0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0,
			 0.5,  0.5, 0.0,
			-0.5,  0.5, 0.0,
			-0.5, -0.5, 0.0,
			 0.5,  0.5, 0.0
		]);

		const colors = new Float32Array([
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0,
			0.0, 1.0, 1.0,
			1.0, 0.0, 0.0,
			0.0, 0.0, 1.0
		]);

		geometry.setAttribute(
			'position',
			new THREE.BufferAttribute(vertices, 3)
		);

		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(colors, 3)
		);

		const material = new THREE.MeshBasicMaterial(
			{
				vertexColors: THREE.VertexColors,
				wireframe: false
			}
		);

		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

	}

}
