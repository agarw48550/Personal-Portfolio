'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh
                ref={meshRef}
                position={position}
                scale={hovered ? 1.2 : 1}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {geometry}
                <meshStandardMaterial
                    color={hovered ? '#ffffff' : color}
                    roughness={0.3}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingObjects() {
    return (
        <group>
            <FloatingShape position={[-4, 2, -5]} color="#8B5CF6">
                <boxGeometry args={[1, 1, 1]} />
            </FloatingShape>
            <FloatingShape position={[4, -2, -4]} color="#06B6D4">
                <torusGeometry args={[0.6, 0.2, 16, 32]} />
            </FloatingShape>
            <FloatingShape position={[-3, -3, -6]} color="#EC4899">
                <octahedronGeometry args={[1]} />
            </FloatingShape>
            <FloatingShape position={[3, 3, -8]} color="#10B981">
                <dodecahedronGeometry args={[0.8]} />
            </FloatingShape>
        </group>
    );
}
