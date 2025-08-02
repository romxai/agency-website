"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

// Extend THREE to include WebGPU and TSL features
extend(THREE as any);

// Post-processing component for bloom and full-screen scanline
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");

    // Create an input for the bloom pass that only contains the object.
    // We achieve this by multiplying the scene's color by its alpha channel.
    // This makes transparent areas (alpha=0) black, preventing them from glowing.
    const bloomInput = scenePassColor.mul(scenePassColor.a);
    const bloomPass = bloom(bloomInput, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    // Create a red overlay that follows the scan line
    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    // Mix the original scene with the red overlay.
    // If fullScreenEffect is false, the mix factor is 0, so no red overlay is added.
    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 0.0
    );

    // Add the isolated bloom effect to the scene
    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    // Animate the scan line from top to bottom if the effect is enabled
    if (fullScreenEffect) {
      progressRef.current.value =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    }
    render.renderAsync();
  }, 1);

  return null;
};

// The main scene containing the 3D object with the effect
const Scene = ({
  textureUrl,
  depthMapUrl,
}: {
  textureUrl: string;
  depthMapUrl: string;
}) => {
  const [rawMap, depthMap] = useTexture([textureUrl, depthMapUrl]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  // Set visible to true once textures are loaded to trigger the fade-in animation
  useEffect(() => {
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    // Apply parallax effect based on mouse pointer and depth map
    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(1.0); // Assuming square texture, adjust if needed
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    // Create a procedural dot pattern
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    // Create the depth-aware scanline mask
    const depth = tDepthMap;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Combine dot pattern with scanline mask and color it
    const mask = dot.mul(flow).mul(vec3(10, 0, 0)); // Bright red mask

    // Blend the final mask with the texture
    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0, // Start with 0 opacity for fade-in
    });

    return {
      material,
      uniforms: { uPointer, uProgress },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(1, 1); // Use 1:1 aspect ratio for the plane

  // Animate the scan progress
  useFrame(({ clock }) => {
    uniforms.uProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    // Animate the fade-in of the mesh
    if (
      meshRef.current &&
      "material" in meshRef.current &&
      meshRef.current.material
    ) {
      const mat = meshRef.current.material as any;
      if ("opacity" in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  // Update pointer uniform on mouse move
  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[w, h, 1]}
      material={material}
      rotation={[0, 0, Math.PI / 4]}
    >
      <planeGeometry />
    </mesh>
  );
};

// The main export component that sets up the Canvas
const FuturisticHeroEffect = ({
  textureUrl,
  depthMapUrl,
}: {
  textureUrl: string;
  depthMapUrl: string;
}) => {
  return (
    <Canvas
      flat
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(props as any);
        await renderer.init();
        return renderer;
      }}
      className="w-full h-full"
    >
      <PostProcessing fullScreenEffect={false} strength={0.5} />
      <Scene textureUrl={textureUrl} depthMapUrl={depthMapUrl} />
    </Canvas>
  );
};

export default FuturisticHeroEffect;
