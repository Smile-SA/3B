import { ThreeToBabylonConvertor } from "../sceneConvertor/threeToBabylonConvertor";
import { ThreePerspectiveAndOrbiControls } from "../dictionary/mapper/camera/threePerspectiveAndOrbiControls";
import { BabylonToThreeConvertor } from "../sceneConvertor/babylonToThreeConvertor";
import { HemisphericLight, ArcRotateCamera, Mesh } from "babylonjs";
import * as THREE from "three";

export interface BabylonToThree {
  convertScene(scene: ThreeToBabylonConvertor): BabylonToThreeConvertor;

  /**
   ** Converts Babylon camera to Three.js camera
   * @param babylonCamera
   * @param scene
   * @param renderer
   */
  convertAttachedCamera(
    babylonCamera: ArcRotateCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer
  ): ThreePerspectiveAndOrbiControls;

  /**
   ** Converts Babylon hemispheric light to Three.js hemispheric light
   * @param babylonLight
   * @param scene
   * @param skyColor
   * @param groundColor
   * @param intensity
   */
  convertHemiSphereLight(
    babylonLight: HemisphericLight,
    scene: THREE.Scene,
    skyColor?: THREE.ColorRepresentation,
    groundColor?: THREE.ColorRepresentation,
    intensity?: number
  ): THREE.HemisphereLight;

  /**
   ** Converts Babylon mesh to Three.js mesh
   * @param babylonBox
   * @param scene
   * @param material
   * @param color
   */
  convertBox(
    babylonBox: Mesh,
    scene: THREE.Scene,
    material?: THREE.Material,
    color?: THREE.ColorRepresentation
  ): THREE.Mesh;

  /**
   ** Converts Babylon object to Three.js object
   * @param component
   * @param scene
   * @param renderer
   */
  convertComponent(
    component: any,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer
  ): any;
}
