import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes

} from '../../../utils';

export default class Gyr0scope extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);
		this.rate = parseFloat(this.parameters.rate.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numCircles; ++i) {

      const geometry = new THREE.CircleBufferGeometry(1 + (i / (10 * this.numCircles)), 10);
      const material = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

    }

		this.scene.position.set(0, 0, 1.5);

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      const r = 1;

			this.scene.children[i].scale.set(1, r * Math.cos(t / 2), i + 1);

      if (i % 2 === 0) {
        this.scene.children[i].rotation.z -= 1e-2 * this.rate * i * Math.cos(i * t);

      } else {
        this.scene.children[i].rotation.z += 1e-2 * this.rate * i * Math.sin(i * t);

      }

    }

  }

}
