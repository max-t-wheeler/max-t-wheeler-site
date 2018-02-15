import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes

} from '../../../utils';

export default class Gyr0scope extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

  }

  draw () {

		this.numCircles = parseFloat(this.parameters.numCircles.currentValue);

    for (let i = 0; i < this.numCircles; ++i) {

      let geometry = new THREE.CircleBufferGeometry(1 + (i / (10 * this.numCircles)), 10);
      let material = new THREE.MeshBasicMaterial({color: colorNodes(i), wireframe: true});
      let mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      let r = 1;

      if (i % 2 === 0) {

        this.scene.children[i].scale.set(1, r * Math.cos(t / 2), 2);
        this.scene.children[i].rotation.z -= 0.01 * Math.cos(t);

      } else {

        this.scene.children[i].scale.set(1, r * Math.sin(t / 2), 1);
        this.scene.children[i].rotation.z += 0.01 * Math.sin(t);

      }

    }

  }

}
