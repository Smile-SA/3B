import React, { useEffect, useRef } from "react";
import * as BABYLON from "babylonjs";
import { BabylonJsonLoader } from "../loaders/babylonJsonLoader";
import "./loadedBabylonJsonScene.css";

const LoadedBabylonJsonScene = ({ jsonScene }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    // @ts-ignore
    canvas.width = window.innerWidth * 0.4;
    // @ts-ignore
    canvas.height = window.innerHeight * 0.5;
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);

    let babylonGltfLoader = new BabylonJsonLoader(jsonScene);

    babylonGltfLoader.loadSceneFromJson(engine, canvas).then((loadedScene) => {
      scene = loadedScene;

      engine.runRenderLoop(() => {
        scene.render();
      });
      const handleResize = () => {
        const width = window.innerWidth * 0.4;
        const height = window.innerHeight * 0.5;
        engine.resize();
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
      return () => {
        scene.dispose();
        engine.dispose();
      };
    });
  },  [jsonScene]);

  return (
    <div className="LoadedBabylonJsonScene">
      <div className="LoadedThreeJsonScene__Title">
        <h3>Babylon Scene</h3>
      </div>
      <canvas title="" ref={canvasRef} />
    </div>
  );
};

export default LoadedBabylonJsonScene;
