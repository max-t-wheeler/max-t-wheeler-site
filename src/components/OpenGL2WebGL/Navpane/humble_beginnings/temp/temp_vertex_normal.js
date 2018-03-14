import * as THREE from 'three';

import Animation from '../../animation';

import {

	colorNodes,
	phi
	// polygon

} from '../../../utils';

export default class Temp extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.innerRadius = parseFloat(this.parameters.innerRadius.currentValue);
		this.outerRadius = parseFloat(this.parameters.outerRadius.currentValue);

  }

  draw () {

		for (let i = 0; i < this.numNodes; ++i) {

			for (let j = 0; j < this.numNodes; ++j) {

				let triangleVertices = new Float32Array(3 * 3);

				triangleVertices[0] = this.outerRadius * Math.sin(phi(i, this.numNodes));
				triangleVertices[1] = this.outerRadius * Math.cos(phi(i, this.numNodes));
				triangleVertices[2] = 0;
				triangleVertices[3] = this.innerRadius * Math.sin(phi(j % this.numNodes, this.numNodes));
				triangleVertices[4] = this.innerRadius * Math.cos(phi(j % this.numNodes, this.numNodes));
				triangleVertices[5] = 0;
				triangleVertices[6] = this.innerRadius * Math.sin(phi((j + 1) % this.numNodes, this.numNodes));
				triangleVertices[7] = this.innerRadius * Math.cos(phi((j + 1) % this.numNodes, this.numNodes));
				triangleVertices[8] = 0;

				let triangleGeometry = new THREE.BufferGeometry();

				triangleGeometry.addAttribute(
					'position',
					new THREE.BufferAttribute(triangleVertices, 3)
				);

				let triangleMaterial = new THREE.MeshBasicMaterial(
					{
						color: colorNodes(i * j),
						wireframe: true
					}
				);

				let mesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

				this.scene.add(mesh);

			}

		}

		// let center = [0, 0, 0];
		//
		// let outerPoly = new polygon(center, this.outerRadius, this.numNodes, 0, colorNodes(0));
    //
		// let innerPoly = new polygon(center, this.innerRadius, this.numNodes, 0, colorNodes(0));
    //
		// let connectorGroup = new THREE.Group();
    //
		// for (let i = 0; i < this.numNodes; ++i) {
    //
		// 	for (let j = 0; j < this.numNodes; ++j) {
    //
		// 		let connectorVertices = new Float32Array(2 * 3);
    //
		// 		connectorVertices[0] = innerPoly.line.geometry.attributes.position.array[3 * i];
		// 		connectorVertices[1] = innerPoly.line.geometry.attributes.position.array[3 * i + 1];
		// 		connectorVertices[2] = innerPoly.line.geometry.attributes.position.array[3 * i + 2];
		// 		connectorVertices[3] = outerPoly.line.geometry.attributes.position.array[3 * j];
		// 		connectorVertices[4] = outerPoly.line.geometry.attributes.position.array[3 * j + 1];
		// 		connectorVertices[5] = outerPoly.line.geometry.attributes.position.array[3 * j + 2];
    //
		// 		let connectorGeometry = new THREE.BufferGeometry();
    //
		// 		connectorGeometry.addAttribute(
		// 			'position',
		// 			new THREE.BufferAttribute(connectorVertices, 3)
		// 		);
    //
		// 		let connectorMaterial = new THREE.LineBasicMaterial(
		// 			{
		// 				color: colorNodes(0)
		// 			}
		// 		);
    //
		// 		let line = new THREE.Line(connectorGeometry, connectorMaterial);
    //
		// 		// line.geometry.attributes.position.needsUpdate = true;
    //
		// 		connectorGroup.add(line);
		// 	}
    //
		// }
    //
		// this.scene.add(outerPoly.line);
		// this.scene.add(innerPoly.line);
		// this.scene.add(connectorGroup);

		console.log(this.scene)
		// console.log(this.scene.children[2].children[0].geometry.attributes.position.array)
		// console.log(this.scene.children[1].geometry.attributes.position.array)

  }

  update (t) {

		// working solution
		// for (let i = this.scene.children.length - 1; i >= 0; i--) {
    //
		// 	this.scene.remove(this.scene.children[i]);
    //
		// }
    //
		// for (let i = 0; i < this.numNodes; ++i) {
    //
		// 	for (let j = 0; j < this.numNodes; ++j) {
    //
		// 		let triangleVertices = new Float32Array(3 * 3);
    //
		// 		triangleVertices[0] = this.outerRadius * Math.sin(phi(i, this.numNodes) + t / 4);
		// 		triangleVertices[1] = this.outerRadius * Math.cos(phi(i, this.numNodes) + t / 4);
		// 		triangleVertices[2] = 0;
		// 		triangleVertices[3] = this.innerRadius * Math.sin(phi(j % this.numNodes, this.numNodes) - t);
		// 		triangleVertices[4] = this.innerRadius * Math.cos(phi(j % this.numNodes, this.numNodes) - t);
		// 		triangleVertices[5] = 0;
		// 		triangleVertices[6] = this.innerRadius * Math.sin(phi((j + 1) % this.numNodes, this.numNodes) - t);
		// 		triangleVertices[7] = this.innerRadius * Math.cos(phi((j + 1) % this.numNodes, this.numNodes) - t);
		// 		triangleVertices[8] = 0;
    //
		// 		let triangleGeometry = new THREE.BufferGeometry();
    //
		// 		triangleGeometry.addAttribute(
		// 			'position',
		// 			new THREE.BufferAttribute(triangleVertices, 3)
		// 		);
    //
		// 		let triangleMaterial = new THREE.MeshBasicMaterial(
		// 			{
		// 				color: colorNodes(0),
		// 				wireframe: true
		// 			}
		// 		);
    //
		// 		let mesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
    //
		// 		this.scene.add(mesh);
    //
		// 	}
    //
		// }

		for (let i = 0; i < this.scene.children.length; ++i) {

			this.scene.children[i].matrix.set(
				2 + Math.sin(t), Math.cos(Math.sin(i) * t / 1), -Math.cos(Math.sin(i) * t / 2), 0,
				Math.sin(Math.sin(i) * t / 1), 2 + Math.sin(t), 0, 0,
				-Math.sin(Math.sin(i) * t / 2), 0, 2 + Math.sin(t), 0,
				0, 0, 0, 1
			);

			// this.scene.children[i].matrix.set(transformationMatrix);
			this.scene.children[i].matrixAutoUpdate = false;
			// this.scene.children[i].matrix.identity();
			// this.scene.children[i].rotation.set(2 + Math.sin(t), 2 + Math.cos(t), 1);
			// this.scene.children[i].scale.set(2 + Math.sin(t), 2 + Math.cos(t), 1);

		}

		// this.scene.children[0].rotation.set(0, 0, 1e-2 * t);
		// this.scene.children[0].geometry.applyMatrix(this.scene.children[0].matrix);
		// this.scene.children[0].matrix.identity();
		// console.log('raw')
		// console.log(this.scene.children[0].matrix)
		// this.scene.children[0].updateMatrix();
		// console.log('update')
		// console.log(this.scene.children[0].matrix)
		// this.scene.children[1].rotateZ(5e-2 * t);
		// this.scene.children[0].updateMatrix();
		// outerPoly.geometry.attributes.position.needsUpdate = true;
		// outerPoly.geometry.attributes.position.needsUpdate = true;
		// innerPoly.geometry.attributes.position.needsUpdate = true;
		// this.scene.children[0].geometry.attributes.position.needsUpdate = true;
		// this.scene.children[1].geometry.attributes.position.needsUpdate = true;

		// console.log(this.scene.children[0].geometry.attributes.position.array)
    //
    // for (let i = 0; i < this.numNodes; ++i) {
    //
		// 	for (let j = 0; j < this.numNodes; ++j) {
    //
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[0] = this.innerRadius * Math.cos(phi(i, this.numNodes) - 25e-2 * t);
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[1] = this.innerRadius * Math.sin(phi(i, this.numNodes) - 25e-2 * t);
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[2] = 0;
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[3] = this.outerRadius * Math.cos(phi(j, this.numNodes) - 5e-2 * t);
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[4] = this.outerRadius * Math.sin(phi(j, this.numNodes) - 5e-2 * t);
		// 		this.scene.children[2].children[i * this.numNodes + j].geometry.attributes.position.array[5] = 0;
    //
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		this.scene.children[2].children[i * this.numNodes + j].updateMatrix();
		// 		// for (let k = 0; k < 3; ++k) {
		// 		// 	// console.log(this.scene.children[2].children[i].geometry.attributes.position.array)
		// 		// 	this.scene.children[2].children[i].geometry.attributes.position.array[j] = this.scene.children[1].geometry.attributes.position.array[j];
		// 		// }
		// 		// for (let k = 3; k < 6; ++k) {
		// 		// 	this.scene.children[2].children[i].geometry.attributes.position.array[j] = this.scene.children[0].geometry.attributes.position.array[j];
		// 		// }
    //
		// 	}
		// 	// console.log(this.scene.children[2].chidlren[i])
		// 	// this.scene.children[i].position.set(0, Math.sin((i % (this.numLayers * this.numPolygons)) * t / 500), Math.cos((i % (this.numLayers * this.numPolygons)) * t / 500));
		// }

  }

}
