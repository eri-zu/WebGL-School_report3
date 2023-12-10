import { PerspectiveCamera, Vector3 } from "three";

export class Camera {
  constructor() {
    this.instance;
    this.init();
  }

  static get CAMERA_PARAM() {
    return {
      fovy: 30,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 10000,
      x: 200,
      y: 200,
      lookAt: new Vector3(0.0, 200.0, 0.0),
    };
  }

  init() {
    this.instance = new PerspectiveCamera(
      Camera.CAMERA_PARAM.fovy,
      Camera.CAMERA_PARAM.aspect,
      Camera.CAMERA_PARAM.near,
      Camera.CAMERA_PARAM.far
    );
    this.setPosition(window.innerHeight);
    this.instance.lookAt(Camera.CAMERA_PARAM.lookAt);
  }

  onResize(w, h) {
    this.instance.aspect = w / h;
    this.setPosition(h);
    this.instance.updateProjectionMatrix();
  }

  setPosition(h) {
    const fovRad = (Camera.CAMERA_PARAM.fovy / 2) * (Math.PI / 180);

    // パラメータにz設定されてなかったら、ピクセル単位でpositionとるようにする
    this.instance.position.x = Camera.CAMERA_PARAM.x;
    this.instance.position.y = Camera.CAMERA_PARAM.y;
    this.instance.position.z = Camera.CAMERA_PARAM.z
      ? Camera.CAMERA_PARAM.z
      : h / 2 / Math.tan(fovRad);
  }
}
