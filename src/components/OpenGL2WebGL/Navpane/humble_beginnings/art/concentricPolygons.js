import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes

} from '../../../utils';

export default class ConcentricPolygons extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numFaces = parseFloat(this.parameters.numFaces.currentValue);

  }

  draw () {

    for (let i = this.numPolygons; i >= 1; i--) {

      const geometry = new THREE.CircleBufferGeometry((10 / (this.numPolygons - i + 1)), this.numFaces);
      const material = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: false });
      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].rotation.z = 2 * (this.scene.children.length - i) * Math.sin(t / 4);
    }

  }

}
