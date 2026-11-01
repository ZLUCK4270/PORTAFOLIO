import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useTheme } from '../context/ThemeContext.tsx';

interface Hero3DCanvasProps {
  className?: string;
}

type ModeType = 'neural' | 'quantum' | 'constellation';
type ColorScheme = 'crimson' | 'cyan' | 'emerald' | 'violet';

// Module-scope reusable math vectors for zero garbage collection in render loop
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const { accentTheme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<ModeType>('neural');
  const [activeColor, setActiveColor] = useState<ColorScheme>(accentTheme);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(true);

  // Sync with global accent theme when changed
  useEffect(() => {
    setActiveColor(accentTheme);
  }, [accentTheme]);

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
    colorScheme?: ColorScheme;
    mode?: ModeType;
    paused?: boolean;
  }>({});

  // Update color and mode refs
  useEffect(() => {
    sceneRef.current.colorScheme = activeColor;
    updateColors(activeColor);
  }, [activeColor]);

  useEffect(() => {
    sceneRef.current.mode = activeMode;
    updateModeVisuals(activeMode);
  }, [activeMode]);

  useEffect(() => {
    sceneRef.current.paused = isPaused;
  }, [isPaused]);

  const updateColors = (scheme: ColorScheme) => {
    const { innerCoreMesh, outerWireframeMesh, ring1, ring2, particles } = sceneRef.current;
    let primaryHex = 0x06b6d4; // Cyan
    let secondaryHex = 0x38bdf8;

    if (scheme === 'crimson') {
      primaryHex = 0xdc2626; // Ruby / Crimson warrior blade
      secondaryHex = 0xf43f5e; // Fiery crimson highlight
    } else if (scheme === 'emerald') {
      primaryHex = 0x10b981; // Emerald
      secondaryHex = 0x34d399;
    } else if (scheme === 'violet') {
      primaryHex = 0x8b5cf6; // Violet
      secondaryHex = 0xa78bfa;
    }

    if (innerCoreMesh && (innerCoreMesh.material as THREE.MeshStandardMaterial)) {
      const mat = innerCoreMesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(primaryHex);
      mat.emissive.setHex(primaryHex);
      mat.emissiveIntensity = 0.45;
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
      innerCoreMesh.scale.set(1.4, 1.4, 1.4);
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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b11, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.8);

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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Reflection
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback if environment setup encounters issues
    }

    // Lighting (Warm Key + Cool Fill)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x06b6d4, 0x090b10, 1.2);
    scene.add(hemiLight);

    const blueRimLight = new THREE.PointLight(0x38bdf8, 3.5, 10);
    blueRimLight.position.set(-4, -2, -2);
    scene.add(blueRimLight);

    // Composite 3D procedural object (Multi-part THREE.Group)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner core: Octahedron faceted jewel
    const innerGeom = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCoreMesh);

    // 2. Outer Wireframe: Icosahedron cage
    const outerGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const wireframeGeom = new THREE.WireframeGeometry(outerGeom);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });
    const outerWireframeMesh = new THREE.LineSegments(wireframeGeom, wireframeMat);
    coreGroup.add(outerWireframeMesh);

    // 3. Torus Ring 1 (Horizontal axis tilt)
    const ring1Geom = new THREE.TorusGeometry(2.0, 0.02, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Torus Ring 2 (Vertical opposing tilt)
    const ring2Geom = new THREE.TorusGeometry(2.35, 0.015, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Orbital Particles / Neural Data Nodes
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particles);

    // 6. Perspective Grid Floor
    const grid = new THREE.GridHelper(18, 30, 0x0e7490, 0x1e293b);
    grid.position.y = -2.2;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
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
      colorScheme: activeColor,
      mode: activeMode,
      paused: false,
    };

    // Mouse movement tracking with normalized coordinate offset
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _targetRotation.x = y * 0.45;
      _targetRotation.y = x * 0.65;
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
        // Continuous organic rotation
        coreGroup.rotation.y += delta * 0.4;
        coreGroup.rotation.x += delta * 0.15;

        ring1.rotation.z += delta * 0.5;
        ring2.rotation.z -= delta * 0.35;
        particles.rotation.y -= delta * 0.15;

        // Subtle breathing scale pulse
        const breath = 1.0 + Math.sin(elapsed * 1.5) * 0.04;
        outerWireframeMesh.scale.set(breath, breath, breath);

        // Grid gentle drift
        grid.position.z = (elapsed * 0.3) % 0.6;
      }

      // Smooth exponential damping toward pointer interaction
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 4, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 4, delta);

      coreGroup.position.x = _currentRotation.y * 0.8;
      coreGroup.position.y = _currentRotation.x * 0.5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    sceneRef.current.frameId = frameId;

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
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
    <div className={`relative w-full h-full min-h-[460px] md:min-h-[560px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800/80 bg-[#090d16]/60 backdrop-blur-xs ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Decorative Corner Accents */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-mono text-cyan-400/80 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        <span>NÚCLEO 3D INTERACTIVO // THREE.JS</span>
      </div>

      <div className="absolute top-3 right-3 text-xs font-mono text-slate-500 pointer-events-none select-none">
        SENATI · IA & SOFTWARE
      </div>

      {/* Collapsible Bottom Dock (Consolidated controls, zero viewport occlusion) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-lg transition-all duration-300">
        <div className="flex flex-col items-center">
          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="mb-1.5 px-3 py-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-slate-900/90 border border-slate-700/60 rounded-full shadow-lg transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Alternar controles 3D"
          >
            <span>{isControlsExpanded ? '▾ Ocultar Controles' : '▴ Controles 3D'}</span>
          </button>

          {/* Unified Bottom Control Panel */}
          {isControlsExpanded && (
            <div className="w-full bg-slate-950/95 border border-slate-800/90 rounded-xl p-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
              {/* Visual Modes */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Modo:</span>
                <button
                  onClick={() => setActiveMode('neural')}
                  className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] cursor-pointer ${
                    activeMode === 'neural'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Neuronal
                </button>
                <button
                  onClick={() => setActiveMode('quantum')}
                  className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] cursor-pointer ${
                    activeMode === 'quantum'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Cuántica
                </button>
                <button
                  onClick={() => setActiveMode('constellation')}
                  className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] cursor-pointer ${
                    activeMode === 'constellation'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Datos
                </button>
              </div>

              {/* Color Themes & Pause */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => setActiveColor('crimson')}
                    title="Carmesí Furia (Guerrero)"
                    className={`w-4 h-4 rounded-full bg-red-500 transition-all cursor-pointer ${
                      activeColor === 'crimson' ? 'ring-2 ring-red-400 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                  <button
                    onClick={() => setActiveColor('cyan')}
                    title="Cian Neón"
                    className={`w-4 h-4 rounded-full bg-cyan-400 transition-all cursor-pointer ${
                      activeColor === 'cyan' ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                  <button
                    onClick={() => setActiveColor('emerald')}
                    title="Esmeralda IA"
                    className={`w-4 h-4 rounded-full bg-emerald-400 transition-all cursor-pointer ${
                      activeColor === 'emerald' ? 'ring-2 ring-emerald-300 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                  <button
                    onClick={() => setActiveColor('violet')}
                    title="Violeta Cyber"
                    className={`w-4 h-4 rounded-full bg-purple-500 transition-all cursor-pointer ${
                      activeColor === 'violet' ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 border border-slate-800 rounded bg-slate-900/60 cursor-pointer"
                >
                  {isPaused ? 'Reanudar' : 'Pausar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
