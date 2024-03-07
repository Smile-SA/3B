import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeGltfLoader } from '../loaders/threeGltfLoader';


const LoadedJsonThreeScene = () => {
    const canvasRef = useRef(null);

  useEffect(() => {


    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, box: THREE.Mesh;

    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current ?? undefined });
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5, true);

    let threeLoader = new ThreeGltfLoader("gltfScenes/threeGltfScene.gltf");

    threeLoader.loadSceneFromGltf().then(() => {
        scene = threeLoader.scene;
        camera = scene.getObjectByProperty('type', 'PerspectiveCamera') as THREE.PerspectiveCamera;

        // === Unable to load HemisphereLight from gltf file (add manually) ===
        const light1 = new THREE.HemisphereLight(0xffffff, "grey", 1);
        scene.add(light1);

        // Add orbit controls manually 
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI * 3/ 2;

        const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        };

        animate();
    
        const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        

        return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        scene.remove(box);
        };
    });

 }, []);

  return(
        <div>
            <h3>Three scene loaded from Gltf file</h3>
            <canvas title='' ref={canvasRef} />
        </div>
  ) 
};


export default LoadedJsonThreeScene;
