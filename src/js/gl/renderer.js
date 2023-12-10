import { WebGLRenderer, Color } from "three";

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.instance;

    this.init();
  }

  static get RENDERER_PARAM() {
    return {
      clearColor: new Color("rgba(249, 244, 209)"),
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  init() {
    this.instance = new WebGLRenderer({ canvas: this.canvas });
    this.instance.setPixelRatio(window.devicePixelRatio);
    this.instance.setClearColor(Renderer.RENDERER_PARAM.clearColor);
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }

  onResize(w, h) {
    this.instance.setSize(w, h);
  }
}
