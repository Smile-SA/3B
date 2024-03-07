import * as THREE from "three";
import { ThreeDictionary } from "./threeDictionary";

export class InitDictionary {
  
  static initThreeDictionary(threeDict: ThreeDictionary) {
    threeDict.add("PerspectiveCamera", THREE.PerspectiveCamera);
    threeDict.add("HemisphereLight", THREE.HemisphereLight);
    threeDict.add("BoxGeometry", THREE.BoxGeometry);
    threeDict.add("Mesh", THREE.Mesh);
    threeDict.add("Scene", THREE.Scene);
  }
}
