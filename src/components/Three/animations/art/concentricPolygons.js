import * as THREE from 'three';

import Animation from '../animation';

import {

	colorNodes

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_concentric_polygons',
  category: 'art',
  controllable: false,
  dynamic: true,
  hidden: false,
  name: 'concentric polygons',
  parameters: {
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 10,
      currentValue: 10,
      maxValue: 100,
      minValue: 3
    },
    numFaces: {
      label: 'Number of Faces',
      defaultValue: 4,
      currentValue: 4,
      maxValue: 48,
      minValue: 3
    }
  },
  text: 'concentric polygons'
}

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
