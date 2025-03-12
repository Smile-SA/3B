import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "@babylonjs/loaders";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export default function LoadedGltfThreeJsonScene({ jsonScene, defaultConf }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && jsonScene) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(defaultConf.sceneBgColor);
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
      camera.position.set(defaultConf.cameraPosition[0], defaultConf.cameraPosition[1], defaultConf.cameraPosition[2] / (2 * defaultConf.gltfScaler));
      camera.lookAt(
        defaultConf.cameraLookAt[0], defaultConf.cameraLookAt[1], defaultConf.cameraLookAt[2]
      );

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(containerWidth, containerHeight);

      // Ajouter une lumière
      const ambientLight = new THREE.AmbientLight(0x404040); // Lumière ambiante
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1).normalize();
      scene.add(directionalLight);

      // Chargement du fichier GLTF
      const loader = new GLTFLoader();
      loader.load(
        jsonScene,
        (gltf) => {
          if (gltf.scene) {
            scene.add(gltf.scene);
            renderer.render(scene, camera);
          } else {
            console.error("Error loading GLTF model.");
          }
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model :", error);
        }
      );
      
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

      // Contrôles
      const controls = new OrbitControls(camera, renderer.domElement as unknown as HTMLElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Mise à jour des contrôles
        renderer.render(scene, camera);
      };
      animate();

      // Gestion du redimensionnement
      window.addEventListener('resize', () => {
        const width = containerWidth;
        const height = containerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });

      return () => {
        window.removeEventListener('resize', () => {});
      };
    }
  }, [jsonScene, defaultConf]);

  return (
    <div className="LoadedGltfThreeJsonScene" ref={containerRef}>
      <div className="LoadedThreeJsonScene__Title">
        <h3>Three.js Scene GLTF</h3>
      </div>
      <canvas title=""  className="canvaGltf" ref={canvasRef} />
    </div>
  );
}