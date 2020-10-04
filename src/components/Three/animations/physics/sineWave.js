import * as THREE from 'three';

import Animation from '../animation';

export const metadata = {
  active: false,
  address: '/three#physics_sine_wave',
  category: 'physics',
  controllable: true,
  dynamic: false,
  hidden: true,
  name: 'sine wave',
  parameters: {
    amplitude: {
      label: 'Amplitude',
      defaultValue: 0.5,
      currentValue: 0.5,
      maxValue: 1000,
      minValue: 0
    },
    frequency: {
      label: 'Frequency',
      defaultValue: 10,
      currentValue: 10,
      maxValue: 1000,
      minValue: 0
    },
    phase: {
      label: 'Phase',
      defaultValue: 0,
      currentValue: 0,
      maxValue: 1000,
      minValue: 0
    },
    displacement: {
      label: 'Displacement',
      defaultValue: 0,
      currentValue: 0,
      maxValue: 1000,
      minValue: 0
    },
    numPoints: {
      label: 'Number of Points',
      defaultValue: 1500,
      currentValue: 1500,
      maxValue: 1000,
      minValue: 0
    }
  },
  text: 'sine wave'
}

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

    const node_x = [];
    const node_y = [];

    for (let i = -this.numPoints; i <= this.numPoints; ++i) {
      node_x.push(i / 1000);
      node_y.push(this.amplitude * Math.sin(this.frequency * node_x[i + this.numPoints] + this.phase) + this.displacement);

    }

    const vertices = new Float32Array(node_x.length * 3);

    for (let i = 0; i < node_x.length; ++i) {
      vertices[3 * i + 0] = node_x[i];
      vertices[3 * i + 1] = node_y[i];
      vertices[3 * i + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    );

    const material = new THREE.LineBasicMaterial(
      {
        color: 0x00ffff
      }
    );

    const line = new THREE.Line(geometry, material);

    this.scene.add(line);

  }
}
