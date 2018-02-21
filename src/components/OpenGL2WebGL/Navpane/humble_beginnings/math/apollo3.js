import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Apollo3 extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    let x = [0, 0];

    for (let i = 0; i < 12; ++i) {

        for (let j = 0; j < i; ++j) {

					x[0] = this.globalRadius * Math.cos(phi(i, this.numNodes));
					x[1] = this.globalRadius * Math.sin(phi(i, this.numNodes));

          let poly = new polygon(x, this.polygonRadius, this.numNodes, 0, colorNodes(i * j));
          this.scene.add(poly.line);

      }

    }

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
