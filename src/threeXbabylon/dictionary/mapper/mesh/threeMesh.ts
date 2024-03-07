import * as THREE from "three"; // Import the entire 'three' package
import { Mesh } from "babylonjs";

export class ThreeBox {
  geometry: THREE.BoxGeometry;

  material: any;
  mesh: THREE.Mesh;

  constructor(
    babylonBox: Mesh,
    scene: THREE.Scene,
    material: THREE.Material = new THREE.MeshPhongMaterial({ color: "white" })
  ) {
    this.geometry = this.convertBabylonBoxToThreeBoxParams(babylonBox);
    this.material = material;
    this.material.color = this.convertColorToThreeColor(babylonBox);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.convertBabylonBoxToThreeBox(babylonBox);
    scene.add(this.mesh);
  }


  /**
   * 
   * @returns Mesh
   */
  getBox(): THREE.Mesh {
    return this.mesh;
  }


  /**
   ** Converts Babylon box to Three.js box
   * @param babylonMesh 
   * @returns 
   */
  convertBabylonBoxToThreeBoxParams(babylonMesh: Mesh): THREE.BoxGeometry {
    return new THREE.BoxGeometry(
      babylonMesh.scaling.x,
      babylonMesh.scaling.y,
      babylonMesh.scaling.z
    );
  }

  /**
   ** Converts Babylon color to Three.js color
   * @param babylonMesh 
   * @returns 
   */  
  convertColorToThreeColor(babylonMesh: Mesh): THREE.Color {
    // TODO: Implement the conversion logic
    return new THREE.Color(0xffffff);
  }

  /**
   ** Converts Babylon box to Three.js box
   * @param babylonMesh 
   * @returns 
   */
  convertBabylonBoxToThreeBox(babylonMesh: Mesh): THREE.Mesh {
    // TODO: Implement the conversion logictili
    return new THREE.Mesh();
  }
}
