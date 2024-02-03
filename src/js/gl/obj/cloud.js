import {
  TorusGeometry,
  MeshPhongMaterial,
  Mesh,
  Group,
  Vector3,
  Quaternion,
} from "three";
import { radian } from "../../util/math";

export class Cloud {
  constructor(pos) {
    this.pos = pos;
    this.group = new Group();

    this.init();
  }

  static get PARAM() {
    return {
      color: "#fff",
      r: 5,
      t: 10,
      segr: 30,
      segh: 60,
    };
  }

  init() {
    const geometry1 = new TorusGeometry(5, 10, 30, 60);
    const geometry2 = new TorusGeometry(3.5, 7, 30, 60);
    const geometry3 = new TorusGeometry(4, 6, 30, 60);
    const geometry4 = new TorusGeometry(2.5, 5, 30, 60);

    const material = new MeshPhongMaterial({
      color: Cloud.PARAM.color,
    });

    this.mesh1 = new Mesh(geometry1, material);
    this.mesh2 = new Mesh(geometry2, material);
    this.mesh3 = new Mesh(geometry3, material);
    this.mesh4 = new Mesh(geometry4, material);
    this.mesh2.position.set(0, 0, 13);
    this.mesh3.position.set(0, 0, -12.5);
    this.mesh4.position.set(0, 0, 19);

    this.group.add(this.mesh1, this.mesh2, this.mesh3, this.mesh4);
    // this.group.position.set(100, 100, 100);

    const point = new Vector3(this.pos.x, this.pos.y, this.pos.z);
    const normalAxis = point.clone().normalize();
    const pos = point.clone().normalize().multiplyScalar(190);
    // const defaultVec = new Vector3(-1, 0, 0);
    // const defaultVec = new Vector3(0, 1, 0);
    // const defaultVec = new Vector3(0, 0, 1);
    // const defaultVec = new Vector3(1, 1, 0);
    // const defaultVec = new Vector3(0, 1, 1);
    // const defaultVec = new Vector3(1, 0, 1);
    const defaultVec = new Vector3(0, -1, 0);
    const qtn = new Quaternion().setFromUnitVectors(defaultVec, normalAxis);
    this.group.quaternion.premultiply(qtn);
    this.group.position.copy(pos);
    // this.group.rotation.x(radian(90));
  }
}
