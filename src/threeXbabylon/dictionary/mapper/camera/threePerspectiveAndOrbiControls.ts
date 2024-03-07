import { ArcRotateCamera } from "babylonjs";
import { Scene, WebGLRenderer, PerspectiveCamera, Vector3 } from "three";

export class ThreePerspectiveAndOrbiControls {

  
    // Three properties
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    

    constructor(babylonCamera: ArcRotateCamera, scene: Scene, renderer: WebGLRenderer) {
        this.renderer = renderer;
        this.camera = new PerspectiveCamera();
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
      // Calculate camera position based on alpha, beta, and radius
      this.camera.position.set(
        babylonCamera.position.x,
        babylonCamera.position.y,
        babylonCamera.position.z
      );
      this.camera.lookAt(new Vector3().copy(babylonCamera.cameraDirection));
      // Calculate fov and aspect ratio based on radius
      this.camera.fov = 2 * Math.atan(1 / babylonCamera.radius) * (180 / Math.PI);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.near = 0.1;
      this.camera.far = 1000;
      scene.add(this.camera);
    }

}
