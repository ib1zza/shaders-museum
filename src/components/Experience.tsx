import React, {useContext, useEffect, useState} from 'react';
import {useControls} from "leva";
import {OrbitControls} from "@react-three/drei";
import WavesRipple from "./ShaderPages/WavesRipple.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import {ParticlesMaterial} from "../materials/waves/wavesMaterial.ts";

const Experience = () => {
    const {camera, clock} = useThree()

    const [isRotating, setIsRotating] = useState(true);

    useFrame(({ clock }) => {
        if (!isRotating) return;
        const elapsedTime = clock.getElapsedTime() * 0.5;

        const radius = 2;
        const cameraX = Math.sin(elapsedTime) * radius;
        const cameraZ = Math.cos(elapsedTime) * radius;
        camera.position.x = cameraX;
        camera.position.z = cameraZ;
        camera.lookAt(0, 0, 0);
    });

    useControls('global', {
        animation: {
            value: true,
            onChange: (data) => {
                console.log(data)
                setIsRotating(data)

                if(!data) {
                    clock.stop()
                } else {
                    clock.start()
                }
            }
        },
    });

    return (
        <>
            <OrbitControls makeDefault/>
            <WavesRipple/>
        </>
    );
};

export default Experience;
