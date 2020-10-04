import Animation from '../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../utils';

export const metadata = {
  active: false,
  address: '/three#art_wriggling_donut',
  category: 'art',
  controllable: false,
  dynamic: true,
  hidden: true,
  name: 'wriggling donut',
  parameters: {
    numNodes: {
      label: 'Number of Nodes',
      defaultValue: 40,
      currentValue: 40,
      maxValue: 1000,
      minValue: 0
    },
    numPolygons: {
      label: 'Number of Polygons',
      defaultValue: 10,
      currentValue: 10,
      maxValue: 1000,
      minValue: 0
    },
    polygonRadius: {
      label: 'Polygon Radius',
      defaultValue: 1,
      currentValue: 1,
      maxValue: 1000,
      minValue: 0
    },
    globalRadius: {
      label: 'Global Radius',
      defaultValue: 0.2,
      currentValue: 0.2,
      maxValue: 1000,
      minValue: 0
    }
  },
  text: 'wriggling donut'
}

export default class WrigglingDonut extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    let x = [0, 0, 0];

    for (let i = 1; i < this.numNodes; ++i) {

        for (let j = 0; j < this.numNodes; ++j) {

					x = [
            this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes)) * Math.sin(phi(i, this.numPolygons))),
            this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes)) * Math.cos(phi(i, this.numPolygons))),
            0
					];

          const poly = new polygon(x, this.polygonRadius, this.numNodes, 0, colorNodes(1));
          this.scene.add(poly.line);

      }

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {
      this.scene.children[i].rotateZ(-10 * (Math.sin(t / 10) + Math.cos(t / 10)));
    }

  }

}
