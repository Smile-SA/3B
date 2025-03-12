import * as BABYLON from "babylonjs";
import * as THREE from "three";

export class BabylonBox {
  box: BABYLON.Mesh;
  name: string = "Mesh-";
  material!: BABYLON.StandardMaterial;
  geometry!: THREE.BoxGeometry;
  private static _boxNumber: number = 0;

  constructor(threeMesh: THREE.Mesh, scene: BABYLON.Scene) {
    BabylonBox._boxNumber++;
    this.name += BabylonBox._boxNumber;
    this.material = new BABYLON.StandardMaterial("boxMaterial", scene);
    
    if (
      threeMesh.material instanceof THREE.MeshBasicMaterial ||
      threeMesh.material instanceof THREE.MeshStandardMaterial
    ) {
      const color = threeMesh.material.color;

      const bayblonColor = new BABYLON.Color3(color.r, color.g, color.b);
      this.material.diffuseColor = bayblonColor;
      this.material.specularColor = bayblonColor;
      
      if (threeMesh.material.wireframe === true) {
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.5;
        this.material.emissiveColor = bayblonColor;
        this.material.wireframe = true;
      }
    }

    this.box = this.convertToBabylonMesh(threeMesh, this.name, scene);

    this.box.material = this.material;

  }

  getBox(): BABYLON.Mesh {
    return this.box;
  }

  convertToBabylonMesh(
    threeMesh: THREE.Mesh,
    name: string,
    scene: BABYLON.Scene
  ): BABYLON.Mesh {
    if (threeMesh.geometry instanceof THREE.PlaneGeometry) {
      // Get the widthSegments and heightSegments from Three.js
      const widthSegments = threeMesh.geometry.parameters.widthSegments || 1;
      const heightSegments = threeMesh.geometry.parameters.heightSegments || 1;

      // Use CreateGround to simulate subdivisions
      const ground = BABYLON.MeshBuilder.CreateGround(name, {
        height: threeMesh.geometry.parameters.width,
        width: threeMesh.geometry.parameters.height,
        subdivisionsX: widthSegments / 2,
        subdivisionsY: heightSegments * 2,
      });

      // Make ground double-sided
      const material = new BABYLON.StandardMaterial("groundMaterial", scene);
      material.backFaceCulling = false; // Both sides rendered
      ground.material = material;

      return ground;
    } else if (threeMesh.geometry instanceof THREE.BoxGeometry) {

      return BABYLON.MeshBuilder.CreateBox(name, {
        width: threeMesh.geometry.parameters.width,
        height: threeMesh.geometry.parameters.height,
        depth: threeMesh.geometry.parameters.depth,
      });
    } else if (threeMesh.geometry instanceof THREE.SphereGeometry) {
      return BABYLON.MeshBuilder.CreateSphere(name, {
        diameter: threeMesh.geometry.parameters.radius,
        segments: threeMesh.geometry.parameters.widthSegments || 32,
      });
    } else if (threeMesh.geometry instanceof THREE.CylinderGeometry) {
      return BABYLON.MeshBuilder.CreateCylinder(name, {
        height: threeMesh.geometry.parameters.height,
        diameterTop: threeMesh.geometry.parameters.radiusTop * 2,
        diameterBottom: threeMesh.geometry.parameters.radiusBottom * 2,
        tessellation: threeMesh.geometry.parameters.radialSegments || 32,
      });
    } else if (threeMesh.geometry instanceof THREE.TorusGeometry) {
      return BABYLON.MeshBuilder.CreateTorus(name, {
        diameter: threeMesh.geometry.parameters.radius * 2,
        thickness: threeMesh.geometry.parameters.tube,
        tessellation: threeMesh.geometry.parameters.radialSegments || 32,
      });
    }

    console.error("Unsupported geometry type", threeMesh.geometry);
    return BABYLON.MeshBuilder.CreateBox(name, {
      width: 1,
      height: 1,
      depth: 1,
    });
  }
}
