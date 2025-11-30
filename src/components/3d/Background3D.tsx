'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Background3D() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <group>
            <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial
                    color="#1a1a2e"
                    attach="material"
                    distort={0.5}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </group>
    );
}
