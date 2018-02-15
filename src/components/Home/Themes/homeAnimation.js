import * as THREE from 'three';

export default class HomeAnimation {

  constructor (scene) {
    this.scene = scene;
  }

  draw () {

    let geometry = new THREE.Geometry();

    for (let i = 0; i < 100; ++i) {

      let r = 3 * Math.random() - 2;
      let theta = 2 * Math.PI * Math.random();
      let phi = Math.PI * Math.random();

      let x = r * Math.cos(theta) * Math.sin(phi);
      let y = r * Math.sin(theta) * Math.cos(phi);
      let z = r * Math.cos(theta);

      geometry.vertices.push(new THREE.Vector3(x, y, z));

    }

    let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let mesh = new THREE.Line(geometry, material);

    this.scene.add(mesh);

	}

  update () {

  }

}
