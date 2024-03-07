import * as BABYLON from "babylonjs";

export class BabylonJsonLoader {
  loader: BABYLON.SceneLoader;
  jsonUrl: string;
  scene!: BABYLON.Scene;

  constructor(babylonScenePath: string) {
    this.loader = new BABYLON.SceneLoader();
    this.jsonUrl = babylonScenePath;
  }


  /**
   ** Loads a scene from a json file
   * @param engine 
   * @param canvas 
   * @returns 
   */
  loadSceneFromJson(
    engine: BABYLON.Engine,
    canvas: any
  ): Promise<BABYLON.Scene> {
    return new Promise((resolve, reject) => {
      BABYLON.SceneLoader.Load(
        "",
        this.jsonUrl,
        engine,
        (loadedScene) => {
          this.scene = loadedScene;
          
          this.attachCamera(loadedScene, canvas);
          resolve(this.scene);
        },
        (event) => {
          if (event.lengthComputable) {
            const percentage = ((event.loaded * 100) / event.total).toFixed();
            console.log(`Loading: ${percentage}%`);
          } else {
            console.log("Loading...");
          }
        },
        (message, exception) => {
          reject(new Error(`Failed to load scene: ${message}, exception: ${exception}`));
        }
      );
    });
  }


  /**
   ** Converts a scene to a json string
   * @param scene 
   * @returns 
   */
  sceneToJson(scene: BABYLON.Scene): string {
    return JSON.stringify(scene);
  }

  /**
   ** Attaches a camera to the scene
   * @param scene 
   * @param canvas 
   */
  private attachCamera(scene: BABYLON.Scene, canvas: any) {
    let camera = scene.activeCamera;
    if (camera) {
      camera.attachControl(canvas, true);
    }
  }

}
