'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export default function Avatar() {
    // Placeholder for a real 3D avatar model
    // In a real implementation, we would use useGLTF to load a .glb file

    return (
        <group position={[0, -1, 0]}>
            {/* Head */}
            <Sphere args={[0.5, 32, 32]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#ffccaa" roughness={0.5} />
            </Sphere>
            {/* Body */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    );
}
