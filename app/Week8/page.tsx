"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

const Week8 = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
    directionalLight.position.set(1, 0.25, 0);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.8);
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xff9000, 1.5, 0, 2);
    pointLight.position.set(1, -0.5, 1);
    scene.add(pointLight);

    const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
    reactAreaLight.position.set(-1.5, 0, 1.5);
    reactAreaLight.lookAt(new THREE.Vector3());
    scene.add(reactAreaLight);

    const spotLight = new THREE.SpotLight(
      0x78ff00,
      4.5,
      10,
      Math.PI * 0.1,
      0.25,
      1
    );
    spotLight.position.set(0, 2, 3);
    spotLight.target.position.x = -0.75;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Light Helpers
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(
      hemisphereLight,
      0.2
    );
    scene.add(hemisphereLightHelper);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      0.2
    );
    scene.add(directionalLightHelper);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(pointLightHelper);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight);
    scene.add(rectAreaLightHelper);

    // Materials
    const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

    // Objects
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
    );
    sphere.position.x = -1.5;

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      material
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 32, 64),
      material
    );
    torus.position.x = 1.5;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = -0.65;

    scene.add(sphere, cube, torus, plane);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(1, 1, 2);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Resize listener
    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onResize);

    // Animation
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      sphere.rotation.y = 0.1 * elapsedTime;
      cube.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      cube.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;

      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      scene.clear();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default Week8;
