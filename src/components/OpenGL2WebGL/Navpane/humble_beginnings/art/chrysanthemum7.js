import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Chrysanthemum7 extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numPolygons; ++i) {

			for (let j = 0; j < this.numPolygons; ++j) {

				let polyCenter = [
						this.globalRadius * (Math.sin(phi(i, this.numPolygons)) + Math.cos(phi(j, this.numNodes))),
						this.globalRadius * (Math.cos(phi(i, this.numPolygons)) + Math.sin(phi(j, this.numNodes))),
						0
				];

				let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(3), 'relative');
				this.scene.add(poly.line);

			}

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotateZ(1e-3);
        // this.scene.children[i].rotation.z -= Math.sin(t/1000)/10;
        // this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 2)), 2 + (1.3 * Math.cos(t / 2)), 1);
      } else {
				this.scene.children[i].rotateZ(-5e-4);
        // this.scene.children[i].rotation.z += Math.sin(t/1000)/5;
        // this.scene.children[i].scale.set(2 + (1.3 * Math.cos(t / 2)), 2 + (1.3 * Math.cos(t / 2)), 1);
      }

    }

  }

}
