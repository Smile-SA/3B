import "./App.css";
import React from "react";
import BabylonSceneFromThree from "./threeXbabylon/transfomedScenes/babylonSceneFromThree";
import ThreeSceneFromBabylon from "./threeXbabylon/transfomedScenes/threeSceneFromBabylon";
import LoadedThreeJsonScene from "./threeXbabylon/jsonParser/threeParser/loadedScenes/loadedThreeJsonScene";
import LoadedBabylonJsonScene from "./threeXbabylon/jsonParser/babylonParser/loadedScenes/loadedBabylonJsonScene";

function App() {
  const threeJsonScene = "jsonScenes/threeJsonScene2.json";
  const babylonJsonScene = "jsonScenes/babylonScene.json";

  /*Static Data */
  const titlePage = "ThreeXBabylon - Playground"
  const subtitlePage = "Developed by SMILE R&D"
  const transformToBabylonText = "Transform to Babylon()"
  const transformToThreejsText = "Transform to Threejs()"

  return (
    <div className="App">
      <div>
      <h1>{titlePage}</h1>
      <h4>{subtitlePage}</h4>
      </div>
      <div className="App_InitialResult">
        <LoadedThreeJsonScene jsonScene={threeJsonScene} />
        <div className="arrow-block">
          <div className="arrow-text">{transformToBabylonText}</div>
          <div className="arrow-triangle"></div>
        </div>
        <LoadedBabylonJsonScene jsonScene={babylonJsonScene} />
      </div>

      <div className="App_ConvertedResult">
        <BabylonSceneFromThree jsonScene={threeJsonScene} />
        <div className="arrow-block">
          <div className="arrow-text">{transformToThreejsText}</div>
          <div className="arrow-triangle"></div>
        </div>
        <ThreeSceneFromBabylon jsonScene={babylonJsonScene} />
      </div>
    </div>
  );
}
export default App;
