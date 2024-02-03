import {
  SphereGeometry,
  MeshBasicMaterial,
  IcosahedronGeometry,
  Mesh,
  Color,
  MeshPhongMaterial,
} from "three";
import { radian } from "../../util/math";

export class Earth {
  constructor() {
    this.mesh;

    this.init();
  }

  static get PARAM() {
    return {
      color: new Color("rgba(66, 182, 221)"),
      w: 150,
      // h: 150,
      // seg: 10,
      detail: 3,
    };
  }

  init() {
    const geometry = new IcosahedronGeometry(Earth.PARAM.w, Earth.PARAM.detail);

    const material = new MeshPhongMaterial({
      color: Earth.PARAM.color,
      flatShading: true,
    });

    this.mesh = new Mesh(geometry, material);
  }

  onUpdate(time) {}
}
