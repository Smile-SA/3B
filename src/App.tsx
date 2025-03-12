import "./App.css";
import React from "react";
import BabylonSceneFromThree from "./threeXbabylon/transfomedScenes/babylonSceneFromThree";
import ThreeSceneFromBabylon from "./threeXbabylon/transfomedScenes/threeSceneFromBabylon";
import LoadedThreeJsonScene from "./threeXbabylon/jsonParser/threeParser/loadedScenes/loadedThreeJsonScene";
import LoadedBabylonJsonScene from "./threeXbabylon/jsonParser/babylonParser/loadedScenes/loadedBabylonJsonScene";
import { configuration } from './defaultConf.js'
import LoadedGltfThreeJsonScene from "./threeXbabylon/jsonParser/threeParser/loadedScenes/loadedGltfThreeJsonScene";
import LoadedBabylonGltfObject from "./threeXbabylon/jsonParser/babylonParser/loadedScenes/loadedBabylonGltfObject";
import BabylonSceneFromThreeGltf from "./threeXbabylon/transfomedScenes/BabylonSceneFromThreeGltf";

function App() {
  localStorage.clear();

  const threeJsonScene = "jsonScenes/threeJsonScene2.json";
  const babylonJsonScene = "jsonScenes/babylonScene.json";
  const sphereJsonScene = "jsonScenes/threeJsonSceneSphere.json";
  const  GltfObjet = "jsonScenes/shiba/scene.gltf"

  /*Static Data */
  const titlePage = "ThreeXBabylon - Playground";
  const subtitlePage = "Developed by SMILE R&D 🇫🇷";
  const transformToBabylonText = "Transform to Babylon()";
  const transformToThreejsText = "Transform to Threejs()";

  /* Configuration */
  const defaultConf = configuration();

  document.title = "ThreeXBabylon - Playground";
  return (
    <div className="App">
      <div className="App__TitlesBlock">
        <h1>{titlePage}</h1>
        <p>{subtitlePage}</p>
      </div>

      <div className="App__BoxGeometry">
        <div className="App__canvas-wrapper">
          <LoadedBabylonJsonScene jsonScene={babylonJsonScene} defaultConf={defaultConf} />
        </div>
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToThreejsText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <div className="App__canvas-wrapper">
          <ThreeSceneFromBabylon jsonScene={babylonJsonScene} defaultConf={defaultConf} />
        </div>
      </div>

      <div className="App__PlaneGeometry">
        <div className="App__canvas-wrapper">
          <LoadedThreeJsonScene jsonScene={threeJsonScene} defaultConf={defaultConf} />
        </div>
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToBabylonText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <div className="App__canvas-wrapper">
          <BabylonSceneFromThree jsonScene={threeJsonScene} defaultConf={defaultConf} canvasId="babylonCanvas1" />
        </div>
      </div>

      <div className="App__Sphere">
        <div className="App__canvas-wrapper">
          <LoadedThreeJsonScene jsonScene={sphereJsonScene} defaultConf={defaultConf} />
        </div>
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToBabylonText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <div className="App__canvas-wrapper">
          <BabylonSceneFromThree jsonScene={sphereJsonScene} defaultConf={defaultConf} canvasId="babylonCanvas2" />
        </div>
      </div>

      <div className="App__gltf">
        <div className="App__canvas-wrapper_gltf">
          <LoadedGltfThreeJsonScene jsonScene={GltfObjet} defaultConf={defaultConf} />
        </div>

        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToBabylonText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <div className="App__canvas-wrapper_gltf">
          <BabylonSceneFromThreeGltf defaultConf={defaultConf} />
        </div>
      </div>

      <div className="App__gltf">
        <div className="App__canvas-wrapper_gltf ">
          <LoadedBabylonGltfObject defaultConf={defaultConf} />
        </div>
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToThreejsText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <div className="App__canvas-wrapper_gltf">
          <LoadedGltfThreeJsonScene jsonScene={GltfObjet} defaultConf={defaultConf} />
        </div>
      </div>
    </div>
  );
}
export default App;
