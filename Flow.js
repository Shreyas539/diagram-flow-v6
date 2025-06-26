
import {

  ReactFlowProvider,

} from "@xyflow/react";

import { ReactFlowWrapper } from './ReactFlowWrapper'


// const ShapePalette = ({ onShapeDrag }) => {
//   const shapes = [
//     { type: "circle", label: "Circle", color: "#555" },
//     { type: "triangle", label: "Triangle", color: "#555" },
//     { type: "square", label: "Square", color: "#555" },
//   ];

//   const onDragStart = (event, shape) => {
//     event.dataTransfer.setData("application/reactflow", JSON.stringify(shape));
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const renderShape = (shape) => {
//     switch (shape.type) {
//       case "circle":
//         return (
//           <div
//             style={{
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               backgroundColor: shape.color,
//             }}
//             draggable
//             onDragStart={(e) => onDragStart(e, shape)}
//           />
//         );
//       case "triangle":
//         return (
//           <div
//             style={{
//               width: 0,
//               height: 0,
//               borderLeft: "25px solid transparent",
//               borderRight: "25px solid transparent",
//               borderBottom: `50px solid ${shape.color}`,
//             }}
//             draggable
//             onDragStart={(e) => onDragStart(e, shape)}
//           />
//         );
//       case "square":
//         return (
//           <div
//             style={{
//               height: "50px",
//               width: "50px",
//               backgroundColor: shape.color,
//             }}
//             draggable
//             onDragStart={(e) => onDragStart(e, shape)}
//           />
//         );
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "20px",
//         left: "20px",
//         zIndex: 1000,
//         backgroundColor: "white",
//         padding: "20px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//       }}
//     >
//       <h3>Shapes</h3>
//       <p>Drag onto canvas</p>
//       <div
//         style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
//       >
//         {shapes.map((shape, i) => (
//           <div key={i}>{renderShape(shape)}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ReactFlowWrapper = () => {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [rfInstance, setRfInstance] = useState(null);
//   const { screenToFlowPosition, setViewport, toObject } = useReactFlow();

//   const [selectedNodeId, setSelectedNodeId] = useState(null);
//   const [color, setColor] = useState("#00b894");
//   const [pickerPos, setPickerPos] = useState({ x: 0, y: 0 });

//   const [jsonData, setJsonData] = useState(null);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             markerEnd: { type: MarkerType.Arrow },
//             type: "smoothstep",
//             animated:'true',
//             label:params.source
//           },
//           eds
//         )
//       ),
//     [setEdges]
//   );

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       const bounds = reactFlowWrapper.current.getBoundingClientRect();
//       const shapeData = event.dataTransfer.getData("application/reactflow");
//       if (!shapeData) return;

//       const shape = JSON.parse(shapeData);
//       const position = screenToFlowPosition({
//         x: event.clientX - bounds.left,
//         y: event.clientY - bounds.top,
//       });

//       const newNode = {
//         // id: `node_${nodeId++}`,
//         id:'id-' + Math.random().toString(36).substr(2, 9),
//         type: shape.type,
//         position,
//         data: { label: shape.label, color: shape.color }, // we store color here
//       };

//       setNodes((nds) => [...nds, newNode]);
//     },
//     [screenToFlowPosition, setNodes]
//   );

//   const onNodeClick = (event, node) => {
//     const bounds = event.target.getBoundingClientRect();
//     setPickerPos({ x: bounds.x, y: bounds.y });
//     setSelectedNodeId(node.id);
//     setColor(node.style?.background || "#00b894");
//   };

//   const handleColorChange = (newColor) => {
//     setColor(newColor);
//     setNodes((nds) =>
//       nds.map((n) =>
//         n.id === selectedNodeId
//           ? { ...n, data: { ...n.data, color: newColor } } // update color in data
//           : n
//       )
//     );
//   };

//   const handleDownload = () => {
//     const data = toObject();
//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });

//     const url = URL.createObjectURL(blob);
//     // console.log(JSON.stringify(data, null, 2))
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "flow.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const onSave = () => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       localStorage.setItem("flow-diagram", JSON.stringify(flow));
//     }
//   };

//   const onRestore = () => {
//     const saved = localStorage.getItem("flow-diagram");
//     if (saved) {
//       const flow = JSON.parse(saved);
//       setNodes(flow.nodes || []);
//       setEdges(flow.edges || []);
//       setViewport(flow.viewport || { x: 0, y: 0, zoom: 1 });
//     }
//   };





//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const jsonString = e.target.result;
//         try {
//           const parsedData = JSON.parse(jsonString);
//           setNodes(parsedData.nodes)
//           setEdges(parsedData.edges)
//           // setJsonData(parsedData); // Store the parsed JSON data in state
//           // console.log(parsedData)
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//           alert("Invalid JSON file.");
//           setJsonData(null);
//         }
//       };

//       reader.readAsText(file);
//     }
//   }

//   return (
//     <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onInit={setRfInstance}
//         onDrop={onDrop}
//         onDragOver={onDragOver}
//         onNodeClick={onNodeClick}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <MiniMap zoomable pannable />
//         <Controls />
//         <Background variant="dots" gap={12} size={1} />
//       </ReactFlow>

//       <ShapePalette />

//       {selectedNodeId && (
//         <div
//           style={{
//             position: "absolute",
//             left: pickerPos.x + 60,
//             top: pickerPos.y + 60,
//             background: "#fff",
//             border: "1px solid #ccc",
//             padding: 10,
//             borderRadius: 6,
//             zIndex: 9999,
//           }}
//         >
//           <HexColorPicker color={color} onChange={handleColorChange} />
//           <button
//             onClick={() => setSelectedNodeId(null)}
//             style={{ marginTop: 10 }}
//           >
//             Close
//           </button>
//         </div>
//       )}

//       <div
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           background: "white",
//           padding: 10,
//           borderRadius: 8,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
//         }}
//       >
//         <button onClick={handleDownload} style={{ marginRight: 10 }}>
//           Download
//         </button>
//         <button onClick={onSave} style={{ marginRight: 10 }}>
//           Save
//         </button>
//         <button onClick={onRestore} style={{ marginRight: 10 }}>Restore</button>

//           {/* <label htmlFor="file-upload">Import JSON */}
//           <input id="file-upload" type="file" accept=".json"  onChange={handleFileChange} />
//         {/* </label> */}
//         {/* <button onClick={importFlowJson}>Import from JSON</button> */}
//       </div>
//     </div>
//   );
// };

export default function ReactFlowShapes() {
  return (
    <ReactFlowProvider>
      <ReactFlowWrapper />
    </ReactFlowProvider>
  );
}
