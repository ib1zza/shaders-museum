import {useState} from 'react';
import {useControls} from "leva";
import {OrbitControls} from "@react-three/drei";
import WavesRipple from "./ShaderPages/WavesRipple.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import SiriWaves from "./ShaderPages/SiriWaves.tsx";

const Experience = () => {
    const {camera, clock} = useThree()

    const [isRotating, setIsRotating] = useState(true);

    useFrame((_) => {
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
        rotation: {
            value: true,
            onChange: (data) => {
                console.log(data)
                setIsRotating(data)

            }
        },
        background: {
            value: "#000000",
            onChange: (data) => {
                console.log(data)
                document.body.style.background = data
            }
        }
    });

    return (
        <>
            <OrbitControls makeDefault/>
            {/*<WavesRipple/>*/}
            <SiriWaves/>
        </>
    );
};

export default Experience;
