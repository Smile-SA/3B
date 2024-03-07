import * as THREE from "three";

export class ThreeJsonLoader {
  jsonScenePath: any;
  scene: THREE.Scene;
  loader: THREE.ObjectLoader;

  constructor(jsonScenePath: string) {
    this.jsonScenePath = jsonScenePath;
    this.scene = new THREE.Scene();
    this.loader = new THREE.ObjectLoader();
  }

  /**
   ** Loads the scene from a json file
   * @returns Scene
   */
  loadSceneFromJson(): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        this.jsonScenePath,
        (loadedScene) => {
          loadedScene.traverse((child) => {
            if (!(child instanceof THREE.Scene)) {
              this.scene.children.push(child);
            }
          });
          resolve(loadedScene);
        },
        undefined,
        reject
      );
    });
  }

  /**
   ** Converts a scene to a json string
   * @param scene 
   * @returns 
   */
  sceneToJson(scene: THREE.Scene): string {
    return scene.toJSON();
  }
}
