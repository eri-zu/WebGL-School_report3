import {
  Color,
  Group,
  ConeGeometry,
  CapsuleGeometry,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Vector3,
  Quaternion,
  CylinderGeometry,
  MeshBasicMaterial,
  CircleGeometry,
  TetrahedronGeometry,
} from "three";
import { radian } from "../../util/math";

export class Airplane {
  constructor(texture) {
    this.texture = texture;
    this.group = new Group();
    this.inner = new Group();
    this.deg = 0;
    this.direction = new Vector3(0, 1, 0).normalize(); // 初期値（進行方向をy+） 進行方向ベクトル
    this.currentPosition = new Vector3(0, 0, 0);

    this.frame = 0;

    this.init();
  }

  static get PARAM() {
    return {
      color: new Color("rgba(255, 255, 255)"),
      r: 10,
      w: 10,
      h: 10,
      d: 10,
      h: 30,
      seg: 10,
    };
  }

  init() {
    this.createRocket();

    this.group.position.set(200, 200, 200);
  }

  createRocket() {
    const body_g = new CylinderGeometry(20, 20, 40, 32);
    const body_m = new MeshPhongMaterial({
      color: "#fff",
    });
    const body = new Mesh(body_g, body_m);

    const head_g = new ConeGeometry(20, 20, 32);
    const head_m = new MeshBasicMaterial({
      color: "#e64b20",
    });
    const head = new Mesh(head_g, head_m);
    head.position.set(0, 30, 0);

    const wing_g = new ConeGeometry(10, 20, 3);
    const wing1 = new Mesh(wing_g, head_m);
    const wing2 = new Mesh(wing_g, head_m);
    const wing3 = new Mesh(wing_g, head_m);
    const wings = new Group();
    wings.add(wing1, wing2, wing3);
    wing1.position.set(
      Math.cos(radian(135)) * 20,
      0,
      Math.sin(radian(135)) * 20
    );
    wing2.position.set(
      Math.cos(radian(270)) * 20,
      0,
      Math.sin(radian(270)) * 20
    );
    wing3.position.set(
      Math.cos(radian(360)) * 20,
      0,
      Math.sin(radian(360)) * 20
    );
    wings.position.set(0, -10, 0);

    const fire_g = new TetrahedronGeometry(10, 0);
    const fire_m = new MeshPhongMaterial({
      color: "#f7f094",
    });
    const fire = new Mesh(fire_g, fire_m);
    fire.position.set(0, -40, 0);

    this.inner.add(body, head, wings, fire);
    this.group.add(this.inner);
  }

  // init() {
  //   // // body
  //   // const geometry = new BoxGeometry(40, 30, 30);
  //   // const material = new MeshPhongMaterial({
  //   //   color: Airplane.PARAM.color,
  //   // });
  //   // const body = new Mesh(geometry, material);
  //   // // プロペラ
  //   // const material2 = new MeshPhongMaterial({
  //   //   color: "#000",
  //   // });
  //   // // プロペラ軸
  //   // const geometry2 = new BoxGeometry(5, 5, 5);
  //   // const propellerCenter = new Mesh(geometry2, material2);
  //   // // プロペラ羽
  //   // const geometry3 = new BoxGeometry(2.5, 40, 5);
  //   // const propellerBlade = new Mesh(geometry3, material2);
  //   // // プロペラ
  //   // this.propeller = new Group();
  //   // this.propeller.add(propellerCenter, propellerBlade);
  //   // this.propeller.position.set(40, 0, 0);
  //   // // 頭
  //   // const material3 = new MeshPhongMaterial({
  //   //   color: "#fff",
  //   // });
  //   // const geometry6 = new CapsuleGeometry(10, 40, 10, 10);
  //   // const head = new Mesh(geometry6, material3);
  //   // head.rotation.z = radian(90);
  //   // head.position.set(20, 0, 0);
  //   // // しっぽ
  //   // const geometry4 = new BoxGeometry(10, 20, 10);
  //   // const tail = new Mesh(geometry4, material);
  //   // tail.position.set(-22.5, 10, 0);
  //   // const material4 = new MeshPhongMaterial({
  //   //   color: new Color("rgba(136, 136, 138)"),
  //   // });
  //   // // 羽
  //   // const geometry5 = new BoxGeometry(15, 1, 40);
  //   // const blade = new Mesh(geometry5, material4);
  //   // const blade2 = new Mesh(geometry5, material4);
  //   // blade.position.set(10, 0, 35);
  //   // blade2.position.set(10, 0, -35);
  //   // this.group.add(tail, blade, blade2, head);
  //   // this.group.position.set(200, 200, 200);
  // }

  onUpdate(time) {
    this.frame++;
    this.deg += time * 50;

    // 前フレームの進行方向ベクトル;
    // const prevDirection = this.direction.clone();

    // // 現在のフレームの進行方向のベクトル
    // const nextX = Math.sin(radian(this.deg)) * 300;
    // const nextZ = Math.cos(radian(this.deg)) * 300;

    // this.direction = new Vector3(
    //   nextX - this.group.position.x,
    //   0,
    //   nextZ - this.group.position.z
    // );
    // this.direction.normalize();

    // // 2つのベクトルから外積で法線ベクトルを求める（=回転の軸）
    // const normalAxis = new Vector3().crossVectors(
    //   prevDirection,
    //   this.direction
    // );
    // normalAxis.normalize();

    // // 2つのベクトルから内積でコサインを求める（=回転の角度）
    // const cos = prevDirection.dot(this.direction);

    // // コサインを角度（ラジアン）に変更
    // const rad = Math.acos(cos);

    // // 法線ベクトルとラジアンからクオータニオンを定義
    // const qtn = new Quaternion().setFromAxisAngle(normalAxis, rad);

    // // 現在のクオータニオンに乗算して回転
    // this.group.quaternion.premultiply(qtn);

    // // position更新
    // this.group.position.set(nextX, 0, nextZ);
  }
}
