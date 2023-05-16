import React, { useRef } from "react";

function CustomModel(props) {
  function generateRandomColor(number) {
    const random = (number) => {
      let x = Math.sin(number) * 10000;
      return x - Math.floor(x);
    };

    const r = Math.floor(random(number + 1) * 256);  // Random value for the red channel (0-255)
    const g = Math.floor(random(number + 2) * 256);  // Random value for the green channel (0-255)
    const b = Math.floor(random(number + 3) * 256);  // Random value for the blue channel (0-255)

    return `rgb(${r}, ${g}, ${b})`;
  }


  const ref = useRef();
  console.log(`rgb(${Math.abs(props.position[0]*5) 
  },${Math.abs(props.position[1]*5)},${
    Math.abs(props.position[2]*5)
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
        color={props?.color || generateRandomColor(props?.type || props.position[0])
        }
      />
    </mesh>
  );
}

export default CustomModel;
