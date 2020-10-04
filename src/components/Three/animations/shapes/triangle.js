import * as THREE from 'three';

import Animation from '../animation';

export default class Triangle extends Animation {

	constructor (scene, camera, animation) {

	super(scene, camera, animation);

	}

	draw () {

		const geometry = new THREE.BufferGeometry();

		const vertices = new Float32Array([
		-0.5, -0.5, 0.0,
			0.5, -0.5, 0.0,
			0.0,  0.5, 0.0
		]);

		const colors = new Float32Array([
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
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

		const material = new THREE.LineBasicMaterial(
			{
				vertexColors: THREE.VertexColors
			}
		);

		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

	}

}
