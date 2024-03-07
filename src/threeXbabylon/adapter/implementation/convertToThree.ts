import { BabylonToThree } from "../babylonToThree";
import { ThreeBox } from "../../dictionary/mapper/mesh/threeMesh";
import { ThreePerspectiveAndOrbiControls } from "../../dictionary/mapper/camera/threePerspectiveAndOrbiControls";
import {} from "../../dictionary/mapper/hemiSphericLight/babylonHemiSphericLight";
import { ThreeHemiSphericLight } from "../../dictionary/mapper/hemiSphericLight/threeHemiSphericLight";
import { ThreeToBabylonConvertor } from "../../sceneConvertor/threeToBabylonConvertor";
import { BabylonToThreeConvertor } from "../../sceneConvertor/babylonToThreeConvertor";
import * as THREE from "three";
import { ArcRotateCamera, HemisphericLight, Mesh } from "babylonjs";

export class ConvertToThree implements BabylonToThree {
  convertScene(scene: ThreeToBabylonConvertor): BabylonToThreeConvertor {
    throw new Error("Method not implemented.");
  }

  /**
   ** Converts Babylon camera to Three.js camera
   * @param babylonCamera
   * @param scene
   * @param renderer
   * @returns
   */
  convertAttachedCamera(
    babylonCamera: ArcRotateCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer
  ): ThreePerspectiveAndOrbiControls {
    let threePerspectiveAndOrbiControls = new ThreePerspectiveAndOrbiControls(
      babylonCamera,
      scene,
      renderer
    );
    return threePerspectiveAndOrbiControls;
  }

  /**
   ** Converts Babylon hemispheric light to Three.js hemispheric light
   * @param babylonLight
   * @param scene
   * @param skyColor
   * @param groundColor
   * @param intensity
   * @returns
   */
  convertHemiSphereLight(
    babylonLight: HemisphericLight,
    scene: THREE.Scene,
    skyColor?: THREE.ColorRepresentation | undefined,
    groundColor?: THREE.ColorRepresentation | undefined,
    intensity?: number | undefined
  ): THREE.HemisphereLight {
    let threeHemiSphericLight = new ThreeHemiSphericLight(
      babylonLight,
      scene,
      skyColor,
      groundColor,
      intensity
    );
    return threeHemiSphericLight.getLight();
  }

  /**
   ** Converts Babylon box to Three.js box
   * @param babylonBox
   * @param scene
   * @param material
   * @param color
   * @returns
   */
  convertBox(
    babylonBox: Mesh,
    scene: THREE.Scene,
    material?: THREE.Material | undefined,
    color?: THREE.ColorRepresentation | undefined
  ): THREE.Mesh {
    let threeBox = new ThreeBox(babylonBox, scene, material);
    return threeBox.getBox();
  }

  /**
   ** Converts Babylon component to Three.js component
   * @param babylonNode
   * @param scene
   * @param renderer
   * @returns
   */
  convertComponent(
    babylonNode: any,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer
  ) {
    switch (babylonNode.getClassName()) {
      case "ArcRotateCamera":
        return this.convertAttachedCamera(
          babylonNode,
          scene,
          renderer
        ).getCamera();
      case "HemisphericLight":
        return this.convertHemiSphereLight(babylonNode, scene);
      case "Mesh":
        return this.convertBox(babylonNode, scene);
      default:
        throw new Error("Component not found");
    }
  }
}
