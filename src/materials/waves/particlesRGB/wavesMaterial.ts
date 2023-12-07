import * as THREE from "three";
import fragment from "./wavesShaders/fragment.glsl";
import vertex from "./wavesShaders/vertex.glsl";


const wavesParams = {
    size: 15,
    colorOffset: 0.3,
    colorMultiplier: 1.15,
    elevation: 3.3,
    frequency: 3.5,
    speed: 0.6,
    iterations: 1,
}


export const ParticlesMaterial = new THREE.ShaderMaterial({
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
        uColorOffset: {value: 0.15},
        uColorMultiplier: {value: 2.2},

        uSmallWavesElevation: {value: 6},
        uSmallWavesFrequency: {value: 0.5},
        uSmallWavesSpeed: {value: 0.4},
        uSmallWavesIterations: {value: 1.0},

        uMultiplierElevation: {value: 0},
    }
})
