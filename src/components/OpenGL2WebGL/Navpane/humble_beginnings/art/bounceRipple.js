import Animation from '../../animation';

import {

	phi,
	polygon

} from '../../../utils';

export default class BounceRipple extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

  }

  draw () {

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

    let x = [0, 0];
    let col = 0xf00a00;

    for (let i = 1; i <= this.numPolygons; ++i) {

      let r = this.radius * i / 10;
      let poly = new polygon(x, r, 100, 0, col);

      this.scene.add(poly.line);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].scale.set(Math.cos(t) * Math.sin(phi(i, 100) + 2 * t), Math.cos(t) * Math.sin(phi(i, 100) + 2 * t), 1);
    }

  }

}
