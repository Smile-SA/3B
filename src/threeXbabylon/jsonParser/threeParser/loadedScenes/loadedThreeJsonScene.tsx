import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ThreeJsonLoader } from "../loaders/threeJsonLoader";
import "./loadedThreeJsonScene.css";

const LoadedThreeJsonScene = ({ jsonScene }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      box: THREE.Mesh;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current ?? undefined,
    });
    renderer.setSize(window.innerWidth * 0.3, window.innerHeight * 0.3, true);

    let threeLoader = new ThreeJsonLoader(jsonScene);

    threeLoader.loadSceneFromJson().then(() => {
      scene = threeLoader.scene;
      camera = scene.getObjectByProperty(
        "type",
        "PerspectiveCamera"
      ) as THREE.PerspectiveCamera;

      // Add orbit controls manually (not from json file)
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = (Math.PI * 3) / 2;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        const width = window.innerWidth * 0.3;
        const height = window.innerHeight * 0.3;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        scene.remove(box);
      };
    });
  },  [jsonScene]);

  return (
    <div className="LoadedThreeJsonScene">
      <div className="LoadedThreeJsonScene__Title">
        <h3>Three.js Scene</h3>
      </div>
      <canvas title="" ref={canvasRef} />
    </div>
  );
};

export default LoadedThreeJsonScene;
