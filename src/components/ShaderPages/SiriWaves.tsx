import {useEffect} from 'react';
import {SiriWavesMaterial, wavesParams} from "../../materials/waves/siriWaves/wavesMaterial.ts";
import {useControls} from "leva";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {
    gsap
} from "gsap";
const SiriWaves = () => {

    useControls('waves', {
        blending: {
            value: wavesParams.blending,
            options: {
                additive: THREE.AdditiveBlending, normal: THREE.NormalBlending
            },
            onChange: (data) => {
                console.log(data)
                SiriWavesMaterial.blending = data;
            }
        },
        depthColor: {
            value:  wavesParams.depthColor,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uDepthColor.value = new THREE.Color(data);
            }
        },
        surfaceColor: {
            value:  wavesParams.surfaceColor,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uSurfaceColor.value = new THREE.Color(data);
            }
        },
        colorOffset: {
            value: wavesParams.colorOffset,
            min: 0,
            max: 1,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uColorOffset.value = data;
            }
        },
        colorMultiplier: {
            value: wavesParams.colorMultiplier,
            min: 0,
            max: 5,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uColorMultiplier.value = data;
            }
        },
        elevation: {
            value:  wavesParams.elevation,
            min: 0,
            max: 6,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uSmallWavesElevation.value = data;
            }
        },
        frequency: {
            value: wavesParams.frequency,
            min: 0,
            max: 20,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uSmallWavesFrequency.value = data;
            }
        },
        speed: {
            value: wavesParams.speed,
            min: 0,
            max: 10,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uSmallWavesSpeed.value = data;
            }
        },
        iterations: {
            value: wavesParams.iterations,
            min: 0,
            max: 10,
            step: 1,
            onChange: (data) => {
                SiriWavesMaterial.uniforms.uSmallWavesIterations.value = data;
            }
        },

    })


    useFrame((_, delta) => {
        SiriWavesMaterial.uniforms.uTime.value += delta
    })

    const {camera} = useThree()

    useEffect(() => {

            gsap.to(camera.position, {
                duration: 0.5,
                y: 0,
                ease: "easeInOut",
            });
    }, []);

    SiriWavesMaterial.uniforms.uMultiplierElevation.value = 1;

    const size = 2;
    return (
        <mesh material={SiriWavesMaterial} rotation-x={-Math.PI / 2}>
            <planeGeometry  args={[size, size, 100, 100]}/>
        </mesh>
    );
};

export default SiriWaves;
