import Animation from '../../animation';

import {

	phi,
	polygon

} from '../../../utils';

export default class BounceRipple extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

  }

  draw () {

    const x = [0, 0, 0];
    const col = 0xf00a00;

    for (let i = 1; i <= this.numPolygons; ++i) {

      const r = this.radius * i / 10;
      const poly = new polygon(x, r, 100, 0, col);

      this.scene.add(poly.line);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].scale.set(Math.cos(t) * Math.sin(phi(i, 100) + 2 * t), Math.cos(t) * Math.sin(phi(i, 100) + 2 * t), 1);
    }

  }

}
