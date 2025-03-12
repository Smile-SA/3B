import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ThreeJsonLoader } from "../loaders/threeJsonLoader";
import "./loadedThreeJsonScene.css";

const LoadedThreeJsonScene = ({ jsonScene, defaultConf }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      box: THREE.Mesh;
    if (!canvasRef.current || !containerRef.current) return;

    let controls;
    let animationFrameId;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    
    renderer.setSize(containerWidth, containerHeight, false);    
    renderer.setPixelRatio(window.devicePixelRatio);

    // Load the scene
    const threeLoader = new ThreeJsonLoader(jsonScene);
    threeLoader.loadSceneFromJson().then(() => {
      scene = threeLoader.scene;
      scene.background = new THREE.Color(defaultConf.sceneBgColor);
      
      camera = scene.getObjectByProperty(
        "type",
        "PerspectiveCamera"
      ) as THREE.PerspectiveCamera;
      
      box = scene.getObjectByProperty(
        "type",
        "Mesh"
      ) as THREE.Mesh;
      
      // Apply default camera configuration
      camera.position.set(
        defaultConf.cameraPosition[0], 
        defaultConf.cameraPosition[1], 
        defaultConf.cameraPosition[2]
      );
      
      camera.lookAt(
        defaultConf.cameraLookAt[0], 
        defaultConf.cameraLookAt[1], 
        defaultConf.cameraLookAt[2]
      );
      
      // Set initial aspect ratio based on container dimensions
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = (Math.PI * 3) / 2;
      
      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      
      animate();
      
      const handleResize = () => {
        if (!containerRef.current) return;
        
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight, false);
      };
      
      window.addEventListener("resize", handleResize);
      
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(container);
      
      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        controls.dispose();
        renderer.dispose();
        if (scene && box) scene.remove(box);
      };
    });
  }, [jsonScene, defaultConf]);

  return (
    <div className="LoadedThreeJsonScene" ref={containerRef}>
      <div className="LoadedThreeJsonScene__Title">
        <h3>Three.js Scene</h3>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LoadedThreeJsonScene;