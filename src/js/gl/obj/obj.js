import { Color, PlaneGeometry, MeshBasicMaterial, Mesh, Group } from "three";
import { Earth } from "./earth";
import { Airplane } from "./airplane";
import { Tree } from "./tree";
import { radian } from "../../util/math";
import { Cloud } from "./cloud";

export class Obj {
  constructor(texture) {
    this.group;
    this.texture = texture;
    this.prevTime = 0;

    this.init();
    this.setEvents();
  }

  init() {
    this.group = new Group();
    this.earthgroup = new Group();
    this.earth = new Earth();
    this.airplane = new Airplane(this.texture);

    this.trees = new Group();
    const treePos = [
      { x: 5, y: 5, z: 5 },
      { x: 15, y: 0, z: 30 },
      { x: -2, y: 2, z: -2 },
      { x: -10, y: -10, z: -5 },
      { x: 3, y: -10, z: -10 },
      { x: -5, y: 5, z: 5 },
      { x: 10, y: -8, z: -2 },
      { x: 3, y: 100, z: 10 },
      { x: -50, y: -50, z: 100 },
    ];

    for (let i = 0; i < treePos.length; i++) {
      const tree = new Tree(treePos[i]);
      this.trees.add(tree.mesh);
    }

    this.clouds = new Group();
    const cloudPos = [
      { x: -10, y: -20, z: -60 },
      { x: 3, y: 2, z: 0 },
      { x: -100, y: 200, z: -20 },
      { x: 20, y: -70, z: 30 },
      { x: -45, y: 0, z: -10 },
      { x: 0, y: 0, z: 100 },
    ];

    for (let i = 0; i < cloudPos.length; i++) {
      const cloud = new Cloud(cloudPos[i]);
      this.clouds.add(cloud.group);
    }

    this.group.add(this.earthgroup, this.airplane.group, this.clouds);
    this.earthgroup.add(this.earth.mesh, this.trees);
  }

  onUpdate() {
    const now = Date.now();
    const time = (now - this.prevTime) / 1000; // 前フレームからの経過時間 0.17とか
    this.prevTime = now;
    this.earthgroup.rotation.y += time * 0.2;
    this.clouds.rotation.y += time * 0.5;
    this.group.rotation.z = radian(-23.4);

    this.earth.onUpdate(time);
    this.airplane.onUpdate(time);
  }

  onResize(w, h) {}

  setEvents() {}
}
