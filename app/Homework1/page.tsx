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
    // camera.position.set(0, -4, 4);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //Geometry declaration
    const smallBuilding = new THREE.BoxGeometry(1, 2, 1);
    const largeBuilding = new THREE.BoxGeometry(1, 2, 2);
    const roadGeo = new THREE.PlaneGeometry(1, 5);
    const plain = new THREE.PlaneGeometry(10, 10);
    const roundaboutGeo = new THREE.CircleGeometry(1, 20, 1, 7);
    //Material Declaration
    const grayBuilding = new THREE.MeshBasicMaterial({ color: 0xdbd3d3 });
    const CyanBuilding = new THREE.MeshBasicMaterial({ color: 0x0ce1e8 });
    const grass = new THREE.MeshBasicMaterial({ color: 0x027812 });
    const pavement = new THREE.MeshBasicMaterial({ color: 0x353835 });

    //Mesh
    const terrain = new THREE.Mesh(plain, grass);
    const ITsupport = new THREE.Mesh(smallBuilding, grayBuilding);
    const building815 = new THREE.Mesh(smallBuilding, CyanBuilding);
    const building816 = new THREE.Mesh(smallBuilding, CyanBuilding);
    const round = new THREE.Mesh(roundaboutGeo, pavement);
    const FofCS = new THREE.Mesh(largeBuilding, CyanBuilding);
    const road1 = new THREE.Mesh(roadGeo, pavement);
    const road2 = new THREE.Mesh(roadGeo, pavement);

    /* Positioning */

    // IT Support
    ITsupport.position.set(3, 0.5, 2); // Mirrored X
    ITsupport.rotation.z = 0.5; // Adjust rotation for mirroring

    // Roundabout (center)
    round.position.set(0, 0.001, 0);

    // Roads
    road1.position.set(0, 0.1, -2.5);
    road2.position.set(1.5, 0.1, 2.5); // Mirrored X
    road2.rotation.z = 0.5; // Adjust rotation for mirroring

    // Faculty of Computer Science
    FofCS.position.set(-2, 1, 2); // Mirrored X
    FofCS.rotation.z = -1.6; // Adjust rotation for mirroring

    // Building 815
    building815.position.set(-1.5, 0.5, -2); // Mirrored X

    // Building 816
    building816.position.set(-1.5, 0.5, -4.5); // Mirrored X

    //render
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

    //Rotations
    ITsupport.rotation.x = -Math.PI / 2;
    building815.rotation.x = -Math.PI / 2;
    building816.rotation.x = -Math.PI / 2;
    FofCS.rotation.x = -Math.PI / 2;
    road1.rotation.x = -Math.PI / 2;
    road2.rotation.x = -Math.PI / 2;
    round.rotation.x = -Math.PI / 2;
    terrain.rotation.x = -Math.PI / 2;

    // Orbitacl Controlls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation Loop
    const animate = () => {
      // Restrict Orbit Controls to top-down
      controls.maxPolarAngle = Math.PI / 2; // Limits camera to the top
      controls.minPolarAngle = Math.PI / 4; // Gives a slightly angled top-down view
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
  return <div ref={mountRef} className="w-full h-full  overflow-x-hidden" />;
}
