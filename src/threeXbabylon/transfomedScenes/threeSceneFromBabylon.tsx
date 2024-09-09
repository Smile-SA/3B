import { useRef, useEffect } from 'react';
import { BabylonToThreeConvertor } from "../sceneConvertor/babylonToThreeConvertor";
import * as THREE from 'three';
import { Engine } from 'babylonjs';


const ThreeSceneFromBabylon = ({jsonScene}) => {
    
        const canvasRef = useRef(null);
        let threeFromBabylonConvertor: BabylonToThreeConvertor =
        new BabylonToThreeConvertor(jsonScene);

        useEffect(() => {
            
            const canvas = canvasRef.current;
            const engine = new Engine(canvas, true);
            let scene = new THREE.Scene();

            // @ts-ignore
            let renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(window.innerWidth * 0.3, window.innerHeight * 0.3, true);

            threeFromBabylonConvertor.transformAndRender(scene, engine, canvas, renderer);

        }); 
            
    return (
        threeFromBabylonConvertor.getHtmlCanvas(canvasRef)
    );

};
export default ThreeSceneFromBabylon;