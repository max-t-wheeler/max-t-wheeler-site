import Animation from '../animation';

import {

	polygon

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_concentric_polygons2',
  category: 'art',
  controllable: false,
  dynamic: true,
  hidden: false,
  name: 'concentric polygons 2',
  parameters: {
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 20,
      currentValue: 20,
      maxValue: 100,
      minValue: 1
    },
    radius: {
      label: 'Radius',
      defaultValue: 5,
      currentValue: 5,
      maxValue: 20,
      minValue: 1
    }
  },
  text: 'concentric polygons 2'
}

export default class ConcentricPolygons2 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.radius = parseFloat(this.parameters.radius.currentValue);

  }

  draw () {

    const x = [0, 0, 0];
    const t = 0;
    const col = 0xf00a00;

    for (let i = 1; i <= this.numPolygons; ++i) {

      const r = this.radius * i / this.numPolygons;
      const poly = new polygon(x, r, i + 2, t, col);

      this.scene.add(poly.line);

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
        this.scene.children[i].rotation.z = Math.sin(i) * t / 2;
			} else {
        this.scene.children[i].rotation.z = Math.sin(-i) * t / 2;
      }

    }

  }

}
