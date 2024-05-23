import { isClose } from "is-close";
import { useEffect, useState } from "react";
import { Group, Line } from "react-konva";

export const Vert_Slice = ({
  x,
  y,
  verts,
  y_pos,
}: {
  x: number;
  y: number;
  verts: number[];
  y_pos: number;
}) => {
  const [new_verts, set_new_verts] = useState<number[]>([]);

  useEffect(() => {
    if (!verts) return;
    const temp_verts = [];
    for (let i = 0; i < verts.length; i += 3) {
      //   if (Math.round(verts[i + 1]) == Math.round(y_pos)) {
      if (isClose(verts[i + 1], y_pos, 0.5)) {
        temp_verts.push(verts[i] * 10);
        // temp_verts.push(verts[i + 1]);
        temp_verts.push(verts[i + 2] * 10);
      }
    }
    set_new_verts(temp_verts);
  }, [verts, y_pos]);
  return (
    <Group x={x} y={y}>
      <Line points={new_verts} stroke="red" />
    </Group>
  );
};
