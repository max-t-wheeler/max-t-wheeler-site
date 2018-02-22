import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Mosaic extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

		for (let i = 0; i < this.numNodes; ++i) {

			let polyClusterCenter = [
				this.globalRadius * Math.cos(phi(i, this.numNodes)),
				this.globalRadius * Math.sin(phi(i, this.numNodes))
			];

			for (let j = 0; j < this.numNodes; ++j) {

				let polyCenterOffset = [
					this.polygonRadius * Math.cos(phi(j, this.numNodes)),
					this.polygonRadius * Math.sin(phi(j, this.numNodes))
				];

				for (let k = 0; k < this.numLayers; ++k) {

			    for (let l = 0; l < this.numPolygons; ++l) {

						let polyCenter = [
							k * (polyClusterCenter[0] + polyCenterOffset[0]) * Math.sin(phi(l, this.numPolygons)),
							k * (polyClusterCenter[1] + polyCenterOffset[1]) * Math.cos(phi(l, this.numPolygons))
						];

			      let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(i, 'cool'), 'relative');
			      this.scene.add(poly.line);

			    }

				}
			}

		}

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].position.set(0, Math.sin(t / 10) / this.polygonRadius, 0);
				// this.scene.children[i].rotateZ(1e-3);
        // this.scene.children[i].rotation.z -= Math.sin(t/1000)/10;
        // this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 2)), 2 + (1.3 * Math.cos(t / 2)), 1);
      } else {
				this.scene.children[i].position.set(0, -Math.sin(t / 10) / this.polygonRadius, 0);
				// this.scene.children[i].rotateZ(-5e-4);
        // this.scene.children[i].rotation.z += Math.sin(t/1000)/5;
        // this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 2)), 2 + (1.3 * Math.cos(t / 2)), 1);
      }

    }

  }

}
