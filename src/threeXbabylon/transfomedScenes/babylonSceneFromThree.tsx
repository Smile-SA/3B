import React, { useEffect, useRef } from "react";
import { ThreeToBabylonConvertor } from "../sceneConvertor/threeToBabylonConvertor";
import { ThreeJsonLoader } from "../jsonParser/threeParser/loaders/threeJsonLoader";

const BabylonSceneFromThree = ({ jsonScene, canvasId, defaultConf }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sceneRef = useRef<ThreeToBabylonConvertor | null>(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    if (canvas) {
        // @ts-ignore
        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
        }, { passive: false });
        const threeLoader = new ThreeJsonLoader(jsonScene);
        const loadScene = async () => {
          const loadedScene = await threeLoader.loadSceneFromJson();
          const scene = new ThreeToBabylonConvertor(loadedScene);
          sceneRef.current = scene;
          scene.transformToBabylon(canvas, containerWidth, containerHeight, defaultConf);
        }

        loadScene();
      } else {
        console.error(`Canvas with ID ${canvasId} is not available`);
      }
      
      // Cleanup when component unmounts
      return () => {
        if (sceneRef.current?.engine) {
          sceneRef.current.engine.dispose();
        }
      };
  }, [jsonScene, canvasId, defaultConf]);

  return (
    <div className="LoadedBabylonJsonScene" ref={containerRef}>
      <div className="LoadedThreeJsonScene__Title">
        <h3>Babylon Scene</h3>
      </div>
      <canvas key={canvasId} title="" ref={canvasRef} />
    </div>
  );
};

export default BabylonSceneFromThree;
