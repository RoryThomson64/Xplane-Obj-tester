import { isClose } from "is-close";
import { useEffect, useState } from "react";
import { Ellipse, Group, Line } from "react-konva";

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
  const [points, set_points] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (!verts) return;
    const height_slice = get_height_slice(verts, y_pos);

    // temp_verts.sort((a, b) => {
    //   const a_x = a[0];
    //   const a_y = a[1];

    //   const b_x = b[0];
    //   const b_y = b[1];

    //   const a_dist = Math.sqrt(Math.pow(a_x, 2) + Math.pow(a_y, 2));
    //   const b_dist = Math.sqrt(Math.pow(b_x, 2) + Math.pow(b_y, 2));

    //   const a_bearing = (Math.asin(a_y / a_dist) * 180) / Math.PI;
    //   const b_bearing = (Math.asin(b_y / b_dist) * 180) / Math.PI;
    //   const out = a_bearing - b_bearing;
    //   // const out = b_bearing - a_bearing;

    //   return out;
    // });

    // for (let i = 0; i < temp_verts.length; i++) {
    //   const x = temp_verts[i][0];
    //   const y = temp_verts[i][1];

    //   const dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    //   const bearing = (Math.asin(y / dist) * 180) / Math.PI;

    //   // if (Math.floor(bearing) == last_bearing) {
    //   if (isClose(bearing, last_bearing, 0.1)) {
    //     if (dist > last_dist) {
    //       if (second_temp_verts[i]) {
    //         second_temp_verts[i] = [x, y];
    //       } else {
    //         second_temp_verts.push([x, y]);
    //       }
    //       last_dist = dist;
    //     }
    //   } else {
    //     // last_bearing = Math.floor(bearing);
    //     last_bearing = bearing;

    //     last_dist = dist;
    //     second_temp_verts.push([x, y]);
    //   }
    // }
    // console.log(second_temp_verts);

    set_new_verts(
      temp_verts.flatMap((vert) => {
        return vert;
      })
    );
  }, [verts, y_pos]);

  useEffect(() => {
    const points = [];

    for (let i = 0; i < new_verts.length; i += 2) {
      points.push(
        <Ellipse
          x={new_verts[i]}
          y={new_verts[i + 1]}
          radiusX={1}
          radiusY={1}
          fill="red"
        />
      );
    }
    set_points(points);
  }, [new_verts]);
  return (
    <Group x={x} y={y}>
      {/* <Line points={new_verts} stroke="red" fill="green" closed /> */}
      {points}
    </Group>
  );
};

const get_height_slice = (verts: number[], y_pos: number): number[][] => {
  const temp_verts = [];
  for (let i = 0; i < verts.length; i += 3) {
    if (isClose(verts[i + 1], y_pos, 0.05)) {
      temp_verts.push([verts[i] * 10, verts[i + 2] * 10]);
    }
  }
  return temp_verts;
};

const coalesce_points = (
  height_slice: number[][],
  distance: number
): number[][] => {
  const reduced_points = [];
  for (let i = 0; i < height_slice.length; i++) {
    //This may be more effecient?
    // for(let j = i; j<height_slice.length;j++)
    const point1 = height_slice[i];

    for (let j = 0; j < height_slice.length; j++) {
      if (i != j) {
        const point2 = height_slice[j];
      }
    }
  }
};
