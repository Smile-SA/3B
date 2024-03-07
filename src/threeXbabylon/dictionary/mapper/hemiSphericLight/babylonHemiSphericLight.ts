import * as BABYLON from 'babylonjs';
import { HemisphereLight, ColorRepresentation } from 'three';

export class BabylonHemiSphericLight {
    
    name: string = "HSL-";
    private static _lightNumber: number = 0;
    x?: number = 0;
    y?: number = 1;
    z?: number = 0;
    light: BABYLON.HemisphericLight;
    


    constructor(threeLight: HemisphereLight, scene: BABYLON.Scene, x?: number, y?: number, z?: number) {
        BabylonHemiSphericLight._lightNumber++;
        this.name = this.name + BabylonHemiSphericLight._lightNumber;
        this.light = new BABYLON.HemisphericLight(this.name, new BABYLON.Vector3(this.x, this.y, this.z), scene);
        this.light.diffuse = this.convertColor(threeLight.color);
    }   

    /**
     ** Converts color to Color3
     * @param color 
     * @returns Color3
     */
    convertColor(color?: ColorRepresentation): BABYLON.Color3 {
        if (typeof color === "string") {
            return BABYLON.Color3.FromHexString(color);
        } else if (typeof color === "number") {
            return BABYLON.Color3.FromHexString(color.toString());
        }else {
            return new BABYLON.Color3(0.5, 0.5, 0.5);
        }
    }

    /**
     * 
     * @returns HemisphericLight
     */
    getLight(): BABYLON.HemisphericLight {
        return this.light;
    }
}
