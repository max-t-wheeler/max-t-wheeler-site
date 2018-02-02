import * as THREE from 'three';
import Animation from '../../animation';

import {

	phi

} from '../../../utils';

export default class Polygon extends Animation {

	constructor (scene, animation) {

		super(scene, animation);

	}

	draw (center, radius, numVertices, theta, color) {

	  this.center = center;
	  this.radius = radius;
	  this.numVertices = numVertices;
	  this.theta = theta;
	  this.color = color;

	  this.vertices = new Float32Array(numVertices * 3);

	  for (let i = 0; i < numVertices; ++i) {
	    this.vertices[3 * i + 0] = radius * Math.sin(phi(i, numVertices) + theta) + center[0];
	    this.vertices[3 * i + 1] = radius * Math.cos(phi(i, numVertices) + theta) + center[1];
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
