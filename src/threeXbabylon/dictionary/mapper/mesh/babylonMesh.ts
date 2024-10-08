import * as BABYLON from "babylonjs";
import * as THREE from "three";

export class BabylonBox {
  // three properties
  width?: number;
  height?: number;
  depth?: number;

  // babylon properties
  box: BABYLON.Mesh;
  name: string = "Mesh-";
  material!: BABYLON.StandardMaterial;
  geometry!: THREE.BoxGeometry;
  private static _boxNumber: number = 0;

  constructor(threeMesh: THREE.Mesh, scene: BABYLON.Scene) {
    BabylonBox._boxNumber++;
    this.name += BabylonBox._boxNumber;
    this.material = new BABYLON.StandardMaterial("boxMaterial", scene);
    // Get the color from the Three.js mesh material
    if (
      threeMesh.material instanceof THREE.MeshBasicMaterial ||
      threeMesh.material instanceof THREE.MeshStandardMaterial
    ) {
      const color = threeMesh.material.color;
      this.material.diffuseColor = new BABYLON.Color3(
        color.r,
        color.g,
        color.b
      );
      if (threeMesh.material.wireframe === true) {
        this.material.wireframe = true; // Enable wireframe in Babylon.js
      }
    }
    this.box = this.convertToBabylonMesh(threeMesh, this.name);
    this.box.material = this.material;
    // Add a Hemispheric light to illuminate the scene (if there's no light in the scene, otherwise skip this step)
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 1; // Adjust the intensity as needed
  }

  /**
   ** Get the Babylon.js mesh
   * @returns
   */
  getBox(): BABYLON.Mesh {
    return this.box;
  }

  /**
   ** Converts Three.js mesh to Babylon.js mesh
   * @param threeMesh
   * @param name
   * @returns
   */
  convertToBabylonMesh(threeMesh: THREE.Mesh, name: string): BABYLON.Mesh {
    if (threeMesh.geometry instanceof THREE.BoxGeometry) {
      return BABYLON.MeshBuilder.CreateBox(name, {
        width: threeMesh.geometry.parameters.width,
        height: threeMesh.geometry.parameters.height,
        depth: threeMesh.geometry.parameters.depth,
      });
    } else if (threeMesh.geometry instanceof THREE.SphereGeometry) {
      return BABYLON.MeshBuilder.CreateSphere(name, {
        diameter: threeMesh.geometry.parameters.radius * 2,
      });
    } else if (threeMesh.geometry instanceof THREE.CylinderGeometry) {
      return BABYLON.MeshBuilder.CreateCylinder(name, {
        height: threeMesh.geometry.parameters.height,
        diameterTop: threeMesh.geometry.parameters.radiusTop * 2,
        diameterBottom: threeMesh.geometry.parameters.radiusBottom * 2,
      });
    } else if (threeMesh.geometry instanceof THREE.PlaneGeometry) {
      return BABYLON.MeshBuilder.CreatePlane(name, {
        width: threeMesh.geometry.parameters.width,
        height: threeMesh.geometry.parameters.height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      });
    } else if (threeMesh.geometry instanceof THREE.TorusGeometry) {
      return BABYLON.MeshBuilder.CreateTorus(name, {
        diameter: threeMesh.geometry.parameters.radius * 2,
        thickness: threeMesh.geometry.parameters.tube,
      });
    } else if (threeMesh.geometry instanceof THREE.TorusKnotGeometry) {
      return BABYLON.MeshBuilder.CreateTorusKnot(name, {
        radius: threeMesh.geometry.parameters.radius,
        tube: threeMesh.geometry.parameters.tube,
        radialSegments: threeMesh.geometry.parameters.radialSegments,
        tubularSegments: threeMesh.geometry.parameters.tubularSegments,
        p: threeMesh.geometry.parameters.p,
        q: threeMesh.geometry.parameters.q,
      });
    } else {
      console.error("Geometry not found in dictionary", threeMesh.geometry);
      console.error("Defaulting to BoxGeometry");
      return BABYLON.MeshBuilder.CreateBox(name, {
        width: 1,
        height: 1,
        depth: 1,
      });
    }
  }
}
