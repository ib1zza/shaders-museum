import {useEffect, useState} from 'react';
import {useControls} from "leva";
import {ParticlesMaterial} from "../../materials/waves/wavesMaterial.ts";
import * as THREE from "three";
import gsap from 'gsap';
import {useFrame} from "@react-three/fiber";
import {Points} from "@react-three/drei";

const particlesParams = {
    count: 100,
    size: 2,
    sizeOfPlane: 2,
}

function createParticles() {
    const vertices = [];

    for (let i = 0; i < particlesParams.count; i++) {
        for (let j = 0; j < particlesParams.count; j++) {
            const x = ((i) / particlesParams.count - 0.5) * particlesParams.sizeOfPlane;
            const y = 0;
            const z = ((j) / particlesParams.count - 0.5) * particlesParams.sizeOfPlane;
            vertices.push(x, y, z);

            if(x ** 2 + y ** 2 > 1) {}

        }
    }

    return new Float32Array(vertices)
}

enum Variants {
    SOLID = "solid",
    POINTS = "points"
}
const WavesRipple = () => {
    const positionsBuffer = createParticles();
    console.log(window.devicePixelRatio)

    const [variant, setVariant] = useState<Variants>(Variants.POINTS);

    useControls('waves', {
        blending: {
            value: THREE.AdditiveBlending,
            options: {
                additive: THREE.AdditiveBlending, normal: THREE.NormalBlending
            },
            onChange: (data) => {
                console.log(data)
                ParticlesMaterial.blending = data;
            }
        },
        variant: {
            value: Variants.POINTS,
            options: [Variants.POINTS, Variants.SOLID],
            onChange: (data: Variants) => {
                setVariant(data);
            },
        },
        pointSize: {
            value: 8 * Math.min(window.devicePixelRatio, 2),
            min: 1,
            max: 100,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSize.value = data;
            }
        },
        depthColor: {
            value: '#000000',
            onChange: (data) => {
                ParticlesMaterial.uniforms.uDepthColor.value = new THREE.Color(data);
            }
        },
        surfaceColor: {
            value: '#ffffff',
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSurfaceColor.value = new THREE.Color(data);
            }
        },
        colorOffset: {
            value: 0.4,
            min: 0,
            max: 1,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uColorOffset.value = data;
            }
        },
        colorMultiplier: {
            value: 1.25,
            min: 0,
            max: 5,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uColorMultiplier.value = data;
            }
        },
        elevation: {
            value: 2,
            min: 0,
            max: 6,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSmallWavesElevation.value = data;
            }
        },
        frequency: {
            value: 3,
            min: 0,
            max: 20,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSmallWavesFrequency.value = data;
            }
        },
        speed: {
            value: 0.5,
            min: 0,
            max: 10,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSmallWavesSpeed.value = data;
            }
        },
        iterations: {
            value: 1,
            min: 0,
            max: 10,
            step: 1,
            onChange: (data) => {
                ParticlesMaterial.uniforms.uSmallWavesIterations.value = data;
            }
        },

    })

    // useEffect(() => {
    //     if (!isCalm) {
    //         gsap.to(ParticlesMaterial.uniforms.uMultiplierElevation, {
    //             duration: constants.animationDuration,
    //             value: 1
    //         });
    //     } else {
    //         gsap.to(ParticlesMaterial.uniforms.uMultiplierElevation, {
    //             duration: constants.animationDuration,
    //             value: 0
    //         });
    //     }
    // }, [isCalm])

    useFrame((_, delta) => {
        // ParticlesMaterial.uniforms.uTime.value += delta
    })

    ParticlesMaterial.uniforms.uMultiplierElevation.value = 1;



    return (
        <>
            {
                variant === Variants.POINTS
                    ? <Points positions={positionsBuffer} material={ParticlesMaterial}/>
                    : <mesh material={ParticlesMaterial} rotation-x={-Math.PI / 2}>
                        <planeGeometry  args={[particlesParams.sizeOfPlane, particlesParams.sizeOfPlane, 100, 100]}/>
                    </mesh>
            }

        </>
    );
};

export default WavesRipple;
