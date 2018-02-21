import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class SloshRipple extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

  }

  draw () {

    let x = [0, 0];

    for (let i = 1; i <= this.numPolygons; ++i) {

      let r = this.radius * i / 10;
      let poly = new polygon(x, r, 100, 0, colorNodes(i - 1));

      this.scene.add(poly.line);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
			if (i % 2 === 0) {
				this.scene.children[i].scale.set(Math.cos(phi(i, 100) + t / 100), Math.cos(phi(i, 100) + t / 100), 1);
			} else {
				this.scene.children[i].scale.set(Math.sin(phi(i, 100) + t / 100), Math.sin(phi(i, 100) + t / 100), 1);
			}
    }

  }

}
