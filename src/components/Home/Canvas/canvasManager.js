import * as THREE from 'three';

import HomeAnimation from '../Themes/homeAnimation';

export default class CanvasManager {

  constructor (canvas) {

    // initialize canvas

    this.canvas = canvas;

    this.checkCanvasSize();

    this.setCamera(3);
    this.setRenderer(0x000000);

    this.checkCanvasSize();

    window.addEventListener('resize', () => this.checkCanvasSize());

    // initialize animation

    this.scene = new THREE.Scene();

    this.animation = new HomeAnimation(this.scene);

    this.dt = 0;

    this.animation.draw();

    this.tick = this.tick.bind(this);

    // run animation

    this.tick();

  }

  setRenderer (backgroundColor) {

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
    this.renderer.setClearColor(backgroundColor);
    this.renderer.setPixelRatio(window.devicePixelRatio);

  }

  setCamera (offset) {

    this.camera = new THREE.PerspectiveCamera(75, this.canvasWidth / this.canvasHeight, 0.1, 1000);
    this.camera.position.z = offset;

  }

  checkCanvasSize () {

    let cv = document.getElementById('home-display');

    this.canvasWidth = cv.offsetWidth;
    this.canvasHeight = cv.offsetHeight;

    if (this.renderer) this.renderer.setSize(this.canvasWidth, this.canvasHeight);

    if (this.camera) {
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.updateProjectionMatrix();
    }

  }

  tick () {

    this.animationId = requestAnimationFrame(this.tick);

    this.renderer.render(this.scene, this.camera);

    this.dt += 1e-2;

    if (this.dt > 2 * Math.PI * 1e6) {
      this.dt -= 2 * Math.PI * 1e6;
    }

    this.animation.update(this.dt);

  }

}
