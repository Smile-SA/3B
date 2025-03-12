import { useRef, useEffect } from 'react';
import { BabylonToThreeConvertor } from "../sceneConvertor/babylonToThreeConvertor";
import * as THREE from 'three';
import { Engine } from 'babylonjs';


const ThreeSceneFromBabylon = ({jsonScene, defaultConf}) => {
    
        const canvasRef = useRef(null);
        const containerRef = useRef(null);

        let threeFromBabylonConvertor: BabylonToThreeConvertor = new BabylonToThreeConvertor(jsonScene);

        useEffect(() => {
            
            const canvas = canvasRef.current;
            const engine = new Engine(canvas, true);
            let scene = new THREE.Scene();
            scene.background = new THREE.Color(defaultConf.sceneBgColor);

            const container = containerRef.current;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;


            // @ts-ignore
            let renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(containerWidth, containerHeight, false);

            const handleResize = () => {
                if (!containerRef.current) return;
                
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;
                
                renderer.setSize(newWidth, newHeight, false);
            };

            // Add resize listener
            window.addEventListener("resize", handleResize);

            threeFromBabylonConvertor.transformAndRender(scene, engine, canvas, renderer);

        }); 
            
    return (
        threeFromBabylonConvertor.getHtmlCanvas(canvasRef, containerRef)
    );

};
export default ThreeSceneFromBabylon;