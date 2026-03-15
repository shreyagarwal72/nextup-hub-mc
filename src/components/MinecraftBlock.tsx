import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, Suspense, useCallback, useState } from "react";
import * as THREE from "three";

/**
 * High-res procedural texture generator.
 * Renders pixel-art at native resolution then generates a normal map for depth.
 */
const createDetailedTexture = (
  pixelGrid: string[][],
  resolution: number,
  generateNormal = false
) => {
  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d")!;
  const gridSize = pixelGrid.length;
  const cellSize = resolution / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = pixelGrid[y][x];
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

      // Sub-pixel noise for depth
      const noiseCount = Math.floor(cellSize * 0.6);
      for (let n = 0; n < noiseCount; n++) {
        const nx = x * cellSize + Math.random() * cellSize;
        const ny = y * cellSize + Math.random() * cellSize;
        const brightness = Math.random() > 0.5 ? 255 : 0;
        const alpha = Math.random() * 0.08;
        ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${alpha})`;
        ctx.fillRect(nx, ny, 1.5, 1.5);
      }

      // Subtle cell border groove
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x * cellSize + 0.5, y * cellSize + 0.5, cellSize - 1, cellSize - 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;

  let normalMap: THREE.CanvasTexture | null = null;
  if (generateNormal) {
    const nCanvas = document.createElement("canvas");
    nCanvas.width = resolution;
    nCanvas.height = resolution;
    const nCtx = nCanvas.getContext("2d")!;
    const imgData = ctx.getImageData(0, 0, resolution, resolution);
    const nData = nCtx.createImageData(resolution, resolution);

    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        const idx = (y * resolution + x) * 4;
        const l = x > 0 ? imgData.data[idx - 4] : imgData.data[idx];
        const r = x < resolution - 1 ? imgData.data[idx + 4] : imgData.data[idx];
        const u = y > 0 ? imgData.data[idx - resolution * 4] : imgData.data[idx];
        const d = y < resolution - 1 ? imgData.data[idx + resolution * 4] : imgData.data[idx];

        nData.data[idx] = 128 + (l - r) * 0.5;
        nData.data[idx + 1] = 128 + (u - d) * 0.5;
        nData.data[idx + 2] = 255;
        nData.data[idx + 3] = 255;
      }
    }
    nCtx.putImageData(nData, 0, 0);
    normalMap = new THREE.CanvasTexture(nCanvas);
    normalMap.magFilter = THREE.LinearFilter;
    normalMap.minFilter = THREE.LinearMipmapLinearFilter;
  }

  return { texture, normalMap };
};

// Seeded pseudo-random for deterministic textures
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
};

// 32x32 grass top with flowers/pebbles detail
const grassTopPixels = (() => {
  const base = ["#5a9c3e", "#4a8c2e", "#6aac4e", "#3d7a22", "#58a040", "#4e9435", "#68a848", "#3f8025", "#52983a", "#47892b", "#5fa545", "#449030"];
  const grid: string[][] = [];
  for (let y = 0; y < 32; y++) {
    const row: string[] = [];
    for (let x = 0; x < 32; x++) {
      const seed = x * 127.1 + y * 311.7;
      const idx = Math.floor(seededRandom(seed) * base.length);
      let color = base[idx];
      // Occasional darker grass patch
      if (seededRandom(seed + 100) > 0.92) color = "#2d6b1a";
      // Rare yellow flower pixel
      if (seededRandom(seed + 200) > 0.97) color = "#e8d44d";
      // Rare red flower pixel
      if (seededRandom(seed + 300) > 0.985) color = "#c94040";
      row.push(color);
    }
    grid.push(row);
  }
  return grid;
})();

// 32x32 dirt with stone/gravel detail
const dirtPixels = (() => {
  const base = ["#8B5E3C", "#7A5030", "#9B6E4C", "#6A4525", "#8C6040", "#7B5535", "#9A6B48", "#6E4828", "#856038", "#7E5832", "#946A44", "#724E2A"];
  const grid: string[][] = [];
  for (let y = 0; y < 32; y++) {
    const row: string[] = [];
    for (let x = 0; x < 32; x++) {
      const seed = x * 269.5 + y * 183.3;
      const idx = Math.floor(seededRandom(seed) * base.length);
      let color = base[idx];
      // Small stone pebbles
      if (seededRandom(seed + 50) > 0.94) color = "#a0937e";
      // Dark root-like spots
      if (seededRandom(seed + 150) > 0.96) color = "#4a3520";
      row.push(color);
    }
    grid.push(row);
  }
  return grid;
})();

// 32x32 side with detailed grass-to-dirt transition
const grassSidePixels = (() => {
  const g = ["#5a9c3e", "#4a8c2e", "#6aac4e", "#3d7a22", "#52983a", "#47892b"];
  const gDark = ["#3a7025", "#2d6b1a", "#458a30"];
  const d = ["#8B5E3C", "#7A5030", "#9B6E4C", "#6A4525", "#8C6040", "#7B5535", "#856038", "#724E2A"];
  const grid: string[][] = [];

  for (let y = 0; y < 32; y++) {
    const row: string[] = [];
    for (let x = 0; x < 32; x++) {
      const seed = x * 157.3 + y * 243.1;

      // Organic grass edge with sine wave variation
      const grassEdge = 5 + Math.sin(x * 0.8) * 1.5 + Math.sin(x * 2.1 + 1.0) * 0.8;

      if (y < grassEdge - 2) {
        // Pure grass top
        const idx = Math.floor(seededRandom(seed) * g.length);
        let c = g[idx];
        if (seededRandom(seed + 80) > 0.88) c = gDark[Math.floor(seededRandom(seed + 90) * gDark.length)];
        // Grass blade highlights
        if (y < 2 && seededRandom(seed + 120) > 0.85) c = "#72b858";
        row.push(c);
      } else if (y < grassEdge + 2) {
        // Organic transition zone
        const blend = seededRandom(seed + 44);
        if (blend > 0.45) {
          const idx = Math.floor(seededRandom(seed + 10) * g.length);
          row.push(gDark[Math.min(idx, gDark.length - 1)]);
        } else {
          const idx = Math.floor(seededRandom(seed + 20) * d.length);
          row.push(d[idx]);
        }
      } else {
        // Dirt body
        const idx = Math.floor(seededRandom(seed) * d.length);
        let c = d[idx];
        if (seededRandom(seed + 60) > 0.93) c = "#a0937e"; // pebble
        if (seededRandom(seed + 70) > 0.96) c = "#4a3520"; // dark spot
        row.push(c);
      }
    }
    grid.push(row);
  }
  return grid;
})();

const GrassBlock = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { topData, sideData, bottomData } = useMemo(() => ({
    topData: createDetailedTexture(grassTopPixels, 512, true),
    sideData: createDetailedTexture(grassSidePixels, 512, true),
    bottomData: createDetailedTexture(dirtPixels, 512, true),
  }), []);

  const materials = useMemo(() => {
    const makeMat = (data: { texture: THREE.CanvasTexture; normalMap: THREE.CanvasTexture | null }, roughness: number) => {
      const mat = new THREE.MeshStandardMaterial({
        map: data.texture,
        roughness,
        metalness: 0.02,
      });
      if (data.normalMap) {
        mat.normalMap = data.normalMap;
        mat.normalScale = new THREE.Vector2(0.3, 0.3);
      }
      return mat;
    };

    return [
      makeMat(sideData, 0.82),   // +x
      makeMat(sideData, 0.82),   // -x
      makeMat(topData, 0.88),    // +y
      makeMat(bottomData, 0.92), // -y
      makeMat(sideData, 0.82),   // +z
      makeMat(sideData, 0.82),   // -z
    ];
  }, [topData, sideData, bottomData]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
      <group
        ref={groupRef}
        scale={hovered ? 1.06 : 1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Main block with beveled edges via rounded geometry */}
        <mesh material={materials} castShadow receiveShadow>
          <boxGeometry args={[1.9, 1.9, 1.9]} />
        </mesh>

        {/* Edge highlight lines */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.91, 1.91, 1.91)]} />
          <lineBasicMaterial color="#000000" transparent opacity={0.08} />
        </lineSegments>

        {/* Hover glow shell */}
        {hovered && (
          <mesh scale={[1.15, 1.15, 1.15]}>
            <boxGeometry args={[1.9, 1.9, 1.9]} />
            <meshBasicMaterial color="#6bc95b" transparent opacity={0.05} side={THREE.BackSide} />
          </mesh>
        )}

        {/* Ambient occlusion shadow underneath */}
        <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.2, 2.2]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const palette = [
      new THREE.Color("#6bc95b"),
      new THREE.Color("#8B5E3C"),
      new THREE.Color("#4fc3f7"),
      new THREE.Color("#e8d44d"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.015 + Math.random() * 0.04;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      {/* Rich multi-source lighting for full 3D depth */}
      <ambientLight intensity={0.35} color="#f0f0ff" />

      {/* Key light - warm sunlight */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-bias={-0.001}
        color="#fff5e6"
      />

      {/* Fill light - cool blue */}
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#88bbff" />

      {/* Rim/back light - green accent */}
      <directionalLight position={[0, -2, -6]} intensity={0.25} color="#6bc95b" />

      {/* Top accent */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" distance={15} decay={2} />

      {/* Bottom bounce */}
      <pointLight position={[0, -4, 2]} intensity={0.2} color="#8B5E3C" distance={10} decay={2} />

      {/* Side accents */}
      <spotLight position={[4, 2, 4]} intensity={0.3} angle={0.6} penumbra={1} color="#4fc3f7" distance={12} />
      <spotLight position={[-4, 2, -4]} intensity={0.2} angle={0.6} penumbra={1} color="#e8d44d" distance={12} />

      <GrassBlock />
      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
        dampingFactor={0.06}
        enableDamping
        rotateSpeed={0.8}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />
    </>
  );
};

const MinecraftBlock = () => {
  return (
    <div
      className="w-full h-[280px] md:h-[360px] relative cursor-grab active:cursor-grabbing"
      style={{ willChange: "transform", touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [2.5, 1.5, 3.5], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: "transparent" }}
        dpr={[2, 4]}
        shadows="soft"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-foreground/20 font-mono tracking-widest pointer-events-none select-none">
        DRAG TO ROTATE
      </p>
    </div>
  );
};

export default MinecraftBlock;
