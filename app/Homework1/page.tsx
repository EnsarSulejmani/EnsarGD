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
    camera.position.set(0, -4, 4);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    //IT support
    ITsupport.position.set(-3, 2, 0.5);
    ITsupport.rotateZ(10);

    //Road
    road2.rotateZ(0.5);
    round.position.set(0, 0, 0.001);
    road1.position.set(0, -2.5, 0.1);
    road2.position.set(-1.5, 2.5, 0.1);

    //FSC
    FofCS.position.set(2, 2, 1);
    FofCS.rotateZ(1.6);

    //815
    building815.position.set(1.5, -2, 0.5);

    //815
    building816.position.set(1.5, -4.5, 0.5);

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

    // Orbitacl Controlls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation Loop
    const animate = () => {
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
