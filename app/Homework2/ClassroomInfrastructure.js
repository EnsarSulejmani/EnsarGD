import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Function to populate the classroom with a 4x6 grid of chairs.
 * @param {THREE.Scene} scene - The Three.js scene to add the chairs.
 */
export function LoadChairs(scene) {
  const numRows = 4; // Number of chair rows
  const numCols = 6; // Number of chair columns
  const chairSpacingX = 2.5; // Spacing between chairs along X-axis
  const chairSpacingZ = 3; // Spacing between chairs along Z-axis

  // GLTF Loader (load the model once and clone it later)
  const GLloader = new GLTFLoader();
  GLloader.load("/objects/single_school_desk/scene.gltf", (gltf) => {
    // Enable shadows for chair parts
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Loop to position chairs in a 4x6 grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Clone the loaded chair model
        const chairClone = gltf.scene.clone();

        // Calculate position to center the grid in the room
        const posX = -((numCols - 1) * chairSpacingX) / 2 + col * chairSpacingX;
        const posZ = -((numRows - 1) * chairSpacingZ) / 2 + row * chairSpacingZ;

        // Position and rotate each chair
        chairClone.position.set(posX, 1.25, posZ);
        chairClone.rotation.y = Math.PI / 2; // Face forward

        console.log(`Chair placed at`);
        scene.add(chairClone);
      }
    }
  });
}

export function LoadWhiteBoard(scene) {
  const GLloader = new GLTFLoader();
  GLloader.load(
    "/objects/whiteboard/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.02, 0.02, 0.02);

      gltf.scene.position.set(11.9, -1, 0);
      gltf.scene.rotation.y = -Math.PI / 2; // Face towards the chairs

      scene.add(gltf.scene);
      console.log("Whiteboard loaded:", gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error loading whiteboard:", error);
    }
  );
}

export function LoadDoor(scene) {
  const GLloader = new GLTFLoader();
  GLloader.load(
    "/objects/realistic_static_door/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.4, 0.4, 0.4);

      gltf.scene.position.set(8, 1.2, 7.9);
      gltf.scene.rotation.y = Math.PI / 2; // Face towards the chairs

      scene.add(gltf.scene);
      console.log("Whiteboard loaded:", gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error loading whiteboard:", error);
    }
  );
}

export function LoadLights(scene) {
  const GLloader = new GLTFLoader();
  GLloader.load(
    "/objects/ceiling_light/scene.gltf",
    (gltf) => {
      const lightPositions = [
        { x: 8, y: 2.98, z: -2 }, // Front left
        { x: 8, y: 2.98, z: 2 }, // Front Right
        { x: 0, y: 2.98, z: -2 }, // Center left
        { x: 0, y: 2.98, z: 2 }, // Center right
        { x: -8, y: 2.98, z: -2 }, // Back left
        { x: -8, y: 2.98, z: 2 }, // Back right
      ];

      lightPositions.forEach((pos, index) => {
        const lightClone = gltf.scene.clone();
        lightClone.scale.set(0.4, 0.4, 0.4);
        lightClone.position.set(pos.x, pos.y, pos.z);

        scene.add(lightClone);
        console.log(`Light ${index + 1} placed at:`, pos);
      });
    },
    undefined,
    (error) => {
      console.error("Error loading whiteboard:", error);
    }
  );
}

export function LoadDesk(scene) {
  const GLloader = new GLTFLoader();
  GLloader.load(
    "/objects/office_desk/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(1.25, 1.25, 1.25);

      gltf.scene.position.set(8.5, 0, -3);
      gltf.scene.rotation.y = Math.PI / 2; // Face towards the chairs

      scene.add(gltf.scene);
      console.log("Whiteboard loaded:", gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error loading whiteboard:", error);
    }
  );
}

export function LoadShelf(scene) {
  const GLloader = new GLTFLoader();
  GLloader.load(
    "/objects/metal_shelf_file_14mb/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(1.25, 1.25, 1.25);

      gltf.scene.position.set(-6, 0, 7.5);
      gltf.scene.rotation.y = Math.PI; // Face towards the chairs

      scene.add(gltf.scene);
      console.log("Whiteboard loaded:", gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error loading whiteboard:", error);
    }
  );
}
