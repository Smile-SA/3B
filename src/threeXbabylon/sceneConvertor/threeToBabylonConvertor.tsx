import * as BABYLON from "babylonjs";
import { Scene } from "three";
import { ThreeToBabylon } from "../adapter/threeToBabylon";
import { ThreeComponentBuilder } from "../dictionary/builder/threeComponentBuilder";
import { ConvertToBabylon } from "../adapter/implementation/convetToBabylon";
import React from "react";
import "./threeToBabylonConvertor.css";

export class ThreeToBabylonConvertor {
  canvas: any;
  threeToBabylon: ThreeToBabylon;
  threeComonentBuilder: ThreeComponentBuilder;
  engine!: BABYLON.Engine;
  scene!: BABYLON.Scene;
  threeScene: Scene = new Scene();
  loadedScene: any;

  constructor(loadedScene: any) {
    this.threeToBabylon = new ConvertToBabylon();
    this.loadedScene = loadedScene;
    this.threeComonentBuilder = new ThreeComponentBuilder();
  }

  /**
   ** Transforms Three.js scene to Babylon.js scene
   * @param canvas
   * @param canvasWidth
   * @param canvasHeight
   */
  transformToBabylon(canvas: any, canvasWidth: number, canvasHeight: number, defaultConf: any) {
      this.canvas = canvas;
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.engine = new BABYLON.Engine(this.canvas, true);
      this.scene = new BABYLON.Scene(this.engine);
      this.scene.clearColor = BABYLON.Color4.FromHexString(defaultConf.sceneBgColor);
      this.convertThreeSceneChildren();
  
      const handleResize = () => {
        this.engine.resize();
      };

      window.addEventListener('resize', handleResize);
      // Render the scene
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
  }

  /**
   ** Converts Three.js scene children to Babylon.js scene children
   */
  convertThreeSceneChildren() {
    // this.threeScene = this.threeLoader.scene;
    this.threeScene = this.loadedScene;
    this.threeScene.children.forEach((child) => {
      let childComponent = this.threeComonentBuilder.buildChild(child);
      this.threeToBabylon.convertComponent(
        childComponent,
        this.scene,
        this.canvas
      );
    });
  }

  /**
   ** Gets the html canvas
   * @param canvasRef
   * @returns
   */
  getHtmlCanvas(canvasRef: any): React.JSX.Element {
    return (
      <div className="ThreeToBabylonConvertor">
        <div className="ThreeToBabylonConvertor__Title">
          <h3>Babylon</h3>
        </div>
        <canvas title="" ref={canvasRef} />
      </div>
    );
  }
}
