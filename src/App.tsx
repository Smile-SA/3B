import './App.css';
import React from 'react';
import BabylonSceneFromThree from './threeXbabylon/transfomedScenes/babylonSceneFromThree';
import ThreeSceneFromBabylon from './threeXbabylon/transfomedScenes/threeSceneFromBabylon';
import LoadedThreeJsonScene from './threeXbabylon/jsonParser/threeParser/loadedScenes/loadedThreeJsonScene';
import LoadedBabylonJsonScene from './threeXbabylon/jsonParser/babylonParser/loadedScenes/loadedBabylonJsonScene';

function App() {

  const threeJsonScene = "jsonScenes/threeJsonScene2.json";
  const babylonJsonScene = "jsonScenes/babylonScene.json";


  return (
    <div className="App">
      <div className="result">
        <LoadedThreeJsonScene jsonScene={threeJsonScene}/>
        <LoadedBabylonJsonScene jsonScene={babylonJsonScene}/>
      </div>

      <div className="result">
        <BabylonSceneFromThree jsonScene={threeJsonScene}/>
        <ThreeSceneFromBabylon jsonScene={babylonJsonScene} />
      </div>      
    </div>
  );
}
export default App;



