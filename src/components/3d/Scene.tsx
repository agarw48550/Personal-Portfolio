'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import Background3D from './Background3D';
import FloatingObjects from './FloatingObjects';
import Avatar from './Avatar';

export default function Scene() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Background3D />
                    <FloatingObjects />
                    {/* <Avatar /> - Temporarily disabled until model is ready or placeholder created */}

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
