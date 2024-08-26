import "./App.css";
import React from "react";
import BabylonSceneFromThree from "./threeXbabylon/transfomedScenes/babylonSceneFromThree";
import ThreeSceneFromBabylon from "./threeXbabylon/transfomedScenes/threeSceneFromBabylon";
import LoadedThreeJsonScene from "./threeXbabylon/jsonParser/threeParser/loadedScenes/loadedThreeJsonScene";
import LoadedBabylonJsonScene from "./threeXbabylon/jsonParser/babylonParser/loadedScenes/loadedBabylonJsonScene";
import LoadedSphereThreeJsonScene from "./threeXbabylon/jsonParser/threeParser/loadedScenes/loadedSphereThreeJsonScene";

function App() {
  const threeJsonScene = "jsonScenes/threeJsonScene2.json";
  const babylonJsonScene = "jsonScenes/babylonScene.json";

  /*Static Data */
  const titlePage = "ThreeXBabylon - Playground"
  const subtitlePage = "Developed by SMILE R&D 🇫🇷"
  const transformToBabylonText = "Transform to Babylon()"
  const transformToThreejsText = "Transform to Threejs()"

  return (
    <div className="App">
      <div className="App__TitlesBlock" >
      <h1>{titlePage}</h1>
      <p>{subtitlePage}</p>
      </div>
      <div className="App__InitialResult">
        <LoadedThreeJsonScene jsonScene={threeJsonScene} />
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToBabylonText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <LoadedBabylonJsonScene jsonScene={babylonJsonScene} />
      </div>

      <div className="App__ConvertedResult">
        <BabylonSceneFromThree jsonScene={threeJsonScene} />
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToThreejsText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
        <ThreeSceneFromBabylon jsonScene={babylonJsonScene} />
      </div>
      <div className="App__Sphere">
        <LoadedSphereThreeJsonScene/>
        <div className="App__Arrow-block">
          <div className="App__Arrow-text">{transformToBabylonText}</div>
          <div className="App__Arrow-triangle"></div>
        </div>
       
      </div>
    </div>
    
  );
}
export default App;
