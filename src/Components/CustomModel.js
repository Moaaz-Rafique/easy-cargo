import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function CustomModel(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const { Vector3 } = useThree();

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={props?.size || 1}
      onClick={(event) => click(!clicked)}
      // onMouseO={(event) => click(!clicked)}
      // onPointerEnter={(event) => hover(true)}
      // onPointerLeave={(event) => hover(false)}
      rotation={props.rotation}
      {...props}
      position={props.position}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        wireframe={props.wireframe}
        opacity={props.opacity || 0.9}
        transparent
        color={
          hovered
            ? "hotpink"
            : props.color ||
              `rgb(${props?.position[0]*200 },${props?.position[1]*200},${
                props?.position[2]*200
              })`
        }
      />
    </mesh>
  );
}

export default CustomModel;
