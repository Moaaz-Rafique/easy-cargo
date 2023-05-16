import React, { useRef } from "react";

function CustomModel(props) {
  const ref = useRef();
  console.log(`rgb(${props?.position?.[0]*200 },${props?.position?.[1]*200},${
    props?.position?.[2]*200
  })`);
  return (
    <mesh
      ref={ref}
      scale={props?.size || 1}
      rotation={props.rotation}
      position={props.position}
    >
      <boxGeometry args={[props?.length || 10, props?.width|| 10, props.height || 10]} />
      <meshStandardMaterial
        wireframe={props.wireframe}
        opacity={props?.opacity || 0.9}
        transparent
        color={props.color ||
              `rgb(${props?.position?.[0] },${props?.position?.[1]},${
                props?.position?.[2]
              })`
        }
      />
    </mesh>
  );
}

export default CustomModel;
