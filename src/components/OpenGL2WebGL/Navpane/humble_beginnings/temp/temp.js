import Animation from '../../animation';

import {

	colorNodes,
	Flower

} from '../../../utils';

export default class Temp extends Animation {

  constructor (scene, animation) {

    super(scene, animation);

		this.numFlowers = parseFloat(this.parameters.numFlowers.currentValue);
		this.numPetals = parseFloat(this.parameters.numPetals.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.petalRadius = parseFloat(this.parameters.petalRadius.currentValue);

  }

  draw () {

		let root = [0, -this.numFlowers, 0];

		let pistol = [0, 0, 0];

		for (let i = 0; i < this.numFlowers; ++i) {

			if (this.numFlowers % 2 === 0) {
				pistol = [
					4 * this.petalRadius * (i - ((this.numFlowers - 1) / 2)),
					(this.numFlowers - 1) / 2,
					0
				];
			} else {
				pistol = [
					4 * this.petalRadius * (i - Math.floor(this.numFlowers / 2)),
					Math.floor(this.numFlowers / 2),
					0
				];
			}

			let flower = new Flower(root, pistol, this.petalRadius, this.numPetals, this.numNodes, colorNodes(i), colorNodes(3));
			this.scene.add(flower.stem);
			this.scene.add(flower.petalGroup);
			this.scene.add(flower.pistol);

		}

  }

}
