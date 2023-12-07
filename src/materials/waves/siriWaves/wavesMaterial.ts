import * as THREE from "three";
import fragment from "./wavesShaders/fragment.glsl";
import vertex from "./wavesShaders/vertex.glsl";


export const wavesParams = {
    size: 15,
    blending: THREE.AdditiveBlending,
    depthColor: "#000000",
    surfaceColor: "#ffffff",
    colorOffset: 0.3,
    colorMultiplier: 1.15,
    elevation: 3.3,
    frequency: 3.1,
    speed: 0.6,
    iterations: 1,
}


export const SiriWavesMaterial = new THREE.ShaderMaterial({
    depthWrite: false,
    precision: "lowp",
    transparent: true,
    blending: THREE.AdditiveBlending,
    // vertexColors: true,
    toneMapped: true,
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        uTime: {value: 0},
        uSize: {value: wavesParams.size * Math.min(window.devicePixelRatio, 2)},

        uDepthColor: {value: new THREE.Color("#000000")},
        uSurfaceColor: {value: new THREE.Color("#ffffff")},
        uColorOffset: {value: wavesParams.colorOffset},
        uColorMultiplier: {value: wavesParams.colorMultiplier},

        uSmallWavesElevation: {value: wavesParams.elevation},
        uSmallWavesFrequency: {value: wavesParams.frequency},
        uSmallWavesSpeed: {value: wavesParams.speed},
        uSmallWavesIterations: {value: wavesParams.iterations},

        uMultiplierElevation: {value: 0},
    }
})
