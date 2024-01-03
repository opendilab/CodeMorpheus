import React from "react";
import { Sector } from "recharts"

export const COLORS = ['#BC3D35', '#3C5DA0', '#D36F42', '#479B55', '#6E5BA4', '#D073B6']

function calculateAdjacentColor(colorCode: string) {
  var red = parseInt(colorCode.substr(1, 2), 16);
  var green = parseInt(colorCode.substr(3, 2), 16);
  var blue = parseInt(colorCode.substr(5, 2), 16);

  if (red < 200) {
    red += 45;
  }
  if (green < 200) {
    green += 45;
  }
  if (blue < 200) {
    blue += 45;
  }

  var adjacentColor =
    "#" +
    red.toString(16).padStart(2, "0") +
    green.toString(16).padStart(2, "0") +
    blue.toString(16).padStart(2, "0");

  return adjacentColor;
}

export const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    //value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 6;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g transform="translate(32, 0)">
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {""}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 5}
        fill={calculateAdjacentColor(fill)}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        fontSize="8px"
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${payload.name}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        dy={10}
        fontSize="8px"
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};