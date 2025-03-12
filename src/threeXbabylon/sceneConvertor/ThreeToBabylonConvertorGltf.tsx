import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as BABYLON from 'babylonjs';

export class ThreeToBabylonConvertorGltf {
  constructor(private gltfPath: string) {}

  async loadThreeScene(): Promise<THREE.Group> {
    console.log("Loading GLTF scene using Three.js...");
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        this.gltfPath,
        (gltf) => {
          console.log("GLTF scene successfully loaded with Three.js!");
          resolve(gltf.scene);
        },
        undefined,
        (error) => reject(error)
      );
    });
  }

  async transformToBabylon(canvasElement: HTMLCanvasElement, scaleX: number, scaleY: number, scene: unknown, engine: unknown) {
    try {
      console.log("Starting transformation from Three.js to Babylon.js...");
      const threeScene = await this.loadThreeScene();
      console.log("Loaded Three.js scene:", threeScene);

      const engine = new BABYLON.Engine(canvasElement, true);
      const babylonScene = new BABYLON.Scene(engine);

      // Add camera
      const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        Math.PI / 2,  // Angle horizontal
        Math.PI / 2,  // Angle vertical
        10,           // Distance de la caméra
        BABYLON.Vector3.Zero(),  // Regard sur l'origine
        babylonScene
      );
      camera.attachControl(canvasElement, true);
      babylonScene.activeCamera = camera;

      // Add light
      const light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, 0), babylonScene);
      light.position = new BABYLON.Vector3(0, 10, 0);  // Placer la lumière au-dessus de la scène

      // Convert meshes
      console.log("Starting to traverse and convert Three.js objects...");
      threeScene.traverse((threeObject: THREE.Object3D) => {
        if (threeObject instanceof THREE.Mesh) {
          // console.log("Found mesh in Three.js scene:", threeObject.name);
          this.convertMesh(threeObject, babylonScene, scaleX, scaleY);
        } else {
          console.log("Skipping non-mesh object:", threeObject.type);
        }
      });

      engine.runRenderLoop(() => babylonScene.render());
    } catch (error) {
      console.error("Error transforming to Babylon.js:", error);
    }
  }

  convertMesh(threeMesh: THREE.Mesh, babylonScene: BABYLON.Scene, scaleX: number, scaleY: number) {
    const babylonMesh = new BABYLON.Mesh(threeMesh.name, babylonScene);
    babylonMesh.position.set(threeMesh.position.x, threeMesh.position.y, threeMesh.position.z);
    babylonMesh.rotation.set(threeMesh.rotation.x, threeMesh.rotation.y, threeMesh.rotation.z);
    babylonMesh.scaling.set(threeMesh.scale.x * scaleX, threeMesh.scale.y * scaleY, threeMesh.scale.z);

    // Convert material
    if (threeMesh.material) {
      this.convertMaterial(threeMesh.material, babylonMesh, babylonScene);
    }
  }

  convertMaterial(
    threeMaterial: THREE.Material | THREE.Material[],
    babylonMesh: BABYLON.Mesh,
    babylonScene: BABYLON.Scene
  ) {
    if (Array.isArray(threeMaterial)) threeMaterial = threeMaterial[0]; // On prend le premier matériau si c'est un tableau
  
    let babylonMaterial: BABYLON.StandardMaterial;
  
    // Vérifier le type du matériau
    if (threeMaterial instanceof THREE.MeshBasicMaterial) {
      babylonMaterial = new BABYLON.StandardMaterial(threeMaterial.name, babylonScene);
      babylonMaterial.diffuseColor = new BABYLON.Color3(
        threeMaterial.color.r,
        threeMaterial.color.g,
        threeMaterial.color.b
      );
  
      // Vérifier si le matériau a une texture
      if ((threeMaterial as THREE.MeshBasicMaterial).map) {
        const texture = (threeMaterial as THREE.MeshBasicMaterial).map;
  
        if (texture) {
          console.log("Found texture map for material:", texture);
          const babylonTexture = this.convertTexture(texture, babylonScene);
          babylonMaterial.diffuseTexture = babylonTexture;
        }
      }
    } else if (threeMaterial instanceof THREE.MeshStandardMaterial) {
      babylonMaterial = new BABYLON.StandardMaterial(threeMaterial.name, babylonScene);
      babylonMaterial.diffuseColor = new BABYLON.Color3(
        threeMaterial.color.r,
        threeMaterial.color.g,
        threeMaterial.color.b
      );
  
      if (threeMaterial.map) {
        const texture = threeMaterial.map;
        const babylonTexture = this.convertTexture(texture, babylonScene);
        babylonMaterial.diffuseTexture = babylonTexture;
      }
    } else {
      console.warn("Unsupported material type. Defaulting to basic material.");
      babylonMaterial = new BABYLON.StandardMaterial("defaultMaterial", babylonScene);
    }
  
    if (babylonMaterial) {
      babylonMesh.material = babylonMaterial;
      console.log("Assigned converted material to mesh.");
    }
  }
  
  convertTexture(threeTexture: THREE.Texture, babylonScene: BABYLON.Scene): BABYLON.Texture {
    // Vérification si l'image est chargée par son UUID
    const texturePath = threeTexture.image.src; // On suppose ici que 'src' contient le chemin de l'image
    const babylonTexture = new BABYLON.Texture(texturePath, babylonScene);
  
    // Répétition de la texture
    babylonTexture.uScale = threeTexture.repeat.x;
    babylonTexture.vScale = threeTexture.repeat.y;
    babylonTexture.uOffset = threeTexture.offset.x;
    babylonTexture.vOffset = threeTexture.offset.y;
  
    // Traitement du wrap
    babylonTexture.wrapU = this.convertWrapping(threeTexture.wrapS[0]);
    babylonTexture.wrapV = this.convertWrapping(threeTexture.wrapS[1]);
  
    // Rotation de la texture
    babylonTexture.wAng = threeTexture.rotation;
  
    // Flip Y pour Babylon.js
    babylonTexture.hasAlpha = threeTexture.flipY;
  
    return babylonTexture;
  }
  
  // Convertir les paramètres de wrapping pour Babylon.js
  convertWrapping(wrapType: number): number {
    if (wrapType === THREE.RepeatWrapping) {
      return BABYLON.Texture.WRAP_ADDRESSMODE;
    } else if (wrapType === THREE.ClampToEdgeWrapping) {
      return BABYLON.Texture.CLAMP_ADDRESSMODE;
    } else if (wrapType === THREE.MirroredRepeatWrapping) {
      return BABYLON.Texture.MIRROR_ADDRESSMODE;
    }
    return BABYLON.Texture.CLAMP_ADDRESSMODE; // Valeur par défaut
  }
}  
