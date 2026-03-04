import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, MeshWobbleMaterial, Stars, Trail } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─── 3D Character (Low-poly stick figure) ─── */
const Character = ({
  position,
  color,
  isRunning,
  facingRight = true,
  isHit = false,
  isSitting = false,
}: {
  position: [number, number, number];
  color: string;
  isRunning: boolean;
  facingRight?: boolean;
  isHit?: boolean;
  isSitting?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (isRunning) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * 8) * 0.6;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * 8) * 0.6;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.sin(t * 8) * 0.5;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * 8) * 0.5;
      if (groupRef.current) groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 8)) * 0.08;
    } else if (isSitting) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.PI / 2;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.PI / 2;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.PI / 3;
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -Math.PI / 3;
        rightArmRef.current.rotation.z = Math.sin(t * 12) * 0.1; // typing
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = -Math.sin(t * 12 + 1) * 0.1;
      }
    } else {
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
    }

    if (isHit && headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 15) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={facingRight ? [1, 1, 1] : [-1, 1, 1]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color === "dev" ? "#f0c090" : "#f0c0a0"} />
      </mesh>

      {/* Eyes (glasses for dev) */}
      {color === "dev" && (
        <>
          <mesh position={[0.07, 0.88, 0.15]}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-0.07, 0.88, 0.15]}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0.88, 0.15]}>
            <boxGeometry args={[0.04, 0.02, 0.02]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        </>
      )}

      {/* Hair */}
      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.19, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color === "dev" ? "#2a1a0a" : "#4a2010"} />
      </mesh>
      {color !== "dev" && (
        <mesh position={[-0.1, 0.75, -0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.1]} />
          <meshStandardMaterial color="#4a2010" />
        </mesh>
      )}

      {/* Body */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshStandardMaterial color={color === "dev" ? "#1a2a4a" : "#e04080"} />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[0.22, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color={color === "dev" ? "#1a2a4a" : "#f0c0a0"} />
      </mesh>
      <mesh ref={rightArmRef} position={[-0.22, 0.55, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color={color === "dev" ? "#1a2a4a" : "#f0c0a0"} />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLegRef} position={[0.08, 0.12, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color={color === "dev" ? "#222" : "#e04080"} />
      </mesh>
      <mesh ref={rightLegRef} position={[-0.08, 0.12, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color={color === "dev" ? "#222" : "#e04080"} />
      </mesh>
    </group>
  );
};

/* ─── Code Wall ─── */
const CodeWall = ({ visible }: { visible: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
      const glow = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
    if (textRef.current) {
      textRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
    }
  });

  if (!visible) return null;

  return (
    <group position={[0.8, 0.7, 0]}>
      <mesh ref={meshRef} scale={[1, 0.01, 1]}>
        <boxGeometry args={[0.6, 1.4, 0.1]} />
        <meshStandardMaterial
          color="#0a1520"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glowing edges */}
      <mesh scale={[1, 1, 1]}>
        <boxGeometry args={[0.62, 1.42, 0.08]} />
        <meshStandardMaterial
          color="#00ff88"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      {/* Code text on wall */}
      <group position={[0, 0, 0.06]}>
        <Text
          ref={textRef}
          fontSize={0.06}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.5}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff"
        >
          {`const dev = {\n  life: "code",\n  love: null,\n  coffee: Infinity,\n};\n\nwhile(true) {\n  dev.code();\n  dev.debug();\n  dev.deploy();\n}\n\n// no time for love\n// only semicolons`}
        </Text>
      </group>
    </group>
  );
};

/* ─── Laptop ─── */
const Laptop = ({ visible }: { visible: boolean }) => {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1} rotationIntensity={0.02} floatIntensity={0.05}>
      <group position={[0.2, 0.05, 0.3]}>
        {/* Base */}
        <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.35]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0.22, -0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.48, 0.35, 0.015]} />
          <meshStandardMaterial
            color="#0a1520"
            emissive="#00ff88"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Screen glow */}
        <pointLight position={[0, 0.3, 0.1]} color="#00ff88" intensity={0.5} distance={1.5} />
      </group>
    </Float>
  );
};

/* ─── Coffee Cup ─── */
const CoffeeCup = ({ visible }: { visible: boolean }) => {
  const steamRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    steamRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = 0.3 + ((state.clock.elapsedTime * 0.5 + i * 0.3) % 0.4);
        (mesh.material as THREE.MeshStandardMaterial).opacity = 0.4 - ((state.clock.elapsedTime * 0.5 + i * 0.3) % 0.4);
      }
    });
  });

  if (!visible) return null;

  return (
    <group position={[0.8, 0.05, 0.4]}>
      <mesh>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.04, 0.01, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Steam */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) steamRefs.current[i] = el; }}
          position={[-0.02 + i * 0.02, 0.3, 0]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

/* ─── Hearts (floating) ─── */
const FloatingHearts = ({ visible }: { visible: boolean }) => {
  const heartsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((child, i) => {
        child.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3 + i * 0.25;
        child.position.x = -0.3 + Math.sin(state.clock.elapsedTime * 1.5 + i * 2) * 0.15;
        child.rotation.z = Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
      });
    }
  });

  if (!visible) return null;

  return (
    <group ref={heartsRef}>
      {[0, 1, 2].map((i) => (
        <Text
          key={i}
          position={[-0.3, 1.5 + i * 0.25, 0]}
          fontSize={0.15 - i * 0.02}
          color="#ff4080"
        >
          ♥
        </Text>
      ))}
    </group>
  );
};

/* ─── Impact Stars ─── */
const ImpactStars = ({ visible }: { visible: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0.5, 1.3, 0.2]}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const r = 0.25;
        return (
          <Text
            key={i}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
            fontSize={0.12}
            color="#FFD700"
          >
            ★
          </Text>
        );
      })}
    </group>
  );
};

/* ─── Ground ─── */
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial color="#0a0f18" metalness={0.3} roughness={0.8} />
  </mesh>
);

/* ─── Grid Floor ─── */
const GridFloor = () => (
  <gridHelper args={[20, 40, "#00ff8830", "#0066ff15"]} position={[0, -0.04, 0]} />
);

/* ─── Camera Animator ─── */
const CameraAnimator = ({ phase }: { phase: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = phase === 0 ? -0.5 : phase === 1 ? 0.5 : 0.3;
    const targetY = phase === 2 ? 1.8 : 2;
    const targetZ = phase === 2 ? 3.2 : 3.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    camera.lookAt(0.3, 0.5, 0);
  });

  return null;
};

/* ─── Main Scene ─── */
const Scene = ({ phase }: { phase: number }) => {
  const devX = phase === 0 ? -1.5 + Math.min(phase, 1) * 1.5 : 0;
  const girlX = phase === 0 ? 1.5 : 3;

  return (
    <>
      <CameraAnimator phase={phase} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-2, 3, 2]} intensity={0.5} color="#0066ff" />
      <pointLight position={[2, 3, -1]} intensity={0.4} color="#00ff88" />

      <Stars radius={50} depth={30} count={1500} factor={3} saturation={0.5} fade speed={1} />
      <Ground />
      <GridFloor />

      {/* Developer */}
      <DevAnimated phase={phase} />

      {/* Girl */}
      <GirlAnimated phase={phase} />

      <FloatingHearts visible={phase === 0} />
      <CodeWall visible={phase >= 1} />
      <ImpactStars visible={phase === 1} />
      <Laptop visible={phase >= 2} />
      <CoffeeCup visible={phase >= 2} />
    </>
  );
};

/* Animated wrappers to smoothly move characters */
const DevAnimated = ({ phase }: { phase: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const targetX = phase === 0 ? -0.5 : 0;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.03);
  });

  return (
    <group ref={ref} position={[-2, 0, 0]}>
      <Character
        position={[0, 0, 0]}
        color="dev"
        isRunning={phase === 0}
        facingRight={true}
        isHit={phase === 1}
        isSitting={phase >= 2}
      />
    </group>
  );
};

const GirlAnimated = ({ phase }: { phase: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const targetX = phase === 0 ? 2 : 5;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.02);
    if (phase >= 1) {
      ref.current.visible = ref.current.position.x < 4.9;
    }
  });

  return (
    <group ref={ref} position={[2, 0, 0]}>
      <Character
        position={[0, 0, 0]}
        color="girl"
        isRunning={phase === 0}
        facingRight={true}
      />
    </group>
  );
};

/* ─── Main Splash Component ─── */
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2500),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 6500),
      setTimeout(() => onComplete(), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const captions: Record<number, { icon: string; text: string; highlight: string }> = {
    0: { icon: "♥", text: "Chasing the dream...", highlight: "" },
    1: { icon: "💥", text: "Reality.check() → ", highlight: '{ error: "love_not_found" }' },
    2: { icon: ">_", text: "Fine. Let's ", highlight: "build something great." },
  };

  const caption = captions[phase] || captions[2];

  return (
    <AnimatePresence>
      {phase < 3 ? (
        <motion.div
          className="fixed inset-0 z-[9999]"
          style={{ background: "hsl(230 25% 5%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 3D Canvas */}
          <Canvas
            camera={{ position: [-0.5, 2, 3.5], fov: 50 }}
            style={{ position: "absolute", inset: 0 }}
            dpr={[1, 2]}
          >
            <fog attach="fog" args={["#0a0f18", 5, 15]} />
            <Scene phase={phase} />
          </Canvas>

          {/* Caption overlay */}
          <motion.div className="absolute bottom-[12%] text-center w-full px-8 z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                className="font-display text-xl md:text-2xl"
                style={{ color: "hsl(0 0% 75%)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mr-2">{caption.icon}</span>
                {caption.text}
                {caption.highlight && (
                  <span className="font-mono text-base md:text-lg" style={{ color: "hsl(152 100% 50%)" }}>
                    {caption.highlight}
                  </span>
                )}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 z-10">
            <motion.div
              className="h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 50%), hsl(270 100% 60%))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </div>

          {/* Skip button */}
          <button
            onClick={() => { setPhase(3); onComplete(); }}
            className="absolute bottom-6 right-6 z-10 text-xs font-display tracking-widest uppercase opacity-40 hover:opacity-80 transition-opacity"
            style={{ color: "hsl(0 0% 60%)" }}
          >
            Skip →
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
