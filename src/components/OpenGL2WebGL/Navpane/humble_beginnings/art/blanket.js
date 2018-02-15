import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes

} from '../../../utils';

export default class Blanket extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

  }

  draw () {

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numFaces = parseFloat(this.parameters.numFaces.currentValue);

    for (let i = 2 * this.numPolygons; i >= 1; i--) {

      let geometry = new THREE.CircleBufferGeometry((10 / (2 * this.numPolygons - i + 1)), this.numFaces);
      let material = new THREE.MeshBasicMaterial({color: colorNodes(i), wireframe: false});
      let mesh = new THREE.Mesh(geometry, material);

      mesh.rotateZ(Math.PI * i / 4);

      this.scene.add(mesh);

    }

  }

}
