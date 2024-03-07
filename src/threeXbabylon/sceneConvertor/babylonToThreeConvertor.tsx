import { Engine, Scene } from "babylonjs";
import * as THREE from "three";
import { BabylonToThree } from "../adapter/babylonToThree";
import { ConvertToThree } from "../adapter/implementation/convertToThree";
import { BabylonJsonLoader } from "../jsonParser/babylonParser/loaders/babylonJsonLoader";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export class BabylonToThreeConvertor {

    babylonToThree: BabylonToThree;
    babylonJsonLoader: BabylonJsonLoader;

    static readonly lsItem: string = "threeScene";


    constructor(babylonScenePath: string) {
        this.babylonJsonLoader = new BabylonJsonLoader(babylonScenePath);
        this.babylonToThree = new ConvertToThree();
    }

    /**
     ** Transforms Babylon nodes to Three.js nodes
     * @param sceneToConvert 
     * @param engine 
     * @param canvas 
     * @param renderer 
     */
    transformToThree(
        sceneToConvert: THREE.Scene, 
        engine: Engine, 
        canvas: any, renderer: THREE.WebGLRenderer){

        this.babylonJsonLoader.loadSceneFromJson(engine, canvas)
        .then((loadedBabyonScene) => {
                this.convertBabylonNodes(loadedBabyonScene, sceneToConvert, renderer);
                localStorage.setItem(BabylonToThreeConvertor.lsItem, JSON.stringify(sceneToConvert));

        })
        .catch((e) => {
            console.error(e.message);
        });
    }

    /**
     ** Converts Babylon nodes to Three.js nodes
     * @param loadedBabyonScene 
     * @param sceneToConvert 
     * @param renderrer 
     */
    convertBabylonNodes(loadedBabyonScene: Scene, sceneToConvert: THREE.Scene, renderrer: THREE.WebGLRenderer)  {
        sceneToConvert.clear();
        loadedBabyonScene.getNodes().forEach((node) => {
            this.babylonToThree.convertComponent(node, sceneToConvert, renderrer);
        });
    }

    /**
     ** Adds orbit controls to the scene
     * @param camera 
     * @param renderer 
     */
    addOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI * 3/ 2;
    }


    /**
     ** Sets up the rendering of the scene
     * @param renderer 
     * @param sceneData 
     * @returns 
     */
    setupRendering(renderer: THREE.WebGLRenderer, sceneData: string) {    
            console.log("Building scene from local storage")
            let importedScene = new THREE.Scene();
            // Deserialize the scene data
            let  loader = new THREE.ObjectLoader();
            loader.parse(sceneData, function (obj) {
                importedScene.add(obj);
            });
            const scene = importedScene.children[0];
            const camera: THREE.PerspectiveCamera = scene.getObjectByProperty("type", "PerspectiveCamera") as THREE.PerspectiveCamera;

            this.addOrbitControls(camera, renderer);
    
            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
        
            animate();
        
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
        
            window.addEventListener('resize', handleResize);
        
            return () => {
                localStorage.removeItem(BabylonToThreeConvertor.lsItem);
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                scene.clear();
            };
    }


    /**
     ** Transforms and renders the scene
     * @param sceneToConvert 
     * @param engine 
     * @param canvas 
     * @param renderer 
     */
    transformAndRender(sceneToConvert: THREE.Scene, engine: Engine, canvas: any, renderer: THREE.WebGLRenderer) {
        let sceneData = JSON.parse(localStorage.getItem(BabylonToThreeConvertor.lsItem) as any)
        if(!sceneData){
            this.transformToThree(sceneToConvert, engine, canvas, renderer);
            this.setupRendering(renderer, sceneData);
        }else {
            this.setupRendering(renderer, sceneData);
        }
    }


    /**
     ** Returns the canvas element
     * @param canvasRef 
     * @returns 
     */
    getHtmlCanvas(canvasRef: any): JSX.Element {
        return (
            <div>
                <h3>Three.js scene converted from Babylon.js</h3>
                <canvas title='' ref={canvasRef} />
            </div>
        );
    }
}