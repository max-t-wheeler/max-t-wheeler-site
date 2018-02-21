import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Apollo6 extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    let x = [0, 0, 0];

    for (let i = 0; i < this.numPolygons; ++i) {

			x[0] = this.globalRadius * Math.sin(phi(i, this.numPolygons));
			x[1] = this.globalRadius * Math.cos(phi(i, this.numPolygons));

			let poly = new polygon(x, this.polygonRadius, this.numNodes, 0, colorNodes(3), 'relative');
			this.scene.add(poly.line);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotateZ(1e-2);
      } else {
				this.scene.children[i].rotateZ(-5e-3);
      }

    }

  }

}
