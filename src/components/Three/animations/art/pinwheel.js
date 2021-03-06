import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_pinwheel',
  category: 'art',
  controllable: false,
  dynamic: true,
  hidden: false,
  name: 'pinwheel',
  parameters: {
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 10,
      currentValue: 10,
      maxValue: 20,
      minValue: 1
    },
    numFaces: {
      label: 'Number of Faces',
      defaultValue: 4,
      currentValue: 4,
      maxValue: 32,
      minValue: 3
    }
  },
  text: 'pinwheel'
}

export default class Pinwheel extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numFaces = parseFloat(this.parameters.numFaces.currentValue);

  }

  draw () {

    for (let i = 2 * this.numPolygons; i >= 1; i--) {

      const geometry = new THREE.CircleBufferGeometry((20 / (2 * this.numPolygons - (i / 2) + 1)), this.numFaces);
      const material = new THREE.MeshBasicMaterial({ color: colorNodes(i + 1), wireframe: false });
      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].rotation.z = 2 * t * ((this.scene.children.length / 2) - i) * Math.PI * i / 160;
    }

  }

}
