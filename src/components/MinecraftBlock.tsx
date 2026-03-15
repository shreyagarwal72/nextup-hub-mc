import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const GrassBlock = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      edgesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1.8, 1.8, 1.8), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Main block */}
        <mesh ref={meshRef} geometry={geometry} castShadow>
          <meshStandardMaterial
            color="#4a8c3f"
            roughness={0.8}
            metalness={0.1}
            emissive="#2d5a27"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Wireframe edges for stylized look */}
        <lineSegments ref={edgesRef} geometry={edgesGeometry}>
          <lineBasicMaterial color="#6bc95b" transparent opacity={0.4} />
        </lineSegments>

        {/* Dirt bottom face */}
        <mesh position={[0, -0.91, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6bc95b" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const MinecraftBlock = () => {
  return (
    <div className="w-full h-[220px] md:h-[280px] relative" style={{ willChange: "transform" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#6bc95b" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#4a8c3f" />
        <Suspense fallback={null}>
          <GrassBlock />
          <FloatingParticles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MinecraftBlock;
