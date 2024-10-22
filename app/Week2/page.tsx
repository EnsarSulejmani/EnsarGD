"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Week2() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    //Scene Setup
    const scene = new THREE.Scene();

    //Box Definition
    // const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const BoxMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   wireframe: true,
    // });

    //box Declaration
    // const box = new THREE.Mesh(BoxGeometry, BoxMaterial);
    // scene.add(box);

    // Helper function to generate random positions between min and max
    const randomPosition = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    for (var i = 0; i < 100; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.set(
        randomPosition(-10, 10), // X axis
        randomPosition(-10, 10), // Y axis
        randomPosition(-10, 10) // Z axis
      );

      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01;
        renderer.render(scene, camera);
      };

      scene.add(sphere);
    }

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 3;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full  overflow-x-hidden " />;
}
