import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class WrigglingDonut extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

  }

  draw () {

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

    let x = [0, 0];

    for (let i = 1; i < this.numNodes; ++i) {

        for (let j = 0; j < this.numNodes; ++j) {

          x[0] = this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes)) * Math.sin(phi(i, this.numPolygons)));
          x[1] = this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes)) * Math.cos(phi(i, this.numPolygons)));

          let poly = new polygon(x, this.polygonRadius, this.numNodes, 0, colorNodes(1));
          this.scene.add(poly.line);

      }

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].rotation.z -= 10 * t;
    }

  }

}
