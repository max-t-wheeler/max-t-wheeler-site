export default class Animation {

  constructor (scene, camera, animation) {

    this.scene = scene;
    this.camera = camera;
    this.parameters = animation.parameters;
    this.name = animation.name;
    this.dynamic = animation.dynamic;
    this.controllable = animation.controllable;

}

  draw () {

	}

  update () {

  }

}
