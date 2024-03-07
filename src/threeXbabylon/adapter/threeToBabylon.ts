import * as BABYLON from "babylonjs";
import * as THREE from "three";
import { ThreeToBabylonConvertor } from "../sceneConvertor/threeToBabylonConvertor";
import { BabylonToThreeConvertor } from "../sceneConvertor/babylonToThreeConvertor";

export interface ThreeToBabylon {
  convertScene(scene: BabylonToThreeConvertor): ThreeToBabylonConvertor;

  
  /**
   ** Converts Three.js camera to Babylon camera
   * @param camera 
   * @param scene 
   * @param canvas 
   * @param noPreventDafault 
   * @param target 
   */
  convertAttachedCamera(
    camera: THREE.PerspectiveCamera,
    scene: BABYLON.Scene,
    canvas: any,
    noPreventDafault?: boolean,
    target?: BABYLON.Vector3
  ): BABYLON.ArcRotateCamera;


  /**
   ** Converts Three.js hemispheric light to Babylon hemispheric light
   * @param light 
   * @param scene 
   * @param x 
   * @param y 
   * @param z 
   */
  convertHemiSphereLight(
    light: THREE.HemisphereLight,
    scene: BABYLON.Scene,
    x?: number,
    y?: number,
    z?: number
  ): BABYLON.HemisphericLight;

  /**
   ** Converts Three.js mesh to Babylon mesh
   * @param boxeometry 
   * @param scene 
   */
  convertMesh(boxeometry: THREE.Mesh, scene: BABYLON.Scene): BABYLON.Mesh;

  /**
   ** Converts Three.js object to Babylon object
   * @param component 
   * @param scene 
   * @param canvas 
   */
  convertComponent(
    component: THREE.Object3D,
    scene?: BABYLON.Scene,
    canvas?: any
  ): any;
}
