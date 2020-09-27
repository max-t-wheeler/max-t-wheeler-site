import * as THREE from 'three';

import Animation from '../../animation';

export default class Circle extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numSpokes = parseFloat(this.parameters.numSpokes.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

	}

	draw () {

		const geometry = new THREE.CircleBufferGeometry(this.radius, this.numSpokes);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

	}

}
