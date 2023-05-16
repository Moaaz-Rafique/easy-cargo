import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import CustomModel from "./CustomModel";

import { useControls } from "leva";
import { Stats, OrbitControls } from "@react-three/drei";
import ContainerModel from "./ContainerModel";

function UploadExcelFile() {
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState([]);
  const inputRef = useRef(null);

  function Lights() {
    const directionalRef = useRef();
    useControls("Directional Light", {
      visible: {
        value: true,
        onChange: (v) => {
          directionalRef.current.visible = v;
        },
      },

      color: {
        value: "white",
        onChange: (v) => {
          directionalRef.current.color = new THREE.Color(v);
        },
      },
      intensity: {
        value: 4,
        onChange: (v) => {
          directionalRef.current.intensity = v;
        },
      },
    });
    return (
      <>
        <directionalLight
          ref={directionalRef}
          intensity={directionalRef?.current?.intensity || 1}
        />
      </>
    );
  }

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };
  function rotationfromOrientationNumber(orientationNumber) {
    // Determine the rotation angle and axis based on the orientation number
    let xAngle = 0;
    let yAngle = 0;
    let zAngle = 0;
    switch (orientationNumber) {
      case 0: // Top face
        xAngle = 0;
        yAngle = 0;
        zAngle = 0;
        break;
      case 1: // Bottom face
        xAngle = Math.PI;
        yAngle = 0;
        zAngle = 0;
        break;
      case 2: // Front face
        xAngle = Math.PI / 2;
        yAngle = 0;
        zAngle = 0;
        break;
      case 3: // Back face
        xAngle = -Math.PI / 2;
        yAngle = 0;
        zAngle = 0;
        break;
      case 4: // Left face
        xAngle = 0;
        yAngle = -Math.PI / 2;
        zAngle = 0;
        break;
      case 5: // Right face
        xAngle = 0;
        yAngle = Math.PI / 2;
        zAngle = 0;
        break;
      default:
        console.log("invalid orientation", orientationNumber);
    }
    console.log(xAngle, yAngle, zAngle);
    return [xAngle, yAngle, zAngle];
  }
  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);

    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>", data);
      let parsedData = [];
      for (let j = 1; j < data.length; j++) {
        let obj = {};
        for (let i = 1; i < data[0].length; i++) {
          obj[data[0][i]] = data[j][i];
        }
        obj["Block_Strategy Starting point"] = JSON.parse(
          obj["Block_Strategy Starting point"]
        );
        // console.log(obj);
        const blockSize = [
          obj["length"] / 10,
          obj["Width"] / 10,
          obj["Height"] / 10,
        ];
        // .sort((a, b) => b - a);
        // blockSize.push(...blockSize.splice(0, 1));
        obj["blockSize"] = blockSize;
        parsedData.push(obj);
      }

      setFileData(parsedData);
      console.log(parsedData[0]["Block_Strategy Starting point"]);
    };
    fileReader.readAsBinaryString(selectedFile);

    // 🚩 do the file upload here normally...
  };

  return (
    <div>
      <div>Upload a file:</div>

      {/* 👇 Our custom button to select and upload a file */}
      <button onClick={handleUploadClick}>
        {file ? `${file.name}` : "Click to select"}
      </button>

      {/* 👇 Notice the `display: hidden` on the input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={() => {
          console.log(fileData[0]);
        }}
      >
        sadsa
      </button>
      {
        <section
          className="App-header"
          style={{ width: "100%", height: "80vh" }}
        >
          <Canvas>
            <Lights />
            <ambientLight />

            {fileData.map((e, i) => (
              <CustomModel
                position={[
                  e["Block_Strategy Starting point"][0] / 10 +
                    e["blockSize"][0] / 2,
                  -(
                    e["Block_Strategy Starting point"][1] / 10 +
                    e["blockSize"][1] / 2
                  ),
                  e["Block_Strategy Starting point"][2] / 10 +
                    e["blockSize"][2] / 2,
                ]}
                opacity={1}
                // size={e["blockSize"]}
                length={e["blockSize"][0]}
                width={e["blockSize"][1]}
                height={e["blockSize"][2]}
                rotation={rotationfromOrientationNumber(
                  e["Box Orientation in Block_Strategy"]
                )}
                type = {e['Box Type']}
              />
            ))}
            <ContainerModel position={[25, 15, 10]} opacity={1} />
            <OrbitControls target={[2, 2, 0]} />
          </Canvas>
        </section>
      }
    </div>
  );
}
export default UploadExcelFile;
