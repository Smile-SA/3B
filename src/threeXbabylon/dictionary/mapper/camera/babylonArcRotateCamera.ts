import { PerspectiveCamera } from 'three';
import { Scene, ArcRotateCamera, Vector3 } from 'babylonjs';
import { configuration } from '../../../../defaultConf.js';

const defaultConfig = configuration();
export class BabylonArcRotateCamera {

    // babylon properties
    name: string = "ARC-";
    private static _cameraNumber: number = 0;
    alpha!: number;
    beta!: number;
    radius!: number;
    babylonCamera: ArcRotateCamera;

    constructor(camera: PerspectiveCamera, scene: Scene, canvas: any, 
        noPreventDafault: boolean = true, target: Vector3 = Vector3.Zero()) {
        BabylonArcRotateCamera._cameraNumber++;
        this.name += BabylonArcRotateCamera._cameraNumber;
        
        this.babylonCamera = new ArcRotateCamera("arcCamera", defaultConfig.cameraPosition[0], defaultConfig.cameraPosition[1], defaultConfig.cameraPosition[2], new Vector3(defaultConfig.cameraLookAt[0], defaultConfig.cameraLookAt[1], defaultConfig.cameraLookAt[2]), scene);
        this.babylonCamera.wheelPrecision = defaultConfig.babylonWheelPrecision;
        this.babylonCamera.attachControl(canvas, noPreventDafault)
    }

    /**
     * 
     * @returns ArcRotateCamera
     */
    getCamera(): ArcRotateCamera {
        return this.babylonCamera;
    }


    /**
     ** Get the camera position
     * @param camera 
     * @returns 
     */
    getCameraPosition(camera: PerspectiveCamera): Vector3 {
        return new Vector3(
            camera.position.x,
            camera.position.y,
            camera.position.z
        )
    }

    /**
     ** Converts perspective camera to arc rotate camera
     * @param fov 
     * @param aspect 
     * @param near 
     * @param far 
     */
    convertPerspectiveToArcRotateParams(fov: number, aspect: number, near?: number, far?: number) {
        // Assuming the camera is looking at the origin (0, 0, 0) for simplicity
        
        // Calculate radius based on fov and aspect ratio
        this.radius = (Math.sqrt(2) / (2 * Math.tan(fov / 2))) * Math.sqrt(aspect);

        // Calculate beta angle
        this.beta = Math.atan(1 / Math.sqrt(2));

        // Calculate alpha angle based on camera position
        // Assuming the camera is positioned on the positive z-axis for simplicity
        this.alpha = Math.atan2(0, this.radius);
    }


}
