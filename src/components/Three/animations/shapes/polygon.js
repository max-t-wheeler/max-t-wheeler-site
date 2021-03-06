import * as THREE from 'three';
import Animation from '../animation';

import {

	phi

} from '../utils';

export const metadata = {
	active: false,
	address: '/three#polystarter',
	category: 'shapes',
	controllable: true,
	dynamic: true,
	hidden: true,
	name: 'polystarter',
	parameters: {
		radius: {
			label: 'Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 1000,
			minValue: 0
		},
		numVertices: {
			label: 'Number of Vertices',
			defaultValue: 6,
			currentValue: 6,
			maxValue: 1000,
			minValue: 0
		},
		theta: {
			label: 'Theta',
			defaultValue: 0,
			currentValue: 0,
			maxValue: 1000,
			minValue: 0
		}
	},
	text: 'polystarter'
}

export default class Polygon extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.center = [0, 0];
		this.radius = parseFloat(this.parameters.radius.currentValue);
		this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
		this.theta = parseFloat(this.parameters.theta.currentValue);
		this.color = 0xf00a00;

	}

	draw () {

		this.vertices = new Float32Array(this.numVertices * 3);

		for (let i = 0; i < this.numVertices; ++i) {
			this.vertices[3 * i + 0] = this.radius * Math.sin(phi(i, this.numVertices) + this.theta) + this.center[0];
			this.vertices[3 * i + 1] = this.radius * Math.cos(phi(i, this.numVertices) + this.theta) + this.center[1];
			this.vertices[3 * i + 2] = 0;
		}

		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute(
			'position',
			new THREE.BufferAttribute(this.vertices, 3)
		);

		const material = new THREE.LineBasicMaterial(
			{
				color: this.color
			}
		);

		this.line = new THREE.LineLoop(geometry, material);

		this.scene.add(this.line);
	}

	update () {

		for (let i = 0; i < this.scene.children.length; ++i) {
			this.scene.children[i].rotation.z += 1;
		}

	}

}
