import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ServicePalette {
  primary: string;
  accent: string;
}

/** Read the site's purple palette from the global CSS tokens so the 3D
 * scene always matches the theme without hardcoding colors. */
export function readServicePalette(): ServicePalette {
  try {
    const styles = getComputedStyle(document.documentElement);
    const parse = (token: string, fallback: string) => {
      const raw = styles.getPropertyValue(token).trim();
      const parts = raw.split(/\s+/).map(Number);
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
        const color = new THREE.Color();
        color.setHSL(parts[0] / 360, parts[1] / 100, parts[2] / 100);
        return `#${color.getHexString()}`;
      }
      return fallback;
    };
    return {
      primary: parse("--primary", "#a855f7"),
      accent: parse("--accent", "#7c3aed"),
    };
  } catch {
    return { primary: "#a855f7", accent: "#7c3aed" };
  }
}

/* ------------------------------------------------------------------ */
/* 3D objects — one per service                                        */
/* ------------------------------------------------------------------ */

function darkMetal() {
  return <meshStandardMaterial color="#2a2138" metalness={0.6} roughness={0.3} />;
}

function ChatbotObject({ palette }: { palette: ServicePalette }) {
  return (
    <group>
      {/* chat bubble */}
      <mesh scale={[1.15, 0.95, 0.9]}>
        <sphereGeometry args={[1.05, 48, 32]} />
        <meshStandardMaterial color="#221a2e" metalness={0.55} roughness={0.3} />
      </mesh>
      <mesh position={[-0.6, -1.02, 0.1]} rotation={[Math.PI, 0, -0.5]}>
        <coneGeometry args={[0.26, 0.5, 20]} />
        <meshStandardMaterial color="#221a2e" metalness={0.55} roughness={0.3} />
      </mesh>
      {/* glowing robot face */}
      <mesh position={[-0.34, 0.18, 0.84]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[0.34, 0.18, 0.84]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[0, -0.14, 0.9]}>
        <boxGeometry args={[0.4, 0.055, 0.06]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={1.6} />
      </mesh>
      {/* antenna */}
      <mesh position={[0, 1.14, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
        <meshStandardMaterial color="#3a2d4a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.36, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.6} />
      </mesh>
    </group>
  );
}

function PhoneCallerObject({ palette }: { palette: ServicePalette }) {
  const waves = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!waves.current) return;
    waves.current.children.forEach((child, i) => {
      const pulse = Math.sin(clock.elapsedTime * 3 - i * 0.9);
      child.scale.setScalar(1 + 0.1 * pulse);
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.opacity = 0.45 + 0.35 * pulse;
    });
  });
  return (
    <group rotation={[0, -0.45, 0]}>
      {/* handset ear + mouth pieces */}
      <mesh position={[-0.95, -0.35, 0]}>
        <sphereGeometry args={[0.42, 32, 24]} />
        {darkMetal()}
      </mesh>
      <mesh position={[0.95, -0.35, 0]}>
        <sphereGeometry args={[0.42, 32, 24]} />
        {darkMetal()}
      </mesh>
      {/* bridge arc */}
      <mesh position={[0, -0.35, 0]}>
        <torusGeometry args={[0.95, 0.15, 16, 40, Math.PI]} />
        {darkMetal()}
      </mesh>
      {/* purple sound waves */}
      <group ref={waves} position={[1.6, -0.35, 0.3]} rotation={[0, Math.PI / 2 - 0.4, 0]}>
        {[0.38, 0.62, 0.86].map((r) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.025, 8, 32, Math.PI * 0.9]} />
            <meshStandardMaterial
              color={palette.primary}
              emissive={palette.primary}
              emissiveIntensity={1.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function NodeLinks({
  palette,
  origin,
  radius = 1.55,
  count = 4,
}: {
  palette: ServicePalette;
  origin: [number, number, number];
  radius?: number;
  count?: number;
}) {
  const nodes = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(count * 6), 3));
    return g;
  }, [count]);
  useFrame(({ clock }) => {
    const group = nodes.current;
    const attr = lines.current?.geometry.getAttribute("position") as THREE.BufferAttribute | null;
    if (!group) return;
    group.children.forEach((child, i) => {
      const a = clock.elapsedTime * 0.6 + (i * Math.PI * 2) / count;
      child.position.set(
        origin[0] + Math.cos(a) * radius,
        origin[1] + Math.sin(a * 1.4) * 0.55,
        origin[2] + Math.sin(a) * radius * 0.6
      );
    });
    if (attr) {
      group.children.forEach((child, i) => {
        attr.setXYZ(i * 2, origin[0], origin[1], origin[2]);
        attr.setXYZ(i * 2 + 1, child.position.x, child.position.y, child.position.z);
      });
      attr.needsUpdate = true;
    }
  });
  return (
    <group>
      <mesh position={origin}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
      </mesh>
      <group ref={nodes}>
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
      <lineSegments ref={lines} geometry={geometry}>
        <lineBasicMaterial color={palette.primary} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

function AgentObject({ palette }: { palette: ServicePalette }) {
  const gear = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (gear.current) gear.current.rotation.z += delta * 1.2;
  });
  const teeth = useMemo(() => Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4), []);
  return (
    <group>
      {/* robot body */}
      <mesh position={[0, -0.55, 0]}>
        <capsuleGeometry args={[0.5, 0.75, 8, 24]} />
        {darkMetal()}
      </mesh>
      <mesh position={[0, -0.45, 0.46]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.2} />
      </mesh>
      {/* head */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.44, 32, 24]} />
        {darkMetal()}
      </mesh>
      <mesh position={[0, 0.58, 0.34]} scale={[1, 0.55, 0.5]}>
        <sphereGeometry args={[0.24, 24, 16]} />
        <meshStandardMaterial color="#0b0810" metalness={0.4} roughness={0.15} />
      </mesh>
      <mesh position={[-0.1, 0.6, 0.44]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.6} />
      </mesh>
      <mesh position={[0.1, 0.6, 0.44]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.6} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.25, 8]} />
        <meshStandardMaterial color="#3a2d4a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.6} />
      </mesh>
      {/* floating gear */}
      <group ref={gear} position={[0.95, 1.45, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 24]} />
          <meshStandardMaterial
            color={palette.accent}
            metalness={0.8}
            roughness={0.25}
            emissive={palette.accent}
            emissiveIntensity={0.25}
          />
        </mesh>
        {teeth.map((a) => (
          <mesh key={a} position={[Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.12, 0.12, 0.1]} />
            <meshStandardMaterial color={palette.accent} metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </group>
      <NodeLinks palette={palette} origin={[0, 0.9, 0]} />
    </group>
  );
}

function LeadGenObject({ palette }: { palette: ServicePalette }) {
  return (
    <group rotation={[0.35, 0, 0.15]}>
      {[1.15, 0.8, 0.45].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.07, 16, 64]} />
          <meshStandardMaterial
            color={i === 2 ? palette.primary : "#2a2138"}
            emissive={i === 2 ? palette.primary : "#000000"}
            emissiveIntensity={i === 2 ? 1.8 : 0}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.22, 24, 16]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
      </mesh>
      {/* arrow hitting the target */}
      <group position={[1.15, 1.05, 0.45]} rotation={[0, 0, -2.3]}>
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 12]} />
          <meshStandardMaterial color="#e8e4f0" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh>
          <coneGeometry args={[0.14, 0.35, 16]} />
          <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={1.6} />
        </mesh>
      </group>
    </group>
  );
}

function UGCVideoObject({ palette }: { palette: ServicePalette }) {
  return (
    <group rotation={[0, -0.4, 0]}>
      {/* camera body */}
      <mesh>
        <boxGeometry args={[1.5, 0.95, 0.8]} />
        {darkMetal()}
      </mesh>
      {/* lens barrel */}
      <mesh position={[0.95, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.34, 0.5, 24]} />
        <meshStandardMaterial color="#1b1524" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[1.22, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2} />
      </mesh>
      {/* record light */}
      <mesh position={[-0.55, 0.32, 0.42]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.6} />
      </mesh>
      {/* top handle + viewfinder */}
      <mesh position={[0, 0.62, -0.1]}>
        <boxGeometry args={[0.7, 0.14, 0.3]} />
        <meshStandardMaterial color="#1b1524" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.85, 0.2, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.4]} />
        <meshStandardMaterial color="#1b1524" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* glow ring */}
      <mesh position={[1.55, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.5, 0.02, 8, 48]} />
        <meshStandardMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={1.4}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function WebDesignObject({ palette }: { palette: ServicePalette }) {
  return (
    <group rotation={[0, 0.5, 0]}>
      {/* browser window */}
      <mesh>
        <boxGeometry args={[2.1, 1.4, 0.12]} />
        <meshStandardMaterial color="#1b1524" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.56, 0.01]}>
        <boxGeometry args={[2.1, 0.26, 0.14]} />
        {darkMetal()}
      </mesh>
      {[-0.9, -0.75, -0.6].map((x) => (
        <mesh key={x} position={[x, 0.56, 0.09]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2} />
        </mesh>
      ))}
      {/* hero block */}
      <mesh position={[0, 0.1, 0.07]}>
        <boxGeometry args={[1.8, 0.42, 0.03]} />
        <meshStandardMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>
      {/* content lines */}
      <mesh position={[-0.25, -0.28, 0.07]}>
        <boxGeometry args={[1.3, 0.07, 0.03]} />
        <meshStandardMaterial color="#3a2d4a" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[-0.4, -0.45, 0.07]}>
        <boxGeometry args={[1.0, 0.07, 0.03]} />
        <meshStandardMaterial color="#3a2d4a" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* cursor */}
      <group position={[0.75, -0.45, 0.3]} rotation={[0, 0, -0.6]}>
        <mesh>
          <coneGeometry args={[0.09, 0.26, 3]} />
          <meshStandardMaterial color="#e8e4f0" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

const OBJECTS: ((props: { palette: ServicePalette }) => JSX.Element)[] = [
  ChatbotObject,
  PhoneCallerObject,
  AgentObject,
  LeadGenObject,
  UGCVideoObject,
  WebDesignObject,
];

/* ------------------------------------------------------------------ */
/* Stage: glowing platform, orbit ring, floating particles             */
/* ------------------------------------------------------------------ */

function Platform({ palette }: { palette: ServicePalette }) {
  const orbs = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (orbs.current) orbs.current.rotation.y += delta * 0.7;
  });
  return (
    <group position={[0, -1.55, 0]}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[2.15, 2.35, 0.16, 48]} />
        <meshStandardMaterial color="#15101c" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.02, 0.035, 12, 72]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 8, 72]} />
        <meshStandardMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={1.2}
          transparent
          opacity={0.55}
        />
      </mesh>
      <group ref={orbs}>
        {[0, 1, 2].map((i) => {
          const a = (i * Math.PI * 2) / 3;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.5, 0.1, Math.sin(a) * 2.5]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={2.4} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Particles({ palette, count = 36 }: { palette: ServicePalette; count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 7,
        y: Math.random() * 6 - 3,
        z: (Math.random() - 0.5) * 3 - 0.5,
        s: 0.02 + Math.random() * 0.045,
        v: 0.15 + Math.random() * 0.35,
        ph: Math.random() * Math.PI * 2,
      })),
    [count]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    seeds.forEach((p, i) => {
      const y = ((p.y + t * p.v + 3) % 6) - 3;
      dummy.position.set(p.x + Math.sin(t * 0.5 + p.ph) * 0.15, y, p.z);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={palette.primary} transparent opacity={0.45} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Object rig — slow rotation, float, mouse tilt, slide transitions    */
/* ------------------------------------------------------------------ */

interface RigProps {
  objectIndex: number;
  phase: "in" | "out";
  direction: number;
  palette: ServicePalette;
}

function ObjectRig({ objectIndex, phase, direction, palette }: RigProps) {
  const group = useRef<THREE.Group>(null);
  const anim = useRef({ t: 0, x0: 2.6, x1: 0, o0: 0, o1: 1, dur: 0.45, exiting: false, hold: false });

  useEffect(() => {
    const d = direction >= 0 ? 1 : -1;
    if (phase === "out") {
      anim.current = { t: 0, x0: 0, x1: -2.6 * d, o0: 1, o1: 0, dur: 0.3, exiting: true, hold: false };
    } else {
      anim.current = { t: 0, x0: 2.6 * d, x1: 0, o0: 0, o1: 1, dur: 0.45, exiting: false, hold: false };
    }
  }, [objectIndex, phase, direction]);

  useFrame((state, rawDelta) => {
    const g = group.current;
    if (!g) return;
    const delta = Math.min(rawDelta, 0.05);
    const a = anim.current;
    if (!a.hold) {
      a.t = Math.min(a.t + delta, a.dur);
      if (a.t >= a.dur) a.hold = true;
      const k = a.t / a.dur;
      const e = a.exiting ? k * k * k : 1 - Math.pow(1 - k, 3);
      g.position.x = THREE.MathUtils.lerp(a.x0, a.x1, e);
      const opacity = THREE.MathUtils.lerp(a.o0, a.o1, e);
      g.traverse((child) => {
        const mat = (child as THREE.Mesh).material as THREE.Material | undefined;
        if (mat && !Array.isArray(mat)) {
          mat.transparent = true;
          mat.opacity = opacity;
        }
      });
    }
    g.rotation.y += delta * 0.35;
    g.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.12 + 0.15;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.22, 1 - Math.exp(-4 * delta));
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.14, 1 - Math.exp(-4 * delta));
  });

  const Obj = OBJECTS[objectIndex % OBJECTS.length];
  return <group ref={group}>{Obj ? <Obj palette={palette} /> : null}</group>;
}

/* ------------------------------------------------------------------ */
/* Canvas wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function ServiceShowcase({
  index,
  phase,
  direction,
}: {
  index: number;
  phase: "in" | "out";
  direction: number;
}) {
  const palette = useMemo(readServicePalette, []);
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.7, 6.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <pointLight position={[-4.5, 2.5, 3]} intensity={40} color={palette.primary} />
        <pointLight position={[3.5, -1.5, 4]} intensity={18} color={palette.accent} />
        <Platform palette={palette} />
        <Particles palette={palette} />
        <ObjectRig objectIndex={index} phase={phase} direction={direction} palette={palette} />
      </Canvas>
    </div>
  );
}

export type { LucideIcon };
