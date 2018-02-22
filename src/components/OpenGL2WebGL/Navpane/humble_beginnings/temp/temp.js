import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Temp extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numCenters = parseFloat(this.parameters.numCenters.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.numLayers = parseFloat(this.parameters.numLayers.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

  }

  draw () {

		let center = [-0.1, 0.1, 0];

		for (let i = 0; i < this.numCenters; ++i) {

			let polyCenterOffset = [
					this.globalRadius * Math.cos(phi(i, this.numCenters)),
					this.globalRadius * Math.sin(phi(i, this.numCenters))
			];

			for (let j = 0; j < this.numLayers; ++j) {

				let polyClusterCenter = [
					j * center[0],
					j * center[1]
				];

		    for (let k = 0; k < this.numPolygons; ++k) {

					let polyCenter = [
						polyClusterCenter[0] * Math.sin(phi(k, this.numPolygons)) + polyCenterOffset[0],
						polyClusterCenter[1] * Math.cos(phi(k, this.numPolygons)) + polyCenterOffset[1]
					];

		      let poly = new polygon(polyCenter, this.polygonRadius, this.numNodes, 0, colorNodes(j));

					this.scene.add(poly.line);

		    }

			}

		}

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

			this.scene.children[i].rotateZ(1e-3);

			this.scene.children[i].position.set(0, 0, Math.sin((i % (this.numLayers * this.numPolygons)) * t / 150));

		}

  }

}
