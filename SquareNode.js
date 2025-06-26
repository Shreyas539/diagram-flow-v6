import { Handle, Position } from "@xyflow/react";
import React from "react";

export const SquareNode = ({ id, data }) => {
  const portCount = 12;
  const totalWidth = 200;

  const handleStyle = {
    width: 8,
    height: 8,
    background: "#333",
    borderRadius: "50%",
  };

  const portLabelStyle = {
    position: "absolute",
    fontSize: 8,
    color: "#000",
    top: -14,
  };

  return (
    <div
      style={{
        position: "relative",
        width: totalWidth,
        height: 80,
        backgroundColor: data?.color || "#ccc",
        // border: "2px solid #333",
        borderRadius: 4,
      }}
    >
      {/* Top ports */}
      {Array.from({ length: portCount }).map((_, i) => {
        const leftPercent = (i + 1) * (100 / (portCount + 1));
        return (
          <React.Fragment key={`top-${i}`}>
            <Handle
              id={`top-${i + 1}`}
              type="source"
              position={Position.Top}
              style={{
                ...handleStyle,
                position: "absolute",
                left: `${leftPercent}%`,
                transform: "translateX(-50%)",
              }}
              isConnectable={true}
            />
            <div
              style={{
                ...portLabelStyle,
                left: `${leftPercent}%`,
                transform: "translateX(-50%)",
              }}
            >
              {i + 1}
            </div>
          </React.Fragment>
        );
      })}

      {/* Bottom ports */}
      {Array.from({ length: portCount }).map((_, i) => {
        const leftPercent = (i + 1) * (100 / (portCount + 1));
        return (
          <React.Fragment key={`bottom-${i}`}>
            <Handle
              id={`bottom-${i + 13}`}
              type="target"
              position={Position.Bottom}
              style={{
                ...handleStyle,
                position: "absolute",
                left: `${leftPercent}%`,
                bottom: -4,
                transform: "translateX(-50%)",
              }}
              isConnectable={true}
            />
            <div
              style={{
                position: "absolute",
                fontSize: 8,
                color: "#000",
                bottom: -16,
                left: `${leftPercent}%`,
                transform: "translateX(-50%)",
              }}
            >
              {i + 13}
            </div>
          </React.Fragment>
        );
      })}

      {/* Optional Label in Center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: 12,
          color: "#111",
        }}
      >
        {data?.label || "Router"}
      </div>
    </div>
  );
};