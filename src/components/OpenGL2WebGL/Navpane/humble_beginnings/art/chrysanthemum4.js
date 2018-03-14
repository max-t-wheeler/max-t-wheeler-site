import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Chrysanthemum4 extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numNodes; ++i) {

      for (let j = 0; j < this.numNodes; ++j) {

				let polyClusterCenter = [
						this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes))),
						this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes))),
						0
				];

				for (let k = 0; k < this.numPolygons; ++k) {

					let polyCenter = [
						polyClusterCenter[0] * Math.sin(phi(k, this.numPolygons)),
						polyClusterCenter[1] * Math.cos(phi(k, this.numPolygons)),
						0
					];

						let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(3));
						this.scene.add(poly.line);

				}

			}

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotation.z -= 7.5e-4;
        this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 3)), 2 + (1.3 * Math.cos(t / 3)), 1);
      } else {
				this.scene.children[i].rotation.z += 7.5e-4;
        this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 3)), 2 + (1.3 * Math.cos(t / 3)), 1);
      }

    }

  }

}
