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

    this.vertices[3 * i] = this.radius * Math.sin(phi(i, this.numVertices) + this.theta) + this.center[0];
    this.vertices[3 * i + 1] = this.radius * Math.cos(phi(i, this.numVertices) + this.theta) + this.center[1];
    this.vertices[3 * i + 2] = this.center[2];

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
    this.line.position.set(this.center[0], this.center[1], this.center[2]);
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

    this.vertices[3 * i] = this.radius * Math.sin(phi((i * (1 + offset)) % numVertices, numVertices) + theta) + center[0];
    this.vertices[3 * i + 1] = this.radius * Math.cos(phi((i * (1 + offset)) % numVertices, numVertices) + theta) + center[1];
    this.vertices[3 * i + 2] = this.center[2];

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

export function Star (center, numStems, numSplits, radius, color) {

  this.center = center;
  this.numStems = numStems;
  this.numSplits = numSplits;
  this.radius = radius;
  this.color = color;

  this.stemGroup = new THREE.Group();
  this.splitGroup = new THREE.Group();

  for (let i = 0; i < this.numStems; ++i) {

    this.stemVertices = new Float32Array(2 * 3);

    this.stemVertices[0] = this.center[0];
    this.stemVertices[1] = this.center[1];
    this.stemVertices[2] = this.center[2];
    this.stemVertices[3] = this.radius * Math.sin(phi(i, this.numStems)) + this.center[0];
    this.stemVertices[4] = this.radius * Math.cos(phi(i, this.numStems)) + this.center[1];
    this.stemVertices[5] = this.center[2];

    let stemGeometry = new THREE.BufferGeometry();

    stemGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(this.stemVertices, 3)
    );

    let stemMaterial = new THREE.LineBasicMaterial(
      {
        color: this.color
      }
    );

    let line = new THREE.Line(stemGeometry, stemMaterial);

    this.stemGroup.add(line);

    for (let j = 0; j < this.numSplits; ++j) {

      this.splitVertices = new Float32Array(2 * 3);

      this.splitVertices[0] = this.radius * Math.sin(phi(i, this.numStems)) + this.center[0];
      this.splitVertices[1] = this.radius * Math.cos(phi(i, this.numStems)) + this.center[1];
      this.splitVertices[2] = this.center[2];
      this.splitVertices[3] = this.radius * Math.sin(phi(i, this.numStems) + (j + 2) * Math.PI / 4) / 2 + this.center[0];
      this.splitVertices[4] = this.radius * Math.cos(phi(i, this.numStems) + (j + 2) * Math.PI / 4) / 2 + this.center[1];
      this.splitVertices[5] = this.center[2];

      let splitGeometry = new THREE.BufferGeometry();

      splitGeometry.addAttribute(
        'position',
        new THREE.BufferAttribute(this.splitVertices, 3)
      );

      let splitMaterial = new THREE.LineBasicMaterial(
        {
          color: this.color
        }
      );

      let line = new THREE.Line(splitGeometry, splitMaterial);

      this.splitGroup.add(line);

    }

  }

}

export function Flower (rootPosition, pistolPosition, petalRadius, numPetals, numNodes, petalColor, pistolColor) {

  this.rootPosition = rootPosition;
  this.pistolPosition = pistolPosition;
  this.petalRadius = petalRadius;
  this.numPetals = numPetals;
  this.numNodes = numNodes;
  this.petalColor = petalColor;
  this.pistolColor = pistolColor;

  this.stemVertices = new Float32Array(2 * 3);

  this.stemVertices[0] = this.rootPosition[0];
  this.stemVertices[1] = this.rootPosition[1];
  this.stemVertices[2] = this.rootPosition[2];
  this.stemVertices[3] = this.pistolPosition[0];
  this.stemVertices[4] = this.pistolPosition[1];
  this.stemVertices[5] = this.pistolPosition[2];

  let stemGeometry = new THREE.BufferGeometry();

  stemGeometry.addAttribute(
    'position',
    new THREE.BufferAttribute(this.stemVertices, 3)
  );

  let stemMaterial = new THREE.LineBasicMaterial(
    {
      color: colorNodes(3)
    }
  );

  this.stem = new THREE.Line(stemGeometry, stemMaterial);

  this.petalGroup = new THREE.Group();

  for (let i = 0; i < this.numPetals; ++i) {

    let petalCenter = [
      this.petalRadius * Math.cos(phi(i, this.numPetals)) + this.pistolPosition[0],
      this.petalRadius * Math.sin(phi(i, this.numPetals)) + this.pistolPosition[1],
      this.pistolPosition[2]
    ];

    let petal = new polygon(petalCenter, this.petalRadius, this.numNodes, phi(i, this.numPetals), this.petalColor);

    this.petalGroup.add(petal.line);

  }

  let pistolGeometry = new THREE.CircleBufferGeometry(this.petalRadius / 3, 32);
  let pistolMaterial = new THREE.MeshBasicMaterial({color: this.pistolColor, wireframe: false});

  this.pistol = new THREE.Mesh(pistolGeometry, pistolMaterial);
  this.pistol.position.set(
    this.pistolPosition[0],
    this.pistolPosition[1],
    this.pistolPosition[2]
  );

}
