import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Chrysanthemum3 extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numPolygons; ++i) {

        for (let j = 0; j < i; ++j) {

					let polyCenter = [
							2 * Math.cos(phi(i, this.numPolygons)),
							2 * Math.sin(phi(i, this.numPolygons)),
							0
					];

          let poly = new polygon(polyCenter, 2, this.numNodes, 0, colorNodes(i * j));
          this.scene.add(poly.line);

      }

    }

		this.scene.position.set(0, 0, -2.5);

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotation.z -= 7.5e-4;
      } else {
				this.scene.children[i].rotation.z += 7.5e-4;
      }

    }

  }

}
