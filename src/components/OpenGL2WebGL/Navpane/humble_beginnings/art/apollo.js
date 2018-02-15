import Animation from '../../animation';

import {

	colorNodes,
	phi,
	polygon

} from '../../../utils';

export default class Apollo extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

  }

  draw () {

		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.numPolygons = parseFloat(this.parameters.numPolygons.currentValue);
		this.polygonRadius = parseFloat(this.parameters.polygonRadius.currentValue);
		this.globalRadius = parseFloat(this.parameters.globalRadius.currentValue);

    let x = [0, 0];

    for (let i = 1; i < this.numNodes; ++i) {

        for (let j = 0; j < this.numNodes; ++j) {

          for (let k = 0; k < this.numPolygons; ++k) {

            x[0] = this.globalRadius * (Math.cos(phi(i, this.numNodes)) + Math.cos(phi(j, this.numNodes))) * Math.sin(phi(k, this.numPolygons));
            x[1] = this.globalRadius * (Math.sin(phi(i, this.numNodes)) + Math.sin(phi(j, this.numNodes))) * Math.cos(phi(k, this.numPolygons));

            let poly = new polygon(x, this.polygonRadius, this.numNodes, 0, colorNodes(i));
            this.scene.add(poly.line);

          }

      }

    }

  }

  update (t) {

    for (let i = 0; i < this.scene.children.length; ++i) {

      if (i % 2 === 0) {
        this.scene.children[i].rotation.z -= 1e-3;
        // this.scene.children[i].rotation.z -= Math.sin(t/1000)/10;
        // this.scene.children[i].scale.set(Math.cos(phi(i, 100) + t/10));
        // this.scene.children[i].scale.set(Math.cos(phi(i, 100) + t/10), -Math.sin(phi(i, 100) + t/10), Math.cos(t));
      } else {
       this.scene.children[i].rotation.z += 1e-3;
        // this.scene.children[i].rotation.z += Math.sin(t/1000)/5;
        // this.scene.children[i].scale.set(-Math.cos(phi(i, 100) + t/10));
        // this.scene.children[i].scale.set(-Math.sin(phi(i, 100) + t/10), Math.cos(phi(i, 100) + t/10), Math.sin(t));
      }

    }

  }

}
