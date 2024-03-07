import {Object3D} from 'three';

export class ThreeDictionary {

    private threeDict: Map<string, any>;

    constructor() {
        this.threeDict = new Map<string, any>();
    }

    getThreeDict(): Map<string, any> {
        return this.threeDict;
    }

    // Add a key-value pair to the dictionary
    add(key: string, value: any) {
        this.threeDict.set(key, value);
    }

    // Get value by key
    getValue(key: string): Object3D {
        return this.threeDict.get(key);
    }

    // check if the dictionary contains a key
    contains(key: string): boolean {
        return this.threeDict.has(key);
    }
    
}