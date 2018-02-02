import * as THREE from 'three';

export default class HomeAnimation {

  constructor (scene) {
    this.scene = scene;
  }

  draw () {

    let geometry = new THREE.Geometry();

    for (let i = 0; i < 100; ++i) {

      let x = 5 * Math.random() - 5;
      let y = 5 * Math.random() - 5;
      let z = 5 * Math.random() - 5;

      geometry.vertices.push(new THREE.Vector3(x, y, z));

    }

    let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let mesh = new THREE.Line(geometry, material);

    this.scene.add(mesh);

	}

  update () {

  }

}
