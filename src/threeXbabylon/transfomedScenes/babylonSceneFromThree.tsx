import { useEffect, useRef } from "react";
import { ThreeToBabylonConvertor } from "../sceneConvertor/threeToBabylonConvertor";


const BabylonSceneFromThree = ({jsonScene}) => {

    const canvasRef = useRef(null);
    let babylonScene: ThreeToBabylonConvertor = 
        new ThreeToBabylonConvertor(jsonScene);

    useEffect(() => {
        const canvas = canvasRef.current;
        babylonScene.transformToBabylon(canvas, 0.4, 0.3); 
    });
    
    return(
        babylonScene.getHtmlCanvas(canvasRef)
    );
};
export default BabylonSceneFromThree;