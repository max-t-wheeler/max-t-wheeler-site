import * as THREE from 'three';

import Animation from '../animation';

export const metadata = {
	active: false,
	address: '/three#shapes_circle',
	category: 'shapes',
	controllable: true,
	dynamic: false,
	hidden: true,
	name: 'circle',
	parameters: {
		numSpokes: {
			label: 'Number of Spokes',
			defaultValue: 5,
			currentValue: 5,
			maxValue: 1000,
			minValue: 0
		},
		radius: {
			label: 'Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 1000,
			minValue: 0
		}
	},
	text: 'circle'
}

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
