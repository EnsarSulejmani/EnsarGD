"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeJSSceneProps = {};

const Week4: React.FC<ThreeJSSceneProps> = () => {
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const orthographicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 100,
      specular: 0x555555,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 100,
      specular: 0x555555,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      shininess: 100,
      specular: 0x555555,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    box.position.x = -4;
    sphere.position.x = 4;
    cylinder.position.z = 1;

    scene.add(box);
    scene.add(sphere);
    scene.add(cylinder);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Cameras
    const orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0, 100);
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 10;
    camera.position.y = 2;
    scene.add(camera);

    orthoCamera.position.z = 5;

    // Renderers
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const orthoRenderer = new THREE.WebGLRenderer();
    orthoRenderer.setSize(sizes.width, sizes.height);
    orthoRenderer.setPixelRatio(window.devicePixelRatio);

    if (perspectiveRef.current) {
      perspectiveRef.current.appendChild(renderer.domElement);
    }

    if (orthographicRef.current) {
      orthographicRef.current.appendChild(orthoRenderer.domElement);
    }

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      orthoRenderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener("resize", handleResize);

    renderer.setClearColor(new THREE.Color("rgb(20, 20, 20)"));
    orthoRenderer.render(scene, orthoCamera);

    const animate = () => {
      requestAnimationFrame(animate);
      box.rotation.y += 0.1;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      orthoRenderer.dispose();

      if (perspectiveRef.current) {
        perspectiveRef.current.innerHTML = "";
      }

      if (orthographicRef.current) {
        orthographicRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div id="perspective" ref={perspectiveRef} style={{ flex: 1 }}></div>
      <div id="orthographic" ref={orthographicRef} style={{ flex: 1 }}></div>
    </div>
  );
};

export default Week4;
