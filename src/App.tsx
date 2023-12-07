
import {Leva} from "leva";
import {Canvas} from "@react-three/fiber";
import {Perf} from "r3f-perf";
import Experience from "./components/Experience.tsx";

function App() {
    const isDev = true;

    return (
        <>
        <Canvas camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2,2, 2]
        }}>
            {isDev && <Perf position="top-left"/>}
            <Experience/>
        </Canvas>
            <Leva
                hidden={!isDev}
            />
        </>
    )
}

export default App
