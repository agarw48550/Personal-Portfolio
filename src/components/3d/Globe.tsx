'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Globe() {
    const globeRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group position={[2, 0, 0]}>
            <Sphere ref={globeRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#1a237e"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Sphere>
            {/* Singapore Marker */}
            <mesh position={[0.8, 0.2, 0.5]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>
        </group>
    );
}
