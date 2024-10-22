"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { gsap } from "gsap";

const Week3 = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 20, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Sphere Geometry & Material
    const sphereGeo = new THREE.SphereGeometry(10, 32, 32);
    const sphereMat = new THREE.PointsMaterial({
      color: new THREE.Color("rgb(255, 255, 100)"),
      size: 0.25,
    });

    // Particle System (Sphere)
    const particleSystem = new THREE.Points(sphereGeo, sphereMat);
    particleSystem.name = "particleSystem";
    scene.add(particleSystem);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("rgb(20, 20, 20)"));

    // Append renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // GSAP Animation (rotating the sphere)
    gsap.to(particleSystem.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    // Animation Loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full overflow-x-hidden " />;
};

export default Week3;
