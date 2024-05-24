import { useEffect, useState } from "react";
import "./App.css";
import { Layer, Stage } from "react-konva";
import { Vert_Slice } from "./Slice";
function App() {
  const [file, setFile] = useState<File>();
  const [verts, setVerts] = useState<number[]>();
  const [yPos, setYPos] = useState<number>(0);

  useEffect(() => {
    if (!verts) return;
    const temp = [];
    let arr = [];
    for (let i = 0; i < verts?.length; i++) {
      if (i != 0 && i % 3 == 0) {
        temp.push(arr);

        arr = [];
      }
      arr.push(verts[i]);
    }
    temp.push(arr);
  }, [verts]);

  useEffect(() => {
    file?.arrayBuffer().then((data) => {
      const bytes = new Uint8Array(data);
      const temp_verts = [];
      let start_of_verts = false;
      for (let i = 0; i < bytes.length; i++) {
        if (!start_of_verts) {
          if (bytes[i] == 86 && bytes[i + 1] == 84 && bytes[i + 2] == 9) {
            console.log("found the start");
            start_of_verts = true;
          }
        } else {
          if (bytes[i] == 86 && bytes[i + 1] == 84 && bytes[i + 2] == 9) {
            let num_char = "";
            let char_count = 0;
            let ind = 3;
            while (char_count < 3) {
              if (bytes[i + ind] != 9) {
                num_char += String.fromCharCode(bytes[i + ind]);

                ind += 1;
              } else {
                temp_verts.push(Number(num_char));
                ind += 1;
                char_count += 1;
                num_char = "";
              }
            }
          }
        }
      }
      setVerts(temp_verts);
    });
  }, [file]);
  const file_handler = (evt) => {
    console.log(evt.target.files[0]);
    setFile(evt.target.files[0]);
  };
  return (
    <>
      <Stage width={800} height={800}>
        <Layer>
          <Vert_Slice x={200} y={200} verts={verts} y_pos={yPos} />
        </Layer>
      </Stage>
      <input type="file" onChange={file_handler} />
      <input
        type="range"
        min={-15}
        max={15}
        step={0.01}
        width={200}
        onChange={(evt) => {
          setYPos(Number(evt.target.value));
        }}
      />
    </>
  );
}

export default App;
