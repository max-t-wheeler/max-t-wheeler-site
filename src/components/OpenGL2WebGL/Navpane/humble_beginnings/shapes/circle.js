import * as THREE from 'three';

import Animation from '../../animation';

export default class Circle extends Animation {

	constructor (scene, animation) {

		super(scene, animation);

		this.numSpokes = parseFloat(this.parameters.numSpokes.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

	}

	draw () {

		  let geometry = new THREE.CircleBufferGeometry(this.radius, this.numSpokes);
		  let material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
		  let mesh = new THREE.Mesh(geometry, material);

		  this.scene.add(mesh);

	}

}
