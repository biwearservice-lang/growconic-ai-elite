import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import fontData from "@/assets/journal-bold.typeface.json";
import { introTimeline, smooth } from "@/lib/journalIntro";

export type IntroPalette = { black: string; blue: string; white: string };
const font = new FontLoader().parse(fontData);

const shineVertex = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const shineFragment = `
  uniform vec3 uBlue;
  uniform vec3 uWhite;
  uniform float uSweep;
  uniform float uOpacity;
  varying vec3 vPosition;
  void main() {
    float band = exp(-pow((vPosition.x - uSweep) * 5.0, 2.0));
    gl_FragColor = vec4(mix(uBlue, uWhite, band * 0.65), band * uOpacity);
  }
`;

function Letter({ geometry, index, x, y, startedAt, palette }: {
  geometry: TextGeometry; index: number; x: number; y: number; startedAt: number; palette: IntroPalette;
}) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const uniforms = useMemo(() => ({
    uBlue: { value: new THREE.Color(palette.blue) },
    uWhite: { value: new THREE.Color(palette.white) },
    uSweep: { value: -20 }, uOpacity: { value: 0 },
  }), [palette]);
  useFrame(() => {
    const t = (performance.now() - startedAt) / 1000;
    const p = smooth((t - 1 - index * 0.025) / 0.8);
    if (group.current) {
      group.current.visible = t >= 1;
      group.current.position.set(x, y + (1 - p) * (index % 2 ? 0.4 : -0.4), (1 - p) * -3);
      group.current.rotation.set((1 - p) * 0.3, (1 - p) * (index % 2 ? -0.6 : 0.6), 0);
      group.current.scale.setScalar(0.8 + p * 0.2);
    }
    if (material.current) material.current.opacity = p;
    uniforms.uSweep.value = -9 + introTimeline(t).sweep * 18 - x;
    uniforms.uOpacity.value = t >= 2.2 && t <= 2.6 ? 0.9 : 0;
  });
  return <group ref={group} visible={false}>
    <mesh geometry={geometry}>
      <meshStandardMaterial ref={material} color={palette.white} emissive={palette.blue}
        emissiveIntensity={0.06} metalness={0.48} roughness={0.19} transparent opacity={0} />
    </mesh>
    <mesh geometry={geometry} position-z={0.006}>
      <shaderMaterial uniforms={uniforms} vertexShader={shineVertex} fragmentShader={shineFragment}
        transparent depthWrite={false} toneMapped={false} />
    </mesh>
  </group>;
}

function Particles({ startedAt, palette }: { startedAt: number; palette: IntroPalette }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => Array.from({ length: 96 }, (_, i) => {
    const angle = i * 2.39996;
    const radius = 4 + (i % 11) * 0.65;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.6, z: -10 - (i % 13), delay: (i % 9) * 0.019 };
  }), []);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(96 * 6), 3));
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(() => {
    const t = (performance.now() - startedAt) / 1000;
    if (!mesh.current || !lines.current) return;
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    seeds.forEach((seed, i) => {
      const p = smooth((t - seed.delay) / (1 - seed.delay));
      const residual = t > 1 ? smooth((t - 1) / 1.3) * 0.22 : 0;
      const x = seed.x * (1 - p + residual);
      const y = seed.y * (1 - p + residual);
      const z = seed.z * (1 - p) - residual;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar((0.013 + (i % 3) * 0.008) * (1 - smooth((t - 1) / 0.6)));
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
      attribute.setXYZ(i * 2, x, y, z);
      attribute.setXYZ(i * 2 + 1, x + seed.x * 0.06 * (1 - p), y + seed.y * 0.06 * (1 - p), z - 1.2 * (1 - p));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    attribute.needsUpdate = true;
    const opacity = smooth(t / 0.15) * (1 - smooth((t - 0.85) / 0.4));
    if (material.current) material.current.opacity = opacity;
    if (lineMaterial.current) lineMaterial.current.opacity = opacity * 0.7;
  });
  return <>
    <instancedMesh ref={mesh} args={[undefined, undefined, 96]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshBasicMaterial ref={material} color={palette.blue} toneMapped={false} transparent opacity={0} />
    </instancedMesh>
    <lineSegments ref={lines} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial ref={lineMaterial} color={palette.blue} toneMapped={false} transparent opacity={0} />
    </lineSegments>
  </>;
}

export default function JournalIntroScene({ startedAt, palette, reducedMotion }: {
  startedAt: number; palette: IntroPalette; reducedMotion: boolean;
}) {
  const { size, viewport } = useThree();
  const mobile = size.width < 640;
  const title = useRef<THREE.Group>(null);
  const underline = useRef<THREE.Mesh>(null);
  const sweepLight = useRef<THREE.PointLight>(null);
  const letters = useMemo(() => {
    const rows = mobile ? ["IMRAN'S", "JOURNAL"] : ["IMRAN'S JOURNAL"];
    let index = 0;
    return rows.flatMap((text, row) => {
      let offset = 0;
      const glyphs = [...text].map((character) => {
        if (character === " ") { offset += 0.4; return null; }
        const geometry = new TextGeometry(character, { font, size: 1, depth: 0.12,
          curveSegments: 5, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 2 });
        geometry.computeBoundingBox();
        const width = geometry.boundingBox ? geometry.boundingBox.max.x - geometry.boundingBox.min.x : 0.5;
        const result = { geometry, index: index++, x: offset, y: mobile ? 0.4 - row * 1.3 : -0.35 };
        offset += width + 0.07;
        return result;
      });
      return glyphs.filter((glyph): glyph is NonNullable<typeof glyph> => glyph !== null)
        .map((glyph) => ({ ...glyph, x: glyph.x - offset / 2 }));
    });
  }, [mobile]);
  useEffect(() => () => letters.forEach(({ geometry }) => geometry.dispose()), [letters]);
  const width = mobile ? 5.55 : 10.8;
  const scale = Math.min(viewport.width * 0.82 / width, viewport.height * 0.5 / (mobile ? 2.7 : 1.8), 1);
  useFrame(({ camera }) => {
    const t = (performance.now() - startedAt) / 1000;
    const timeline = introTimeline(t);
    camera.position.z = reducedMotion ? 10 : 10 - smooth(t / 2.6) * 0.25;
    if (title.current) title.current.scale.setScalar(scale * (1 - (1 - timeline.fade) * 0.1));
    if (underline.current) {
      const draw = smooth((t - 1.35) / 0.8);
      underline.current.scale.x = draw;
      underline.current.position.x = -width * 0.33 * (1 - draw);
      underline.current.visible = t >= 1.35;
    }
    if (sweepLight.current) {
      sweepLight.current.position.x = (-width / 2 + timeline.sweep * width) * scale;
      sweepLight.current.intensity = t >= 2.2 && t <= 2.6 ? 8 * Math.sin(timeline.sweep * Math.PI) : 0;
    }
  });
  return <>
    <ambientLight color={palette.white} intensity={0.65} />
    <directionalLight color={palette.white} position={[0, 3, 5]} intensity={2.2} />
    <directionalLight color={palette.blue} position={[-4, 1, -2]} intensity={3} />
    <pointLight ref={sweepLight} color={palette.blue} position={[0, 0, 0.8]} intensity={0} />
    <Environment resolution={64}>
      <Lightformer color={palette.white} intensity={2} position={[0, 4, 3]} scale={[12, 2, 1]} />
      <Lightformer color={palette.blue} intensity={2} position={[-4, 0, 2]} scale={[2, 8, 1]} />
    </Environment>
    {!reducedMotion && <Particles startedAt={startedAt} palette={palette} />}
    <group ref={title} scale={scale}>
      {letters.map((letter) => <Letter key={letter.index} {...letter} startedAt={startedAt} palette={palette} />)}
      <mesh ref={underline} position={[0, mobile ? -1.32 : -0.75, 0]} visible={false}>
        <boxGeometry args={[width * 0.66, 0.012, 0.012]} />
        <meshBasicMaterial color={palette.blue} toneMapped={false} />
      </mesh>
    </group>
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.38} luminanceThreshold={0.55} luminanceSmoothing={0.25} mipmapBlur resolutionScale={0.5} />
    </EffectComposer>
  </>;
}