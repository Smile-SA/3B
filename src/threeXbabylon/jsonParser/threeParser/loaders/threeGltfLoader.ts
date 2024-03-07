import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

export class ThreeGltfLoader {
  gltfPath: string;
  scene: Scene;
  loader: GLTFLoader;
  gltfExporter: GLTFExporter;
  
  constructor(gltfPath: string) {
    this.gltfPath = gltfPath;
    this.scene = new Scene();
    this.loader = new GLTFLoader();
    this.gltfExporter = new GLTFExporter();
  }

  /**
   ** Exports the scene to GLTF format
   * @param scene 
   */
  sceneToGltf(scene: Scene) {
    this.gltfExporter.parse(
      scene,
      (gltf) => {
        console.log("GLTF Exporter: ", gltf);
        // download the gltf file to the local machine
        // Convert GLTF data to ArrayBuffer
        this.downloadGlft(gltf);
      },
      (error) => {
        console.error("An error occurred: ", error);
      }
    );
  }

  /**
   ** Downloads the GLTF file to the local machine
   * @param gltf 
   */
  private downloadGlft(gltf: ArrayBuffer | { [key: string]: any }) {
    const gltfData = JSON.stringify(gltf);
    const gltfArrayBuffer = new Uint8Array(gltfData.length);
    for (let i = 0; i < gltfData.length; i++) {
      gltfArrayBuffer[i] = gltfData.charCodeAt(i);
    }
    const blob = new Blob([gltfArrayBuffer], {
      type: "application/octet-stream",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "threeGltfScene.gltf";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  loadSceneFromGltf(): Promise<Scene> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        this.gltfPath,
        (loadedScene) => {
          loadedScene.scene.children.forEach((child) => {
            this.scene.children.push(child);
            resolve(this.scene);
          });
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        reject
      );
    });
  }
}
