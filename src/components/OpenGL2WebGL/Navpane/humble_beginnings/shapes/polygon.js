import * as THREE from 'three';
import Animation from '../../animation';

import {

	phi

} from '../../../utils';

export default class Polygon extends Animation {

	constructor (scene, animation) {

		super(scene, animation);

	}

	draw () {

		this.center = [0, 0];
		this.radius = parseFloat(this.parameters.radius.currentValue);
		this.numVertices = parseFloat(this.parameters.numVertices.currentValue);
		this.theta = parseFloat(this.parameters.theta.currentValue);
		this.color = 0xf00a00;

	  this.vertices = new Float32Array(this.numVertices * 3);

	  for (let i = 0; i < this.numVertices; ++i) {
	    this.vertices[3 * i + 0] = this.radius * Math.sin(phi(i, this.numVertices) + this.theta) + this.center[0];
	    this.vertices[3 * i + 1] = this.radius * Math.cos(phi(i, this.numVertices) + this.theta) + this.center[1];
	    this.vertices[3 * i + 2] = 0;
	  }

	  let geometry = new THREE.BufferGeometry();

	  geometry.addAttribute(
	    'position',
	    new THREE.BufferAttribute(this.vertices, 3)
	  );

	  let material = new THREE.LineBasicMaterial(
	    {
	      color: this.color
	    }
	  );

	  this.line = new THREE.LineLoop(geometry, material);

		this.scene.add(this.line);
	}

	update (t) {

	  for (let i = 0; i < this.scene.children.length; ++i) {
	    this.scene.children[i].rotation.z += 1;
	  }

	}

}
