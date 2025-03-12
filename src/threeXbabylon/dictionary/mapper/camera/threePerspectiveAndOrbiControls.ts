import { ArcRotateCamera } from "babylonjs";
import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { configuration } from '../../../../defaultConf.js';

const defaultConfig = configuration();

export class ThreePerspectiveAndOrbiControls {


  // Three properties
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;


  constructor(babylonCamera: ArcRotateCamera, scene: Scene, renderer: WebGLRenderer) {
    this.renderer = renderer;
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.convertArcRotateToPerspectiveCameraParams(babylonCamera, scene);
  }

  /**
   * 
   * @returns PerspectiveCamera
   */
  getCamera(): PerspectiveCamera {
    return this.camera;
  }

  /**
   ** Set the camera position
   * @param babylonCamera 
   */
  setCameraPosition(babylonCamera: ArcRotateCamera) {
    this.camera.position.set(
      babylonCamera.position.x,
      babylonCamera.position.y,
      babylonCamera.position.z
    );
  }

  /**
   ** Converts arc rotate camera to perspective camera
   * @param babylonCamera 
   * @param scene 
   */
  convertArcRotateToPerspectiveCameraParams(babylonCamera: ArcRotateCamera, scene: Scene) {
    // TODO: make this in if-else the user wants to apply default conf
    // this.camera.position.set(x, y, z);
    // this.camera.lookAt(
    //     babylonCamera.target.x,
    //     babylonCamera.target.y,
    //     babylonCamera.target.z
    // );

    this.camera.position.set(defaultConfig.cameraPosition[0], defaultConfig.cameraPosition[1], defaultConfig.cameraPosition[2]);
    this.camera.lookAt(
      defaultConfig.cameraLookAt[0], defaultConfig.cameraLookAt[1], defaultConfig.cameraLookAt[2]
    );

    this.camera.fov = babylonCamera.fov * (180 / Math.PI) * 0.3;

    this.camera.aspect = (window.innerWidth * 0.3) / (window.innerHeight * 0.3);
    this.camera.updateProjectionMatrix();

    this.camera.near = babylonCamera.minZ;
    this.camera.far = babylonCamera.maxZ;
    
    scene.add(this.camera);
}

}
