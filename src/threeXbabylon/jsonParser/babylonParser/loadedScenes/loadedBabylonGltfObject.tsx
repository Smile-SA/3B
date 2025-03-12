// src/BabylonScene.tsx
import React, { useEffect, useRef } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, SceneLoader } from 'babylonjs';
import 'babylonjs-loaders';

export default function LoadedBabylonGltfObject( { defaultConf } ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        // @ts-ignore
        canvas.width = containerWidth;
        // @ts-ignore
        canvas.height = containerHeight;
        const engine = new Engine(canvas, true);
        
        const createScene = () => {
            const scene = new Scene(engine);

            const camera = new ArcRotateCamera('camera', 
                defaultConf.cameraPosition[0] + Math.PI / 2, defaultConf.cameraPosition[1] + Math.PI / 2, defaultConf.cameraPosition[2] === 0 ? defaultConf.gltfScaler :  defaultConf.cameraPosition[2] / defaultConf.gltfScaler, 
                new Vector3(defaultConf.cameraLookAt[1], defaultConf.cameraLookAt[0], defaultConf.cameraLookAt[2]), 
                scene);
            
            camera.attachControl(canvas, true);
            camera.wheelPrecision = defaultConf.babylonWheelPrecision * defaultConf.gltfScaler;

            // Add a light
            new HemisphericLight('light', new Vector3(0, 1, 0), scene);

            // Load a GLTF model
            SceneLoader.ImportMesh('', 'jsonScenes/shiba/', 'scene.gltf', scene, (meshes) => {
                console.log('Model loaded:', meshes);
            });

            scene.clearColor = BABYLON.Color4.FromHexString(defaultConf.sceneBgColor);

            return scene;
        };

        // @ts-ignore
        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
        }, { passive: false });
        const scene = createScene();

        // Render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        // Resize the engine when the window is resized
        window.addEventListener('resize', () => {
            engine.resize();
        });

        // Cleanup on component unmount
        return () => {
            engine.dispose();
        };
    }, [defaultConf]);

    return ( 
      <div className="LoadedBabylonJsonScene" ref={containerRef}>
      <div className="LoadedThreeJsonScene__Title">
        <h3>Babylon Scene GLTF </h3>
      </div><canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
        </div>
  );
};
