import React, { useEffect, useRef } from "react";
import { ThreeToBabylonConvertor } from "../sceneConvertor/threeToBabylonConvertor";


const BabylonSceneFromThree = ({jsonScene}) => {
    const canvasRef = useRef(null);
    let babylonScene: ThreeToBabylonConvertor = 
        new ThreeToBabylonConvertor(jsonScene);

    useEffect(() => {
        const canvas = canvasRef.current;
        babylonScene.transformToBabylon(canvas, 0.3, 0.3); 
    });
    
    return(
        <canvas width="100%" title="" ref={canvasRef} />
    );
};
export default BabylonSceneFromThree;