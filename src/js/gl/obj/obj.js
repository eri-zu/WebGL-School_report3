import { Color, PlaneGeometry, MeshBasicMaterial, Mesh } from "three";

export class Obj {
  constructor(texture) {
    this.mesh;
    this.texture = texture;
    this.prevTime = 0;

    this.init();
    this.setEvents();
  }

  static get MATERIAL_PARAM() {
    return {
      color: new Color("rgba(255, 0, 0)"),
    };
  }

  init() {
    const geometry = new PlaneGeometry(100, 100, 100);
    const material = new MeshBasicMaterial({
      color: Obj.MATERIAL_PARAM.color,
    });

    this.mesh = new Mesh(geometry, material);
  }

  onUpdate() {
    const now = Date.now();
    const time = (now - this.prevTime) / 1000; // 前フレームからの経過時間 0.17とか
    this.prevTime = now;

    console.log("aaaa");
  }

  onResize(w, h) {}

  setEvents() {}
}
