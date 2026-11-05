import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useTheme, AccentTheme } from '../context/ThemeContext.tsx';
import { Cpu, Play, Pause } from 'lucide-react';

interface Hero3DCanvasProps {
  className?: string;
}

type ModeType = 'neural' | 'quantum' | 'constellation';

// Reusable math vectors for zero garbage collection in render loop
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const { accentTheme, setAccentTheme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<ModeType>('neural');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(false);

  // References for mutable animation state
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    coreGroup?: THREE.Group;
    innerCoreMesh?: THREE.Mesh;
    outerWireframeMesh?: THREE.LineSegments;
    ring1?: THREE.Mesh;
    ring2?: THREE.Mesh;
    particles?: THREE.Points;
    grid?: THREE.GridHelper;
    frameId?: number;
    colorScheme?: AccentTheme;
    mode?: ModeType;
    paused?: boolean;
  }>({});

  // Update color scheme when accentTheme changes
  useEffect(() => {
    sceneRef.current.colorScheme = accentTheme;
    updateColors(accentTheme);
  }, [accentTheme]);

  useEffect(() => {
    sceneRef.current.mode = activeMode;
    updateModeVisuals(activeMode);
  }, [activeMode]);

  useEffect(() => {
    sceneRef.current.paused = isPaused;
  }, [isPaused]);

  const updateColors = (scheme: AccentTheme) => {
    const { innerCoreMesh, outerWireframeMesh, ring1, ring2, particles } = sceneRef.current;
    let primaryHex = 0x2563eb; // Executive Cobalt
    let secondaryHex = 0x60a5fa;

    if (scheme === 'emerald') {
      primaryHex = 0x10b981; // Tech Emerald
      secondaryHex = 0x34d399;
    } else if (scheme === 'cyan') {
      primaryHex = 0x06b6d4; // Data Cyan
      secondaryHex = 0x38bdf8;
    }

    if (innerCoreMesh && (innerCoreMesh.material as THREE.MeshStandardMaterial)) {
      const mat = innerCoreMesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(primaryHex);
      mat.emissive.setHex(primaryHex);
      mat.emissiveIntensity = 0.4;
    }

    if (outerWireframeMesh && (outerWireframeMesh.material as THREE.LineBasicMaterial)) {
      const mat = outerWireframeMesh.material as THREE.LineBasicMaterial;
      mat.color.setHex(secondaryHex);
    }

    if (ring1 && (ring1.material as THREE.MeshStandardMaterial)) {
      (ring1.material as THREE.MeshStandardMaterial).color.setHex(primaryHex);
      (ring1.material as THREE.MeshStandardMaterial).emissive.setHex(primaryHex);
    }
    if (ring2 && (ring2.material as THREE.MeshStandardMaterial)) {
      (ring2.material as THREE.MeshStandardMaterial).color.setHex(secondaryHex);
      (ring2.material as THREE.MeshStandardMaterial).emissive.setHex(secondaryHex);
    }

    if (particles && (particles.material as THREE.PointsMaterial)) {
      (particles.material as THREE.PointsMaterial).color.setHex(secondaryHex);
    }
  };

  const updateModeVisuals = (mode: ModeType) => {
    const { innerCoreMesh, outerWireframeMesh, ring1, ring2, particles } = sceneRef.current;
    if (!innerCoreMesh || !outerWireframeMesh || !ring1 || !ring2 || !particles) return;

    if (mode === 'neural') {
      innerCoreMesh.visible = true;
      outerWireframeMesh.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      particles.visible = true;
      innerCoreMesh.scale.set(1, 1, 1);
    } else if (mode === 'quantum') {
      innerCoreMesh.visible = true;
      outerWireframeMesh.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      particles.visible = false;
      innerCoreMesh.scale.set(1.25, 1.25, 1.25);
    } else if (mode === 'constellation') {
      innerCoreMesh.visible = false;
      outerWireframeMesh.visible = true;
      ring1.visible = false;
      ring2.visible = false;
      particles.visible = true;
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b12, 0.045);

    // Camera - Centered right at origin (0, 0, 5.2) looking at (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // Lighting (Corporate Clean Key + Subtle Rim)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x3b82f6, 0x080b12, 1.1);
    scene.add(hemiLight);

    const rimLight = new THREE.PointLight(0x60a5fa, 2.5, 10);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // Composite 3D procedural object - strictly centered at origin (0, 0, 0)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    // 1. Inner core: Octahedron (optimized scale)
    const innerGeom = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCoreMesh);

    // 2. Outer Wireframe: Icosahedron cage (centered & balanced)
    const outerGeom = new THREE.IcosahedronGeometry(1.28, 1);
    const wireframeGeom = new THREE.WireframeGeometry(outerGeom);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.55,
    });
    const outerWireframeMesh = new THREE.LineSegments(wireframeGeom, wireframeMat);
    coreGroup.add(outerWireframeMesh);

    // 3. Torus Ring 1 (compact radius so it never bleeds or clips)
    const ring1Geom = new THREE.TorusGeometry(1.68, 0.016, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Torus Ring 2
    const ring2Geom = new THREE.TorusGeometry(1.95, 0.014, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Orbital Particles (Neural network vector nodes)
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particles);

    // 6. Perspective Grid Floor (positioned cleanly beneath core)
    const grid = new THREE.GridHelper(14, 22, 0x1e3a8a, 0x1e293b);
    grid.position.y = -1.65;
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    scene.add(grid);

    // Save references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      coreGroup,
      innerCoreMesh,
      outerWireframeMesh,
      ring1,
      ring2,
      particles,
      grid,
      colorScheme: accentTheme,
      mode: activeMode,
      paused: false,
    };

    updateColors(accentTheme);

    // Mouse movement tracking with subtle tilt around center
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _targetRotation.x = y * 0.25;
      _targetRotation.y = x * 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameId: number;

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!sceneRef.current.paused) {
        coreGroup.rotation.y += delta * 0.3;
        coreGroup.rotation.x += delta * 0.1;

        ring1.rotation.z += delta * 0.38;
        ring2.rotation.z -= delta * 0.25;
        particles.rotation.y -= delta * 0.1;

        const breath = 1.0 + Math.sin(elapsed * 1.4) * 0.03;
        outerWireframeMesh.scale.set(breath, breath, breath);

        grid.position.z = (elapsed * 0.2) % 0.6;
      }

      // Smooth exponential damping toward pointer interaction while keeping center locked
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 4, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 4, delta);

      coreGroup.position.x = _currentRotation.y * 0.35;
      coreGroup.position.y = _currentRotation.x * 0.25;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    sceneRef.current.frameId = frameId;

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      innerGeom.dispose();
      innerMat.dispose();
      outerGeom.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      grid.geometry.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0c1220]/75 backdrop-blur-md shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Clean Unboxed Section Identifier */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-slate-400 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        <span>Modelo 3D Interactivo · Red Neuronal</span>
      </div>

      <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 pointer-events-none select-none">
        SENATI · Quinto Ciclo
      </div>

      {/* Discrete Bottom Control Toolbar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md transition-all duration-300">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="mb-1 px-3 py-1 text-[11px] font-sans font-medium text-slate-400 hover:text-white bg-slate-900/90 border border-slate-700/60 rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
            aria-label="Controles del modelo 3D"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>{isControlsExpanded ? 'Ocultar ajustes' : 'Personalizar modelo 3D'}</span>
          </button>

          {isControlsExpanded && (
            <div className="w-full bg-slate-950/95 border border-slate-800 rounded-xl p-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
              {/* Visual Modes */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveMode('neural')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeMode === 'neural'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Neuronal
                </button>
                <button
                  onClick={() => setActiveMode('quantum')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeMode === 'quantum'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Estructura
                </button>
                <button
                  onClick={() => setActiveMode('constellation')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeMode === 'constellation'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Datos Vectoriales
                </button>
              </div>

              {/* Accent & Pause */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => setAccentTheme('cobalt')}
                    title="Cobalto Ejecutivo"
                    className={`w-3.5 h-3.5 rounded-full bg-blue-600 transition-all cursor-pointer ${
                      accentTheme === 'cobalt' ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                  <button
                    onClick={() => setAccentTheme('cyan')}
                    title="Cian IA"
                    className={`w-3.5 h-3.5 rounded-full bg-cyan-400 transition-all cursor-pointer ${
                      accentTheme === 'cyan' ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                  <button
                    onClick={() => setAccentTheme('emerald')}
                    title="Esmeralda Tech"
                    className={`w-3.5 h-3.5 rounded-full bg-emerald-500 transition-all cursor-pointer ${
                      accentTheme === 'emerald' ? 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1 px-2 text-[11px] font-sans text-slate-400 hover:text-white border border-slate-800 rounded bg-slate-900/80 cursor-pointer flex items-center gap-1"
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
                  <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
