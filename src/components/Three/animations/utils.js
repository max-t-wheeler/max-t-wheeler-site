import * as THREE from 'three';

/// //////////////////////////Styling//////////////////////////////////////

export function colorNodes (n, type) {

  let color = null;

  if (type === 'cool') {

    const mod = n % 4;

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

    const mod = n % 4;

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

    const mod = n % 7;

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

  const p = 2 * Math.PI * t / n;

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

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(this.vertices, 3)
  );

  const material = new THREE.LineBasicMaterial(
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

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(this.vertices, 3)
  );

  const material = new THREE.LineBasicMaterial(
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

    const stemGeometry = new THREE.BufferGeometry();

    stemGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.stemVertices, 3)
    );

    const stemMaterial = new THREE.LineBasicMaterial(
      {
        color: this.color
      }
    );

    const line = new THREE.Line(stemGeometry, stemMaterial);

    this.stemGroup.add(line);

    for (let j = 0; j < this.numSplits; ++j) {

      this.splitVertices = new Float32Array(2 * 3);

      this.splitVertices[0] = this.radius * Math.sin(phi(i, this.numStems)) + this.center[0];
      this.splitVertices[1] = this.radius * Math.cos(phi(i, this.numStems)) + this.center[1];
      this.splitVertices[2] = this.center[2];
      this.splitVertices[3] = this.radius * Math.sin(phi(i, this.numStems) + (j + 2) * Math.PI / 4) / 2 + this.center[0];
      this.splitVertices[4] = this.radius * Math.cos(phi(i, this.numStems) + (j + 2) * Math.PI / 4) / 2 + this.center[1];
      this.splitVertices[5] = this.center[2];

      const splitGeometry = new THREE.BufferGeometry();

      splitGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(this.splitVertices, 3)
      );

      const splitMaterial = new THREE.LineBasicMaterial(
        {
          color: this.color
        }
      );

      const line = new THREE.Line(splitGeometry, splitMaterial);

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

  const stemGeometry = new THREE.BufferGeometry();

  stemGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(this.stemVertices, 3)
  );

  const stemMaterial = new THREE.LineBasicMaterial(
    {
      color: colorNodes(3)
    }
  );

  this.stem = new THREE.Line(stemGeometry, stemMaterial);

  this.petalGroup = new THREE.Group();

  for (let i = 0; i < this.numPetals; ++i) {

    const petalCenter = [
      this.petalRadius * Math.cos(phi(i, this.numPetals)) + this.pistolPosition[0],
      this.petalRadius * Math.sin(phi(i, this.numPetals)) + this.pistolPosition[1],
      this.pistolPosition[2]
    ];

    const petal = new polygon(petalCenter, this.petalRadius, this.numNodes, phi(i, this.numPetals), this.petalColor);

    this.petalGroup.add(petal.line);

  }

  const pistolGeometry = new THREE.CircleBufferGeometry(this.petalRadius / 3, 32);
  const pistolMaterial = new THREE.MeshBasicMaterial({ color: this.pistolColor, wireframe: false });

  this.pistol = new THREE.Mesh(pistolGeometry, pistolMaterial);
  this.pistol.position.set(
    this.pistolPosition[0],
    this.pistolPosition[1],
    this.pistolPosition[2]
  );

}

export function sacredGeometry (center, numPolygons, numNodes, polygonRadius, globalRadius, color) {

  this.center = center;
  this.numPolygons = numPolygons;
  this.numNodes = numNodes;
  this.polygonRadius = polygonRadius;
  this.globalRadius = globalRadius;
  this.color = color;

  this.geomGroup = new THREE.Group();

  for (let i = 0; i < this.numPolygons; ++i) {

    const polyCenter = [
      this.globalRadius * Math.cos(phi(i, this.numPolygons)) + this.center[0],
      this.globalRadius * Math.sin(phi(i, this.numPolygons)) + this.center[1],
      this.center[2]
    ];

    const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, phi(i, this.numNodes), this.color);

    this.geomGroup.add(poly.line);

  }

}

export class Graph {

  constructor (partitionSizes, center, radius, vertexRadius, type) {

    this.partitionSizes = partitionSizes;
    this.center = center;
    this.radius = radius;
    this.vertexRadius = vertexRadius;
    this.type = type;
    this.numVertices = 0;
    this.numEdges = 0;
    this.vertexGroup = new THREE.Group();
    this.edgeGroup = new THREE.Group();

  }

  createVertexSet (color) {

    for (let i = 0; i < this.partitionSizes.length; ++i) {
      this.numVertices = this.numVertices + this.partitionSizes[i];
    }

    const vertexCenter = [0, 0, 0];

    if (color === 'sequence') {

      for (let i = 0; i < this.numVertices; ++i) {

        if (this.type === 'ball') {

          const vertexGeometry = new THREE.CircleBufferGeometry(this.vertexRadius, 32);
          const vertexMaterial = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: false });
          const vertex = new THREE.Mesh(vertexGeometry, vertexMaterial);

          this.vertexGroup.add(vertex);

        } else if (this.type === 'point') {

          const vertex = new polygon(vertexCenter, this.vertexRadius, 100, phi(i, 100), colorNodes(i));

          this.vertexGroup.add(vertex.line);

        }

      }

    } else if (color === 'partite') {

      for (let i = 0; i < this.partitionSizes.length; ++i) {

        for (let j = 0; j < this.partitionSizes[i]; ++j) {

          if (this.type === 'ball') {

            const vertexGeometry = new THREE.CircleBufferGeometry(this.vertexRadius / this.numVertices, 32);
            const vertexMaterial = new THREE.MeshBasicMaterial({ color: colorNodes(i), wireframe: false });
            const vertex = new THREE.Mesh(vertexGeometry, vertexMaterial);

            this.vertexGroup.add(vertex);

          } else if (this.type === 'point') {

            const vertex = new polygon(vertexCenter, this.vertexRadius, 100, phi(i, 100), colorNodes(i));

            this.vertexGroup.add(vertex.line);

          }

        }

      }

    }

  }

  // assign coords to vertices in graph
  assignVertexCoordinates (layout, angle = 0) {

     if (layout === 'polar') {

         const n = this.numVertices;

         for (let i = 0; i < n; ++i) {

           this.vertexGroup.children[i].position.set(
             this.center[0] + this.radius * Math.cos(phi(i, n) + angle),
             this.center[1] + this.radius * Math.sin(phi(i, n) + angle),
             0
           );

         }

     } else if (layout === 'partite') {

         let count = 0;
         const numSides = this.partitionSizes.length;

         if (numSides === 1) {

           const sideScale = (2 * this.radius / (this.partitionSizes[0] + 1));

           if (this.partitionSizes[0] % 2 === 1) {

               for (let j = 0; j < this.partitionSizes[0]; ++j) {

                 const sideSpacing = j - Math.floor(this.partitionSizes[0] / 2)

                 this.vertexGroup.children[j].position.set(
                   this.center[0] + sideScale * sideSpacing * Math.sin(-angle),
                   this.center[1] + sideScale * sideSpacing * Math.cos(-angle),
                   0
                 );

               }

           } else {

               for (let j = 0; j < this.partitionSizes[0]; ++j) {

                 const sideSpacing = (j + ((1 - this.partitionSizes[0]) / 2));

                 this.vertexGroup.children[j].position.set(
                   this.center[0] + sideScale * sideSpacing * Math.sin(-angle),
                   this.center[1] + sideScale * sideSpacing * Math.cos(-angle),
                   0
                 );

               }

           }

         } else {

           for (let i = 0; i < numSides; ++i) {

               const sideAngle = phi(i, numSides) + angle;
               const sideScale = (2 * this.radius * Math.sin(Math.PI / numSides) / (this.partitionSizes[i] + 1));

               if (this.partitionSizes[i] % 2 === 1) {

                   for (let j = 0; j < this.partitionSizes[i]; ++j) {

                     const sideSpacing = j - Math.floor(this.partitionSizes[i] / 2)

                     this.vertexGroup.children[count + j].position.set(
                       this.center[0] + this.radius * Math.cos(sideAngle) + sideScale * sideSpacing * Math.sin(-sideAngle),
                       this.center[1] + this.radius * Math.sin(sideAngle) + sideScale * sideSpacing * Math.cos(-sideAngle),
                       0
                     );

                   }

               } else {

                   for (let j = 0; j < this.partitionSizes[i]; ++j) {

                     const sideSpacing = (j + ((1 - this.partitionSizes[i]) / 2));

                     this.vertexGroup.children[count + j].position.set(
                       this.center[0] + this.radius * Math.cos(sideAngle) + sideScale * sideSpacing * Math.sin(-sideAngle),
                       this.center[1] + this.radius * Math.sin(sideAngle) + sideScale * sideSpacing * Math.cos(-sideAngle),
                       0
                     );

                   }

               }

               count += this.partitionSizes[i];

           }

         }

     } else if (layout === 'concentric') {

         let count = 0;

         for (let i = 0; i < this.partitionSizes.length; ++i) {

             for (let j = 0; j < this.partitionSizes[i]; ++j) {

                 if (this.partitionSizes[i] !== 1) {

                   this.vertexGroup.children[count + j].position.set(
                     this.center[0] + this.radius * (this.radius + i) * Math.cos(phi(j, this.partitionSizes[i]) + angle) / this.partitionSizes.length,
                     this.center[1] + this.radius * (this.radius + i) * Math.sin(phi(j, this.partitionSizes[i]) + angle) / this.partitionSizes.length,
                     0
                   );

                 }

             }

             count += this.partitionSizes[i];

         }

     } else if (layout === 'grid') {

         let count = 0;
         const numLevels = this.partitionSizes.length;

         for (let i = 0; i < numLevels; ++i) {

             const levelScale = (2 * this.radius * Math.sin(Math.PI / numLevels) / (this.partitionSizes[i] + 1));
             const interLevelSpacing = (i - Math.floor(numLevels / 2)) / numLevels;

             if (this.partitionSizes[i] % 2 === 1) {

                 for (let j = 0; j < this.partitionSizes[i]; ++j) {

                   const intraLevelSpacing = j - Math.floor(this.partitionSizes[i] / 2)

                   this.vertexGroup.children[count + j].position.set(
                     levelScale * intraLevelSpacing,
                     interLevelSpacing,
                     0
                   );

                 }

             } else {

                 for (let j = 0; j < this.partitionSizes[i]; ++j) {

                     const intraLevelSpacing = (j + ((1 - this.partitionSizes[i]) / 2));

                     this.vertexGroup.children[count + j].position.set(
                       levelScale * intraLevelSpacing,
                       interLevelSpacing,
                       0
                     );

                 }

             }

             count += this.partitionSizes[i];

         }

     }

  }

  addEdges (type) {

    const n = this.numVertices;

     if (type === 'complete') {

         for (let i = 0; i < n - 1; ++i) {

           for (let j = i + 1; j < n; ++j) {

             const edgeGeometry = new THREE.Geometry();

             const edgeMaterial = new THREE.LineBasicMaterial(
              {
                color: 0xffffff
              }
             );

             edgeGeometry.vertices.push(
               this.vertexGroup.children[i].position,
               this.vertexGroup.children[j].position
             );

             const edge = new THREE.Line(edgeGeometry, edgeMaterial);

             this.edgeGroup.add(edge);

           }

         }

     } else if (type === 'cycle') {

       for (let i = 0; i < n; ++i) {

         const edgeGeometry = new THREE.Geometry();

         const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff
          });

          if (i < n - 1) {
            edgeGeometry.vertices.push(
              this.vertexGroup.children[i].position,
              this.vertexGroup.children[i + 1].position
            );
          } else {
            edgeGeometry.vertices.push(
              this.vertexGroup.children[i].position,
              this.vertexGroup.children[0].position
            );
          }

         const edge = new THREE.Line(edgeGeometry, edgeMaterial);

         this.edgeGroup.add(edge);

       }

     } else if (type === 'path') {

       for (let i = 0; i < n - 1; ++i) {

         const edgeGeometry = new THREE.Geometry();

         const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff
          });

         edgeGeometry.vertices.push(
           this.vertexGroup.children[i].position,
           this.vertexGroup.children[i + 1].position
         );

         const edge = new THREE.Line(edgeGeometry, edgeMaterial);

         this.edgeGroup.add(edge);

       }

     } else if (type === 'wheel') {

       for (let i = 1; i < n; ++i) {

         const edgeGeometry = new THREE.Geometry();

         const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff
          });

         edgeGeometry.vertices.push(
           this.vertexGroup.children[0].position,
           this.vertexGroup.children[i].position
         );

         const edge = new THREE.Line(edgeGeometry, edgeMaterial);

         this.edgeGroup.add(edge);

       }

     }

     this.numEdges = this.edgeGroup.length;

  }

  initialize (type = 'null', layout = 'polar', angle = 0, color = 'partite') {
    this.createVertexSet(color);
    this.assignVertexCoordinates(layout, angle);
    this.addEdges(type);
  }

}
