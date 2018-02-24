import * as THREE from 'three';

import Animation from '../../animation';

export default class Pearl extends Animation {

	constructor (scene, animation) {

		super(scene, animation);

		this.numRidges = parseFloat(this.parameters.numRidges.currentValue);
    this.radius = parseFloat(this.parameters.radius.currentValue);

	}

	draw () {

	  let phi = [];

	  for (let i = 0; i <= this.numRidges; ++i) {
	    phi.push(2 * Math.PI * i / this.numRidges);
	  }

	  let vertices = new Float32Array(phi.length * 3);

		for (let i = 0; i < phi.length; ++i) {
      vertices[3 * i + 0] = this.radius * Math.sqrt(1 - Math.pow(Math.cos(phi[i]), 2)) * Math.cos(phi[i]);
      vertices[3 * i + 1] = this.radius * Math.sqrt(1 - Math.pow(Math.cos(phi[i]), 2)) * Math.sin(phi[i]);
      vertices[3 * i + 2] = 0;
    }

	  let geometry = new THREE.BufferGeometry();

	  geometry.addAttribute(
	    'position',
	    new THREE.BufferAttribute(vertices, 3)
	  );

	  let material = new THREE.LineBasicMaterial(
	    {
	      color: 0x00ffff
	    }
	  );

	  let line = new THREE.Line(geometry, material);

	  this.scene.add(line);

	  for (let i = 0; i < this.numRidges; ++i) {

	    let endpoints = new Float32Array(6);

	    endpoints[0] = 0;
	    endpoints[1] = 0;
	    endpoints[2] = 0;
	    endpoints[3] = vertices[(3 * i) + 0];
	    endpoints[4] = vertices[(3 * i) + 1];
	    endpoints[5] = vertices[(3 * i) + 2];

	    let geometry = new THREE.BufferGeometry();

	    geometry.addAttribute(
	      'position',
	      new THREE.BufferAttribute(endpoints, 3)
	    );

	    let material = new THREE.LineBasicMaterial(
	      {
	        color: 0x00ffff
	      }
	    );

	    let line = new THREE.Line(geometry, material);

	    this.scene.add(line);

	  }

	  let pearlGeometry = new THREE.CircleBufferGeometry(this.radius / 10, 32);

	  let pearlMaterial = new THREE.MeshBasicMaterial(
	    {
	      color: 0xffffff
	    }
	  );

	  let pearl = new THREE.Mesh(pearlGeometry, pearlMaterial);

	  this.scene.add(pearl);

	}

}