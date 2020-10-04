import * as THREE from 'three';

import Animation from '../animation';

export const metadata = {
	active: false,
	address: '/three#shapes_cube',
	category: 'shapes',
	controllable: true,
	dynamic: false,
	hidden: true,
	name: 'cube',
	parameters: [],
	text: 'cube'
}

export default class Cube extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

	}

	draw () {

		const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: false });
		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);

	}

}
