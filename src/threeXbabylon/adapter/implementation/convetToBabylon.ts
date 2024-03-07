import * as THREE from "three";
import * as BABYLON from "babylonjs";

import { BabylonArcRotateCamera } from "../../dictionary/mapper/camera/babylonArcRotateCamera";
import { BabylonHemiSphericLight } from "../../dictionary/mapper/hemiSphericLight/babylonHemiSphericLight";
import { ThreeToBabylonConvertor } from "../../sceneConvertor/threeToBabylonConvertor";
import { BabylonToThreeConvertor } from "../../sceneConvertor/babylonToThreeConvertor";
import { ThreeToBabylon } from "../threeToBabylon";
import { BabylonBox } from "../../dictionary/mapper/mesh/babylonMesh";

export class ConvertToBabylon implements ThreeToBabylon {
  convertScene(scene: BabylonToThreeConvertor): ThreeToBabylonConvertor {
    throw new Error("Method not implemented.");
  }

  /**
   ** Converts Three.js camera to Babylon camera
   * @param camera
   * @param scene
   * @param canvas
   * @param noPreventDafault
   * @param target
   * @returns
   */
  convertAttachedCamera(
    camera: THREE.PerspectiveCamera,
    scene: BABYLON.Scene,
    canvas: any,
    noPreventDafault?: boolean,
    target?: BABYLON.Vector3
  ): BABYLON.ArcRotateCamera {
    let babylonArcRotateCamera = new BabylonArcRotateCamera(
      camera,
      scene,
      canvas,
      noPreventDafault,
      target
    );
    return babylonArcRotateCamera.getCamera();
  }

  /**
   ** Converts Three.js hemispheric light to Babylon hemispheric light
   * @param light
   * @param scene
   * @param x
   * @param y
   * @param z
   * @returns
   */
  convertHemiSphereLight(
    light: THREE.HemisphereLight,
    scene: BABYLON.Scene,
    x?: number,
    y?: number,
    z?: number
  ): BABYLON.HemisphericLight {
    let babylonHemiSphericLight = new BabylonHemiSphericLight(
      light,
      scene,
      x,
      y,
      z
    );
    return babylonHemiSphericLight.getLight();
  }

  /**
   ** Converts Three.js box to Babylon box
   * @param mesh
   * @param scene
   * @returns
   */
  convertMesh(mesh: THREE.Mesh, scene: BABYLON.Scene): BABYLON.Mesh {
    let babylonBox = new BabylonBox(mesh, scene);
    return babylonBox.getBox();
  }

  /**
   ** Converts Three.js component to Babylon component
   * @param component
   * @param scene
   * @param canvas
   * @returns
   */
  convertComponent(component: any, scene: BABYLON.Scene, canvas?: any): any {
    switch (component.type) {
      case "PerspectiveCamera":
        return this.convertAttachedCamera(component, scene, canvas);
      case "HemisphereLight":
        return this.convertHemiSphereLight(component, scene);
      case "Mesh":
        return this.convertMesh(component, scene);
      default:
        console.error("Component not found", component.type);
        return null;
    }
  }
}
