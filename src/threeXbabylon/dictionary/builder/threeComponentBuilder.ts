import { Object3D } from 'three';
import { ThreeDictionary } from '../dict/threeDictionary';
import { InitDictionary } from '../dict/initDictionary';

export class ThreeComponentBuilder {

    threeDict: ThreeDictionary;

    constructor() {
        this.threeDict =  new ThreeDictionary();
        InitDictionary.initThreeDictionary(this.threeDict);
    }

    /**
     ** Builds a child component from the Three.js scene
     * @param child 
     * @returns 
     */
    builChild(child: Object3D): any {
        let component : Object3D;
        if(this.threeDict.contains(child.type)){
            component = child;
            return component;
        }else {
            console.error("Component not found in dictionary", child.type);
            return null;
        }
    }
}