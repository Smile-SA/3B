import * as THREE from "three";
import { HemisphericLight } from "babylonjs";

export class ThreeHemiSphericLight {
  light: THREE.HemisphereLight;

  constructor(
    babylonLight: HemisphericLight,
    scene: THREE.Scene,
    skyColor: THREE.ColorRepresentation = 0xffffff,
    groundColor: THREE.ColorRepresentation = 0xffffff,
    intensity: number = 1
  ) {
    this.light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.setLightPosition(babylonLight);
    scene.add(this.light);
  }

  /**
   ** Sets the light position
   * @param babylonLight 
   */
  setLightPosition(babylonLight: HemisphericLight) {
    this.light.position.set(
      babylonLight.direction.x,
      babylonLight.direction.y,
      babylonLight.direction.z
    );
  }

  /**
   * 
   * @returns HemisphereLight
   */
  getLight(): THREE.HemisphereLight {
    return this.light;
  }


}
