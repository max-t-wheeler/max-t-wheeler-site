import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_chrysanthemum3',
  category: 'art',
  controllable: false,
  dynamic: true,
  hidden: true,
  name: 'chrysanthemum3',
  parameters: {
    numNodes: {
      label: 'Number of Nodes',
      defaultValue: 12,
      currentValue: 12,
      maxValue: 1000,
      minValue: 0
    },
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 12,
      currentValue: 12,
      maxValue: 1000,
      minValue: 0
    }
  },
  text: 'chrysanthemum 3'
}

export default class Chrysanthemum3 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numPolygons; ++i) {

        for (let j = 0; j < i; ++j) {

					const polyCenter = [
							2 * Math.cos(phi(i, this.numPolygons)),
							2 * Math.sin(phi(i, this.numPolygons)),
							0
					];

          const poly = new polygon(polyCenter, 2, this.numNodes, 0, colorNodes(i * j));
          this.scene.add(poly.line);

      }

    }

		this.scene.position.set(0, 0, -2.5);

  }

  update () {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
				this.scene.children[i].rotation.z -= 7.5e-4;
      } else {
				this.scene.children[i].rotation.z += 7.5e-4;
      }

    }

  }

}
