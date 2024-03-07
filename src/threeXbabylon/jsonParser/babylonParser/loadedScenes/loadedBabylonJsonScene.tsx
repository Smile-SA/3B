import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import { BabylonJsonLoader } from '../loaders/babylonJsonLoader';

const LoadedBabylonJsonScene = ({jsonScene}) => {

    const canvasRef = useRef(null);
    
    useEffect(() => {

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

            return () => {
                scene.dispose();
                engine.dispose();
            };  
        
    });

    }, []);


    return (
        <div>
            <h3>Initial Babylon Scene</h3>
            <canvas title='' ref={canvasRef} />
        </div>
    );

};

export default LoadedBabylonJsonScene;