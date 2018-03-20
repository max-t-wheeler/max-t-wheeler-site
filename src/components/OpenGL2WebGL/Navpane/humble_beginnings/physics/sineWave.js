import * as THREE from 'three';

import Animation from '../../animation';

export default class SineWave extends Animation {

  constructor (scene, camera, animation) {

		super(scene, camera, animation);

    this.amplitude = parseFloat(this.parameters.amplitude.currentValue);
    this.frequency = parseFloat(this.parameters.frequency.currentValue);
    this.phase = parseFloat(this.parameters.phase.currentValue);
    this.displacement = parseFloat(this.parameters.displacement.currentValue);
    this.numPoints = parseFloat(this.parameters.numPoints.currentValue);

  }

  draw () {

    let node_x = [];
    let node_y = [];

    for (let i = -this.numPoints; i <= this.numPoints; ++i) {
      node_x.push(i / 1000);
      node_y.push(this.amplitude * Math.sin(this.frequency * node_x[i + this.numPoints] + this.phase) + this.displacement);

    }

    let vertices = new Float32Array(node_x.length * 3);

    for (let i = 0; i < node_x.length; ++i) {
      vertices[3 * i + 0] = node_x[i];
      vertices[3 * i + 1] = node_y[i];
      vertices[3 * i + 2] = 0;
    }

    let geometry = new THREE.BufferGeometry();

    geometry.addAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    );

    let material = new THREE.LineBasicMaterial(
      {
        color: 0x00ffff
      }
    );

    let line = new THREE.Line(geometry, material);

    this.scene.add(line);

  }
}
