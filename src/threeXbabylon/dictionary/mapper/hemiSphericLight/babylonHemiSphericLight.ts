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
        this.y = this.y ? -this.y : 0;
        this.light = new BABYLON.HemisphericLight(this.name, new BABYLON.Vector3(this.y, this.x, this.z), scene);
        this.light.diffuse = this.convertColor(threeLight.color);
        this.light.groundColor = new BABYLON.Color3(threeLight.groundColor.r, threeLight.groundColor.g, threeLight.groundColor.b);
        this.light.specular = new BABYLON.Color3(0.05, 0.05, 0.05);
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
