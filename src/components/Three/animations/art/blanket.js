import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes

} from '../utils';

export const metadata = {
  active: false,
  address: '/three_conversion#art_blanket',
  category: 'art',
  controllable: false,
  dynamic: false,
  hidden: true,
  name: 'blanket',
  parameters: {
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 10,
      currentValue: 10,
      maxValue: 1000,
      minValue: 1
    },
    numFaces: {
      label: 'Number of Faces',
      defaultValue: 4,
      currentValue: 4,
      maxValue: 500,
      minValue: 3
    }
  },
  text: 'blanket'
}

export default class Blanket extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numFaces = parseFloat(this.parameters.numFaces.currentValue);

  }

  draw () {

    for (let i = 2 * this.numPolygons; i >= 1; i--) {

      const geometry = new THREE.CircleBufferGeometry((10 / (2 * this.numPolygons - i + 1)), this.numFaces);
      const material = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: false });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.rotateZ(Math.PI * i / 4);

      this.scene.add(mesh);

    }

  }

}
