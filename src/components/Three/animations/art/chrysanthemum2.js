import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_chrysanthemum2',
  category: 'art',
  controllable: true,
  dynamic: true,
  hidden: true,
  name: 'chrysanthemum2',
  parameters: {
    numNodes: {
      label: 'Number of Nodes',
      defaultValue: 12,
      currentValue: 12,
      maxValue: 1000,
      minValue: 0
    },
    polygonRadius: {
      label: 'Polygon Radius',
      defaultValue: 2,
      currentValue: 2,
      maxValue: 1000,
      minValue: 0
    },
    globalRadius: {
      label: 'Global Radius',
      defaultValue: 2,
      currentValue: 2,
      maxValue: 1000,
      minValue: 0
    }
  },
  text: 'chrysanthemum 2'
}

export default class Chrysanthemum2 extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numNodes; ++i) {

        for (let j = 0; j < this.numNodes; ++j) {

					const polyCenter = [
							this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes))),
							this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes))),
							0
					];

          const poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(i));
          this.scene.add(poly.line);

      }

    }

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
