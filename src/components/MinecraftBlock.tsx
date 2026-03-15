import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Environment } from "@react-three/drei";
import { useRef, useMemo, Suspense, useCallback, useState } from "react";
import * as THREE from "three";

// Generate a procedural pixel texture for minecraft faces
const usePixelTexture = (colors: string[][], size: number) => {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const pixelSize = size / colors.length;
    for (let y = 0; y < colors.length; y++) {
      for (let x = 0; x < colors[y].length; x++) {
        ctx.fillStyle = colors[y][x];
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [colors, size]);
};

const grassTopPixels = (() => {
  const g = ["#5a9c3e", "#4a8c2e", "#6aac4e", "#3d7a22", "#58a040", "#4e9435", "#68a848", "#3f8025"];
  const grid: string[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: string[] = [];
    for (let x = 0; x < 16; x++) {
      row.push(g[Math.floor(Math.abs(Math.sin(x * 13.7 + y * 7.3) * g.length)) % g.length]);
    }
    grid.push(row);
  }
  return grid;
})();

const dirtPixels = (() => {
  const d = ["#8B5E3C", "#7A5030", "#9B6E4C", "#6A4525", "#8C6040", "#7B5535", "#9A6B48", "#6E4828"];
  const grid: string[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: string[] = [];
    for (let x = 0; x < 16; x++) {
      row.push(d[Math.floor(Math.abs(Math.sin(x * 11.3 + y * 9.7) * d.length)) % d.length]);
    }
    grid.push(row);
  }
  return grid;
})();

const grassSidePixels = (() => {
  const g = ["#5a9c3e", "#4a8c2e", "#6aac4e", "#3d7a22"];
  const d = ["#8B5E3C", "#7A5030", "#9B6E4C", "#6A4525", "#8C6040", "#7B5535"];
  const grid: string[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: string[] = [];
    for (let x = 0; x < 16; x++) {
      if (y < 3) {
        row.push(g[Math.floor(Math.abs(Math.sin(x * 5.1 + y * 3.3) * g.length)) % g.length]);
      } else if (y < 5) {
        // Transition zone
        const mix = Math.sin(x * 7.7) > 0;
        row.push(mix ? g[Math.floor(Math.abs(Math.sin(x * 2.3) * g.length)) % g.length] : d[Math.floor(Math.abs(Math.sin(x * 4.1 + y * 2.7) * d.length)) % d.length]);
      } else {
        row.push(d[Math.floor(Math.abs(Math.sin(x * 4.1 + y * 2.7) * d.length)) % d.length]);
      }
    }
    grid.push(row);
  }
  return grid;
})();

const GrassBlock = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const topTex = usePixelTexture(grassTopPixels, 256);
  const sideTex = usePixelTexture(grassSidePixels, 256);
  const bottomTex = usePixelTexture(dirtPixels, 256);

  // 6 materials: +x, -x, +y, -y, +z, -z
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }),
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }),
    new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.9, metalness: 0.0 }),
    new THREE.MeshStandardMaterial({ map: bottomTex, roughness: 0.95, metalness: 0.0 }),
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }),
    new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }),
  ], [topTex, sideTex, bottomTex]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      groupRef.current.rotation.y += 0.003;
    }
  });

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group
        ref={groupRef}
        scale={hovered ? 1.08 : 1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh material={materials} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
        </mesh>

        {/* Subtle glow on hover */}
        {hovered && (
          <mesh scale={[2, 2, 2]}>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshBasicMaterial color="#6bc95b" transparent opacity={0.06} side={THREE.BackSide} />
          </mesh>
        )}
      </group>
    </Float>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const green = new THREE.Color("#6bc95b");
    const brown = new THREE.Color("#8B5E3C");
    const cyan = new THREE.Color("#4fc3f7");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = [green, brown, cyan][Math.floor(Math.random() * 3)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#6bc95b" />
      <pointLight position={[0, 4, 2]} intensity={0.6} color="#4fc3f7" distance={12} />
      <pointLight position={[-3, -1, -2]} intensity={0.3} color="#8B5E3C" distance={10} />

      <GrassBlock />
      <FloatingParticles />

      {/* Touch/drag orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        dampingFactor={0.08}
        enableDamping
        // Touch support
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  );
};

const MinecraftBlock = () => {
  return (
    <div
      className="w-full h-[260px] md:h-[340px] relative cursor-grab active:cursor-grabbing"
      style={{ willChange: "transform", touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          
        }}
        style={{ background: "transparent" }}
        dpr={[2, 4]}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Interaction hint */}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-foreground/25 font-mono tracking-widest pointer-events-none select-none">
        DRAG TO ROTATE
      </p>
    </div>
  );
};

export default MinecraftBlock;
