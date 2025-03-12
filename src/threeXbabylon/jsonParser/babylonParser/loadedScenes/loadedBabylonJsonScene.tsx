import React, { useEffect, useRef } from "react";
import * as BABYLON from "babylonjs";
import { BabylonJsonLoader } from "../loaders/babylonJsonLoader";
import "./loadedBabylonJsonScene.css";

const LoadedBabylonJsonScene = ({ jsonScene, defaultConf }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    // @ts-ignore
    canvas.width = containerWidth;
    // @ts-ignore
    canvas.height = containerHeight;
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);

    let babylonGltfLoader = new BabylonJsonLoader(jsonScene);

    babylonGltfLoader.loadSceneFromJson(engine, canvas).then((loadedScene) => {
      scene = loadedScene;

      // Create the camera and store it in a variable
      const camera = new BABYLON.ArcRotateCamera("arcCamera",
        defaultConf.cameraPosition[0],  defaultConf.cameraPosition[1],  defaultConf.cameraPosition[2],
        new BABYLON.Vector3(defaultConf.cameraLookAt[0], defaultConf.cameraLookAt[1], defaultConf.cameraLookAt[2]),
        scene
      );
      camera.wheelPrecision = defaultConf.babylonWheelPrecision;

      scene.meshes.forEach(mesh => {
        const material = new BABYLON.StandardMaterial("material", scene);
        if (!mesh.material) {
          const defaultColor = new BABYLON.Color3(1, 1, 1);
          material.diffuseColor = defaultColor;
          material.specularColor = defaultColor;
          material.emissiveColor = defaultColor;
        }
        else if (mesh.edgesColor && mesh.edgesWidth > 0) {
          const realColor = new BABYLON.Color3(mesh.edgesColor.r, mesh.edgesColor.g, mesh.edgesColor.b);
          material.diffuseColor = realColor;
          material.specularColor = realColor;
          material.emissiveColor = realColor;
          mesh.material = material;
        }
      });

      // Attach the camera to the canvas
      scene.activeCamera = camera;
      camera.attachControl(canvas, true);

      scene.clearColor = BABYLON.Color4.FromHexString(defaultConf.sceneBgColor);

      engine.runRenderLoop(() => {
        scene.render();
      });

      const handleResize = () => {
        if (!containerRef.current) return;
        
        engine.resize();
      };

      window.addEventListener('resize', handleResize);

      // @ts-ignore
      canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
    }, { passive: false });
      return () => {
        scene.dispose();
        engine.dispose();
      };
});
  },  [jsonScene, defaultConf]);

  return (
    <div className="LoadedBabylonJsonScene" ref={containerRef}>
      <div className="LoadedThreeJsonScene__Title">
        <h3>Babylon Scene</h3>
      </div>
      <canvas title="" ref={canvasRef} />
    </div>
  );
};

export default LoadedBabylonJsonScene;
