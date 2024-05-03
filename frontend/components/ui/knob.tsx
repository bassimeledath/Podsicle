import React, { useState } from "react";

interface KnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Knob: React.FC<KnobProps> = ({ value, min, max, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);

  const getAngle = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    setStartAngle(getAngle(event));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (dragging) {
      const angle = getAngle(event);
      const diff = angle - startAngle;
      let newValue = ((diff + 180) % 360) / 360;
      newValue = min + newValue * (max - min);
      newValue = Math.min(max, Math.max(min, newValue));
      onChange(newValue);
    }
  };

  const radius = 50;
  const cx = 60;
  const cy = 60;
  const knobValue = ((value - min) / (max - min)) * 360;
  const knobPosition = `rotate(${knobValue} ${cx} ${cy})`; //#EAB308 //#007bff

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="120"
      height="120"
      className="cursor-pointer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <circle cx={cx} cy={cy} r={radius} fill="#eee" />
      <path
        d={`M ${cx},${cy} L ${cx},${cy - radius} A ${radius},${radius} 0 ${knobValue > 180 ? 1 : 0},1 ${cx},${cy +
          radius} Z`}
        transform={knobPosition}
        fill="#9496FD"
      />
      <circle cx={cx} cy={cy} r={12} fill="#f472b6" />
      <text x={cx} y={cy} textAnchor="middle" dy=".3em" fontSize="16" fill="#ffffff" className="font-bold">
        {Math.round(value)}
      </text>
    </svg>
  );
};

export default Knob;
