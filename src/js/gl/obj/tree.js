import {
  Color,
  ConeGeometry,
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
  Vector3,
  Quaternion,
} from "three";
import { radian } from "../../util/math";

export class Tree {
  constructor(pos) {
    this.pos = pos;
    this.mesh;

    this.init();
  }

  static get PARAM() {
    return {
      color: new Color("rgba(16, 174, 61)"),
      r: 10,
      h: 30,
      seg: 10,
    };
  }

  init() {
    const geometry = new ConeGeometry(
      Tree.PARAM.r,
      Tree.PARAM.h,
      Tree.PARAM.seg
    );

    const material = new MeshPhongMaterial({
      color: Tree.PARAM.color,
    });

    this.mesh = new Mesh(geometry, material);

    const point = new Vector3(this.pos.x, this.pos.y, this.pos.z); // 任意の点座標（=木を置きたい座標）
    const normalAxis = point.clone().normalize(); // 地球の中心からpointへのベクトル（=地球表面の法線ベクトル）
    const pos = point.clone().normalize().multiplyScalar(160); // 球面上の座標へ変更（地球の半径は150）
    const defaultVec = new Vector3(0, 1, 0); // 木のデフォルトの向きベクトル（=真上）
    const qtn = new Quaternion().setFromUnitVectors(defaultVec, normalAxis); // verticalVecからnormalAxisに回転
    this.mesh.quaternion.premultiply(qtn); // 木を回転
    this.mesh.position.copy(pos); // 木の座標をセット
  }

  onUpdate(time) {}
}
