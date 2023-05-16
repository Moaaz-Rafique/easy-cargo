import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

function ContainerModel(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const containerRef = useRef();
  const [contPos, setContPos] = useState([25, 6, 10]);
  const [contSize, setContSize] = useState([60, 35, 42.5]);

  useControls("Container", {
    visible: {
      value: true,
      onChange: (v) => {
        containerRef.current.visible = v;
      },
    },
    position: {
      x: contPos[0],
      y: contPos[1],
      z: contPos[2],
      onChange: (p) => {
        setContPos([p.x, p.y, p.z]);
      },
    },
    color: {
      value: "gray",
      onChange: (v) => {
        containerRef.current.color = new THREE.Color(v);
      },
    },
    intensity: {
      value: 4,
      onChange: (v) => {
        containerRef.current.intensity = v;
      },
    },
    size: {
      x: contSize[0],
      y: contSize[1],
      z: contSize[2],
      onChange: (v) => {
        setContSize([v.x, v.y, v.z]);
      },
    },
  });
  const scaleFromOrigin = (object, origin, scale) => {
    const translation = origin.clone().multiply(scale);
    object?.position?.sub(translation) ||
      console.log("position", object?.position);
    object?.scale?.copy(scale) || console.log("scale", object?.scale);
    object?.position?.add(translation);
  };

  return (
    <mesh
      ref={containerRef}
      scale={
        props?.size ||
        scaleFromOrigin(
          containerRef.current,
          new THREE.Vector3(contPos[1], contPos[1], contPos[2]),
          new THREE.Vector3(contSize[0], contSize[1], contSize[2])
        )
      }
      position={contPos || props?.position}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        wireframe={props?.wireframe}
        opacity={props.opacity || 1}
        transparent
        color={"gray"}
        side={1}
      />
    </mesh>
  );
}

export default ContainerModel;
