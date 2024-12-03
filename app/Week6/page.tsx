"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";

const Week6: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Emissive Material and Glowing Cube
    const emissiveMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      emissive: 0x00ff00,
      emissiveIntensity: 0.8,
    });
    const glowingCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      emissiveMaterial
    );
    scene.add(glowingCube);

    // Phong Material and Shining Sphere
    const phongMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      specular: 0xff0000,
      shininess: 100,
    });
    const shiningSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      phongMaterial
    );
    shiningSphere.position.x = 2;
    scene.add(shiningSphere);

    // Transparent Material and Plane
    const transparentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.7,
    });
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      transparentMaterial
    );
    scene.add(plane);

    // Transparent Box
    const transparentBox = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.5, 1),
      transparentMaterial
    );
    transparentBox.position.x = 1;
    scene.add(transparentBox);

    // Interpolated Color and Cube
    const startColor = new THREE.Color(0xff0000);
    const endColor = new THREE.Color(0x0000ff);
    const interpolatedColor = startColor.clone().lerp(endColor, 0.5);
    const interpolatedMaterial = new THREE.MeshBasicMaterial({
      color: interpolatedColor,
    });
    const interpolatedCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      interpolatedMaterial
    );
    interpolatedCube.position.y = 1;
    scene.add(interpolatedCube);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera setup
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    camera.position.x = 1;
    scene.add(camera);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Handle window resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener("resize", handleResize);

    // Render the scene
    renderer.render(scene, camera);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-screen bg-black" id="scene"></div>
  );
};

export default Week6;
