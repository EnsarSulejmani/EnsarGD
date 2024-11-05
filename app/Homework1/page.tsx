"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

export default function Homework1() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry and Material Declarations
    const smallBuilding = new THREE.BoxGeometry(1, 2, 1);
    const largeBuilding = new THREE.BoxGeometry(1, 2, 2);
    const roadGeo = new THREE.PlaneGeometry(1, 5);
    const plain = new THREE.PlaneGeometry(10, 12, 10, 10);
    const roundaboutGeo = new THREE.CircleGeometry(1, 20, 1, 7);

    const grayBuilding = new THREE.MeshStandardMaterial({ color: 0xdbd3d3 });
    const CyanBuilding = new THREE.MeshStandardMaterial({ color: 0x0ce1e8 });
    const grass = new THREE.MeshStandardMaterial({ color: 0x027812 });
    const pavement = new THREE.MeshStandardMaterial({ color: 0x353835 });

    // Meshes
    const terrain = new THREE.Mesh(plain, grass);
    const ITsupport = new THREE.Mesh(smallBuilding, grayBuilding);
    const building815 = new THREE.Mesh(smallBuilding, CyanBuilding);
    const building816 = new THREE.Mesh(smallBuilding, CyanBuilding);
    const round = new THREE.Mesh(roundaboutGeo, pavement);
    const FofCS = new THREE.Mesh(largeBuilding, CyanBuilding);
    const road1 = new THREE.Mesh(roadGeo, pavement);
    const road2 = new THREE.Mesh(roadGeo, pavement);

    /* Positioning */
    ITsupport.position.set(3, 0.5, 2); // Mirrored X
    ITsupport.rotation.z = 0.5; // Adjust rotation for mirroring
    round.position.set(0, 0.001, 0);
    road1.position.set(0, 0.001, -2.5);
    road2.position.set(1.5, 0.001, 2.5); // Mirrored X
    road2.rotation.z = 0.5; // Adjust rotation for mirroring
    FofCS.position.set(-2, 1, 2); // Mirrored X
    FofCS.rotation.z = -1.6;
    building815.position.set(-1.5, 0.5, -2); // Mirrored X
    building816.position.set(-1.5, 0.5, -4.5); // Mirrored X

    scene.add(
      terrain,
      round,
      FofCS,
      building815,
      building816,
      road1,
      road2,
      ITsupport
    );

    // Apply rotations for top-down view
    [
      ITsupport,
      building815,
      building816,
      FofCS,
      road1,
      road2,
      round,
      terrain,
    ].forEach((mesh) => {
      mesh.rotation.x = -Math.PI / 2;
    });

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Outline setup with inherited color
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const outlineMaterial = object.material.clone();
        outlineMaterial.color = new THREE.Color(
          object.material.color
        ).offsetHSL(0, 0, -0.25); // Darken the color
        outlineMaterial.side = THREE.BackSide; // Make it appear behind the object

        const outlineMesh = object.clone();
        outlineMesh.material = outlineMaterial;
        outlineMesh.scale.multiplyScalar(1.05); // Slightly larger than the original mesh
        scene.add(outlineMesh);
      }
    });

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft light for all objects
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Stronger light from a direction
    directionalLight.position.set(10, 10, 10);
    scene.add(ambientLight, directionalLight);

    // Animation Loop
    const animate = () => {
      controls.maxPolarAngle = Math.PI / 2;
      controls.minPolarAngle = Math.PI / 4;
      controls.update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    renderer.setClearColor(0xd1ffff, 1);

    // Cleanup on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full overflow-x-hidden" />;
}
