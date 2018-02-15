import * as THREE from 'three';

import Animation from '../../animation';

export default class SineWave extends Animation {

  constructor (scene, animation) {
    super(scene, animation);
  }

  render () {

    this.numPoints = this.parameters.numPoints.currentValue;

    let node_x = [];
    let node_y = [];

    for (let i = -this.numPoints; i <= this.numPoints; ++i) {
      node_x.push(i / 1000);
      node_y.push(Math.sin(10 * node_x[i + this.numPoints]) / 2);
    }

    let vertices = new Float32Array(node_x.length * 3);

    for (let i = 0; i < vertices.length; ++i) {
      if (i % 3 === 0) {
        vertices[i] = node_x[i];
      } else if (i % 3 === 1) {
        vertices[i] = node_y[i];
      } else if (i % 3 === 2) {
        vertices[i] = 0;
      }
    }

    for (let i = 0; i < node_x.length - 1; ++i) {
      let endpoints = new Float32Array(6);
      endpoints[0] = vertices[(3 * i) + 0];
      endpoints[1] = vertices[(3 * i) + 1];
      endpoints[2] = vertices[(3 * i) + 2];
      endpoints[3] = vertices[(3 * (i + 1)) + 0];
      endpoints[4] = vertices[(3 * (i + 1)) + 1];
      endpoints[5] = vertices[(3 * (i + 1)) + 2];

      let geometry = new THREE.BufferGeometry();

      geometry.addAttribute(
        'position',
        new THREE.BufferAttribute(endpoints, 3)
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

  draw () {

    this.numPoints = parseFloat(this.parameters.numPoints.currentValue);

    let node_x = [];
    let node_y = [];

    for (let i = -this.numPoints; i <= this.numPoints; ++i) {
      node_x.push(i / 1000);
      node_y.push(Math.sin(10 * node_x[i + this.numPoints]) / 2);
    }

    let vertices = new Float32Array(node_x.length * 3);

    for (let i = 0; i < vertices.length; ++i) {
      if (i % 3 === 0) {
        vertices[i] = node_x[i];
      } else if (i % 3 === 1) {
        vertices[i] = node_y[i];
      } else if (i % 3 === 2) {
        vertices[i] = 0;
      }
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
