'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CrystalScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight('#fff4df', 0.8));
    const warm = new THREE.PointLight('#ff8a1f', 14, 12); warm.position.set(3, 2, 4); scene.add(warm);
    const cool = new THREE.PointLight('#ffffff', 6, 10); cool.position.set(-3, -1, 3); scene.add(cool);
    const material = new THREE.MeshPhysicalMaterial({ color: '#fff2dc', transmission: 0.7, roughness: 0.08, metalness: 0.1, thickness: 1.6, transparent: true, opacity: 0.45 });
    const geo = new THREE.OctahedronGeometry(0.75, 0);
    const positions: [number, number, number][] = [[-3.2, 1.2, -1], [2.8, -0.7, -1.5], [0.2, 2.1, -2.2]];
    const shards = positions.map((p) => { const mesh = new THREE.Mesh(geo, material.clone()); mesh.position.set(...p); scene.add(mesh); return mesh; });
    let raf = 0; let mx = 0;
    const onMove = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.7; };
    const onResize = () => { camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener('mousemove', onMove); window.addEventListener('resize', onResize);
    const tick = () => { const t = performance.now() / 1000; shards.forEach((s, i) => { s.rotation.x = t * 0.18 + i; s.rotation.y = t * 0.24 + mx; s.position.y = positions[i][1] + Math.sin(t + i) * 0.18; }); renderer.render(scene, camera); raf = requestAnimationFrame(tick); };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); renderer.dispose(); mount.removeChild(renderer.domElement); geo.dispose(); shards.forEach((s) => (s.material as THREE.Material).dispose()); };
  }, []);
  return <div ref={mountRef} className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen" />;
}
