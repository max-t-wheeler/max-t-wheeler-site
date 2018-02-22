import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Chrysanthemum extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

    for (let i = 0; i < this.numNodes; ++i) {

        for (let j = 0; j < this.numNodes; ++j) {

					let x = [
							this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes))),
							this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes)))
					];

          for (let k = 0; k < this.numPolygons; ++k) {

						let polyCenter = [
							x[0] * Math.sin(phi(k, this.numPolygons)),
							x[1] * Math.cos(phi(k, this.numPolygons))
						];

            let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(i));
            this.scene.add(poly.line);

          }

      }

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
        this.scene.children[i].rotation.z -= 1e-3;
      } else {
       this.scene.children[i].rotation.z += 1e-3;
      }

    }

  }

}
