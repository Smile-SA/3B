import * as BABYLON from 'babylonjs';
import { Scene } from "three";
import { ThreeToBabylon } from '../adapter/threeToBabylon';
import { ThreeJsonLoader } from '../jsonParser/threeParser/loaders/threeJsonLoader';
import { ThreeComponentBuilder } from '../dictionary/builder/threeComponentBuilder';
import { ConvertToBabylon } from '../adapter/implementation/convetToBabylon';
import React from "react";


export class ThreeToBabylonConvertor{

    canvas: any;
    threeToBabylon: ThreeToBabylon;
    threeLoader : ThreeJsonLoader;
    threeComonentBuilder: ThreeComponentBuilder;
    engine!: BABYLON.Engine;
    scene!: BABYLON.Scene;
    threeScene: Scene = new Scene();

    constructor(threeJsonPath: string){
        this.threeToBabylon = new ConvertToBabylon();
        this.threeLoader  = new ThreeJsonLoader(threeJsonPath);
        this.threeComonentBuilder = new ThreeComponentBuilder();
    }


    /**
     ** Transforms Three.js scene to Babylon.js scene
     * @param canvas 
     * @param canvasWidth 
     * @param canvasHeight 
     */
    transformToBabylon(canvas: any, canvasWidth: number, canvasHeight: number) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth * canvasWidth;
        this.canvas.height = window.innerWidth * canvasHeight;

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        
        this.threeLoader.loadSceneFromJson().then(() => {
            this.convertThreeSceneChildren();
            this.setupRendering();
        });
    }


    /**
     ** Converts Three.js scene children to Babylon.js scene children
     */
    convertThreeSceneChildren() {
        this.threeScene = this.threeLoader.scene;
        this.threeScene.children.forEach((child) => {
            let childComponent = this.threeComonentBuilder.builChild(child);
            this.threeToBabylon.convertComponent(childComponent, this.scene, this.canvas);
        });
    }


    /**
     ** Sets up rendering
     */
    setupRendering() {
        this.engine.runRenderLoop(() => this.scene.render());
        return () => {
            this.scene.dispose();
            this.engine.dispose();
        };
    }


    /**
     ** Gets the html canvas
     * @param canvasRef 
     * @returns 
     */
    getHtmlCanvas(canvasRef: any): JSX.Element {
        return (
            <div>
                <h3>Babylon.js converted from Three.js</h3>
                <canvas title='' ref={canvasRef} />
            </div>
        );
    }

}