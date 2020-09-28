import Animation from '../animation';

import {

	colorNodes,
	Flower

} from '../utils';

export default class Temp extends Animation {

	constructor (scene, camera, animation) {

		super(scene, camera, animation);

		this.numFlowers = parseFloat(this.parameters.numFlowers.currentValue);
		this.numPetals = parseFloat(this.parameters.numPetals.currentValue);
		this.numNodes = parseFloat(this.parameters.numNodes.currentValue);
		this.petalRadius = parseFloat(this.parameters.petalRadius.currentValue);

  }

  draw () {

		const root = [0, -this.numFlowers, 0];

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

			const flower = new Flower(root, pistol, this.petalRadius, this.numPetals, this.numNodes, colorNodes(i), colorNodes(2));
			this.scene.add(flower.stem);
			this.scene.add(flower.petalGroup);
			this.scene.add(flower.pistol);

			this.scene.position.set(0, 0, 1 - this.numFlowers);

		}

  }

}
