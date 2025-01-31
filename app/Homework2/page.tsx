"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { usePathname } from "next/navigation";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  LoadChairs,
  LoadWhiteBoard,
  LoadDoor,
  LoadLights,
  LoadDesk,
  LoadShelf,
} from "./ClassroomInfrastructure";

export default function Homework2() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<PointerLockControls | null>(null);
  const pathname = usePathname();
  console.log(pathname);

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
    camera.position.set(0, 1.6, 0);
    cameraRef.current = camera;

    // Skybox setup
    const loader = new THREE.CubeTextureLoader();
    const skyboxTexture = loader.load([
      "/textures/CubeTextures/right.jpg",
      "/textures/CubeTextures/left.jpg",
      "/textures/CubeTextures/top.jpg",
      "/textures/CubeTextures/bottom.jpg",
      "/textures/CubeTextures/front.jpg",
      "/textures/CubeTextures/back.jpg",
    ]);
    scene.background = skyboxTexture;
    scene.background.rotation = Math.PI / 2;

    //Load single chair
    // const GLloader = new GLTFLoader();
    // GLloader.load("/objects/single_school_desk/scene.gltf", (Chair) => {
    //   Chair.scene.position.set(0, 1.25, 0);
    //   Chair.scene.rotateY(1.56);
    //   scene.add(Chair.scene);
    // });

    //Load Models
    LoadChairs(scene);
    LoadWhiteBoard(scene);
    LoadDoor(scene);
    LoadLights(scene);
    LoadDesk(scene);
    LoadShelf(scene);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);

    // Overhead lights (two point lights first pair)
    const overheadLight1 = new THREE.PointLight(0xffffff, 5, 200, 1); // Increased distance for smoother light
    overheadLight1.position.set(8, 2.5, -2); // Position above the center of the room
    scene.add(overheadLight1);

    const overheadLight2 = new THREE.PointLight(0xffffff, 5, 200, 1); // Second overhead light with increased distance
    overheadLight2.position.set(8, 2.5, 2); // Position above the back of the room
    scene.add(overheadLight2);

    // Overhead lights (two point lights second pair)
    const overheadLight3 = new THREE.PointLight(0xffffff, 5, 200, 1); // Increased distance for smoother light
    overheadLight3.position.set(0, 2.5, -2); // Position above the center of the room
    scene.add(overheadLight3);

    const overheadLight4 = new THREE.PointLight(0xffffff, 5, 200, 1); // Second overhead light with increased distance
    overheadLight4.position.set(0, 2.5, 2); // Position above the back of the room
    scene.add(overheadLight4);

    // Overhead lights (two point lights third pair)
    const overheadLight5 = new THREE.PointLight(0xffffff, 5, 200, 1); // Increased distance for smoother light
    overheadLight5.position.set(-8, 2.5, -2); // Position above the center of the room
    scene.add(overheadLight5);

    const overheadLight6 = new THREE.PointLight(0xffffff, 5, 200, 1); // Second overhead light with increased distance
    overheadLight6.position.set(-8, 2.5, 2); // Position above the back of the room
    scene.add(overheadLight6);

    // Create classroom elements
    const createClassroom = () => {
      //Textures

      //Floor Textures
      const floorTexture = new THREE.TextureLoader().load(
        "/textures/floor/floor.jpg",
        (textureF) => {
          textureF.wrapS = textureF.wrapT = THREE.RepeatWrapping;
          textureF.repeat.set(2, 2);
        }
      );
      const floorNormTexture = new THREE.TextureLoader().load(
        "/textures/floor/FloorNormal.png",
        (textureF) => {
          textureF.wrapS = textureF.wrapT = THREE.RepeatWrapping;
          textureF.repeat.set(2, 2);
        }
      );
      const floorRoughnessTexture = new THREE.TextureLoader().load(
        "/textures/floor/FloorRoughness.jpg",
        (textureF) => {
          textureF.wrapS = textureF.wrapT = THREE.RepeatWrapping;
          textureF.repeat.set(2, 2);
        }
      );

      //wall texture
      const wallTexture = new THREE.TextureLoader().load(
        "/textures/wall/wall.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      );
      const wallDisplacementTexture = new THREE.TextureLoader().load(
        "/textures/wall/wallDisplacement.tiff",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      );
      const wallNormalTexture = new THREE.TextureLoader().load(
        "/textures/wall/wallNormal.png",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      );
      const wallRoughnessTexture = new THREE.TextureLoader().load(
        "/textures/wall/wallRoughness.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(2, 2);
        }
      );

      // Floor
      const floorGeometry = new THREE.PlaneGeometry(24, 16);
      const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        normalMap: floorNormTexture,
        roughnessMap: floorRoughnessTexture,
        roughness: 1,
      });
      const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
      floorMesh.rotation.x = -Math.PI / 2;
      scene.add(floorMesh);

      // Front wall with a hole
      const createWallWithHole = (
        wallWidth: any,
        wallHeight: any,
        holeWidth: any,
        holeHeight: any,
        holeX: any,
        holeY: any
      ) => {
        const shape = new THREE.Shape();

        // Outer rectangle (the entire wall)
        shape.moveTo(-wallWidth / 2, -wallHeight / 2);
        shape.lineTo(wallWidth / 2, -wallHeight / 2);
        shape.lineTo(wallWidth / 2, wallHeight / 2);
        shape.lineTo(-wallWidth / 2, wallHeight / 2);
        shape.lineTo(-wallWidth / 2, -wallHeight / 2);

        // Inner rectangle (the hole)
        const hole = new THREE.Path();
        hole.moveTo(holeX - holeWidth / 2, holeY - holeHeight / 2);
        hole.lineTo(holeX + holeWidth / 2, holeY - holeHeight / 2);
        hole.lineTo(holeX + holeWidth / 2, holeY + holeHeight / 2);
        hole.lineTo(holeX - holeWidth / 2, holeY + holeHeight / 2);
        hole.lineTo(holeX - holeWidth / 2, holeY - holeHeight / 2);

        // Add the hole to the shape
        shape.holes.push(hole);

        // Create geometry from the shape
        const geometry = new THREE.ShapeGeometry(shape);
        return geometry;
      };

      const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughnessMap: wallRoughnessTexture,
        normalMap: wallNormalTexture,
        displacementMap: wallDisplacementTexture,
        roughness: 0.2,
      });
      const wallWidth = 24;
      const wallHeight = 3;
      const holeWidth = 2.5;
      const holeHeight = 1.5;

      const wallGeometry = createWallWithHole(
        wallWidth,
        wallHeight,
        holeWidth,
        holeHeight,
        0,
        0.5
      );
      const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
      frontWall.position.set(0, wallHeight / 2, -8);
      scene.add(frontWall);

      // Transparent window
      const windowGeometry = new THREE.PlaneGeometry(holeWidth, holeHeight);
      const windowMaterial = new THREE.MeshPhysicalMaterial({
        metalness: 0,
        roughness: 0.5,
        envMapIntensity: 0.9,
        clearcoat: 0.5,
        transparent: true,
        transmission: 0.95,
        opacity: 1,
        reflectivity: 0.2,
      });
      const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
      windowMesh.position.set(0, 2, -8);
      scene.add(windowMesh);

      // Other walls
      const backWallGeometry = new THREE.BoxGeometry(24, 3, 0.1);
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.set(0, 1.5, 8);
      scene.add(backWall);

      const leftWallGeometry = new THREE.BoxGeometry(0.1, 3, 16);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.set(-12, 1.5, 0);
      scene.add(leftWall);

      const rightWallGeometry = new THREE.BoxGeometry(0.1, 3, 16);
      const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
      rightWall.position.set(12, 1.5, 0);
      scene.add(rightWall);

      // Ceiling
      const ceilingGeometry = new THREE.PlaneGeometry(24, 16);
      const ceilingMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughnessMap: wallRoughnessTexture,
        normalMap: wallNormalTexture,
        displacementMap: wallDisplacementTexture,
        roughness: 0.2,
      });
      const ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
      ceilingMesh.rotation.x = Math.PI / 2;
      ceilingMesh.position.y = 3;
      scene.add(ceilingMesh);
    };

    createClassroom();

    // Pointer Lock Controls
    const controls = new PointerLockControls(camera, document.body);
    controlsRef.current = controls;

    //Deprecated, might need to remove later
    scene.add(controls.getObject());

    mountRef.current.addEventListener("click", () => controls.lock());

    // Movement handling
    let moveForward = false,
      moveBackward = false,
      moveLeft = false,
      moveRight = false;

    const handleKeyDown = (event: any) => {
      switch (event.code) {
        case "KeyW":
          moveForward = true;
          break;
        case "KeyS":
          moveBackward = true;
          break;
        case "KeyA":
          moveLeft = true;
          break;
        case "KeyD":
          moveRight = true;
          break;
      }
    };

    const handleKeyUp = (event: any) => {
      switch (event.code) {
        case "KeyW":
          moveForward = false;
          break;
        case "KeyS":
          moveBackward = false;
          break;
        case "KeyA":
          moveLeft = false;
          break;
        case "KeyD":
          moveRight = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (moveForward) controls.moveForward(0.1);
      if (moveBackward) controls.moveForward(-0.1);
      if (moveLeft) controls.moveRight(-0.1);
      if (moveRight) controls.moveRight(0.1);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full ">
      <div className="absolute text-blue-950 text-2xl top-0 right-0 animate-pulse">
        Left click to move camera - W A S D to move!
      </div>
    </div>
  );
}
