import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_collide0scope',
  category: 'art',
  controllable: true,
  dynamic: true,
  hidden: true,
  name: 'collide',
  parameters: {
    numCircles: {
      label: 'Number of Circles',
      defaultValue: 20,
      currentValue: 20,
      maxValue: 100,
      minValue: 2
    }
  },
  text: 'collide0scope'
}

export default class Collide0scope extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numCircles; ++i) {

      const geometry = new THREE.CircleBufferGeometry(1 + (i / (10 * this.numCircles)), 10);
      const material = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {

        this.scene.children[i].position.z += (0.005 + (i / 1000)) * Math.cos(t);
        this.scene.children[i].rotation.z -= 0.01 * Math.cos(t);

      } else {

        this.scene.children[i].position.z -= (0.005 + (i / 1000)) * Math.cos(t);
        this.scene.children[i].rotation.z += 0.01 * Math.sin(t);

      }

    }

  }

}
