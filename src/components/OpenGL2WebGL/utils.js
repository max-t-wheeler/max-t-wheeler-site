import * as THREE from 'three';

/// //////////////////////////Styling//////////////////////////////////////

export function colorNodes (n, type) {

  let color = null;

  if (type === 'cool') {

    let mod = n % 4;

    switch (mod) {

      case 0:
        color = 0x5dff00;
        break;
      case 1:
        color = 0x1000ff;
        break;
      case 2:
        color = 0xff00e1;
        break;
      case 3:
        color = 0x009990;
        break;

    }

  } else if (type === 'hot') {

    let mod = n % 4;

    switch (mod) {

      case 0:
        color = 0xff0000;
        break;
      case 1:
        color = 0xff7200;
        break;
      case 2:
        color = 0xf2ff00;
        break;
      case 3:
        color = 0xffffff;
        break;

    }

  } else {

    let mod = n % 7;

    switch (mod) {

      case 0:
        color = 0xff0000;
        break;
      case 1:
        color = 0xff7200;
        break;
      case 2:
        color = 0xf2ff00;
        break;
      case 3:
        color = 0x5dff00;
        break;
      case 4:
        color = 0x1000ff;
        break;
      case 5:
        color = 0xff00e1;
        break;
      case 6:
        color = 0xffffff;
        break;

    }

  }

  return color;

}

/// //////////////////////////WebGL Helper export Functions//////////////////////////////////////

export function phi (t, n) {

  let p = 2 * Math.PI * t / n;

  return p;

}

export function polygon (center, radius, numVertices, theta, color, axis) {

  this.center = center;
  this.radius = radius;
  this.numVertices = numVertices;
  this.theta = theta;
  this.color = color;

  this.vertices = new Float32Array(this.numVertices * 3);

  for (let i = 0; i < this.numVertices; ++i) {

    this.vertices[3 * i + 0] = this.radius * Math.sin(phi(i, this.numVertices) + this.theta) + this.center[0];
    this.vertices[3 * i + 1] = this.radius * Math.cos(phi(i, this.numVertices) + this.theta) + this.center[1];
    this.vertices[3 * i + 2] = 0;

  }

  let geometry = new THREE.BufferGeometry();

  geometry.addAttribute(
    'position',
    new THREE.BufferAttribute(this.vertices, 3)
  );

  let material = new THREE.LineBasicMaterial(
    {
      color: this.color
    }
  );

  this.line = new THREE.LineLoop(geometry, material);

  if (axis === 'relative') {
    this.line.position.set(center[0], center[1], 0);
  }

}

export function offsetStar (numVertices, center, radius, theta, offset, color) {

  this.center = center;
  this.radius = radius;
  this.numVertices = numVertices;
  this.theta = theta;
  this.color = color;

  this.vertices = new Float32Array(numVertices * 3);

  for (let i = 0; i < numVertices; ++i) {

    this.vertices[3 * i + 0] = radius * Math.sin(phi((i * (1 + offset)) % numVertices, numVertices) + theta) + center[0];
    this.vertices[3 * i + 1] = radius * Math.cos(phi((i * (1 + offset)) % numVertices, numVertices) + theta) + center[1];
    this.vertices[3 * i + 2] = 0;

  }

  let geometry = new THREE.BufferGeometry();

  geometry.addAttribute(
    'position',
    new THREE.BufferAttribute(this.vertices, 3)
  );

  let material = new THREE.LineBasicMaterial(
    {
      color: this.color
    }
  );

  this.line = new THREE.LineLoop(geometry, material);

}
