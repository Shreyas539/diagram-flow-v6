// import pcIcon from '../assets/pc-icon.svg'
// import routerIcon from '../assets/router-icon.svg'
// import switchIcon from '../assets/network-switch-icon.svg'
import { useState } from 'react';

export const ShapePalette = ({ onShapeDrag }) => {
  const [searchedShape, setSearchedShape] = useState('');

  const shapes = [
    { type: "circle", label: "Circle", color: "#555", id: '1' },
    { type: "triangle", label: "Triangle", color: "#555", id: '2' },
    { type: "square", label: "Square", color: "#555", id: '3' },

    // { type: "parallelogram", label: "Parallelogram", color: "#555" },
  ];
  const [filteredShapes, setFilteredShapes] = useState(shapes)

  const onDragStart = (event, shape) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(shape));
    event.dataTransfer.effectAllowed = "move";
  };

  const renderShape = (shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              backgroundColor: shape.color,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={switchIcon} width={70} height={70} alt='network switch icon' /> </div>
        );
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottom: `50px solid ${shape.color}`,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={pcIcon} width={70} height={70} alt='pc icon' /></div>
        );
      case "square":
        return (
          <div
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: shape.color,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={routerIcon} width={70} height={70} alt='router icon' /></div>
        );

      default:
        return (
          <div>Default case</div>
        );

    }
  };

  const handleSearchShape = (e) => {
    const searchTerm = e.target.value
    setSearchedShape(searchTerm);

    const filteredItm = shapes.filter((shape) => shape.label.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredShapes(filteredItm)

  }

  return (
    <div
      style={{
        // position: "absolute",
        // top: "20px",
        // left: "20px",
        // zIndex: 1000,
        // backgroundColor: "white",
        padding: "20px",
        // borderRadius: "8px",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        // width: '160px',
        border: '1px solid #e5e7eb',
        backgroundColor:'#fff',
        margin:'0 20px',
        borderRadius:'0.75rem'
      }}
    >
      <h1 className='text-2xl font-bold mb-3'>Shapes</h1>
      <p className='text-xl mb-2'>Drag onto canvas</p>

      <div>
        <input
          type='text'
          value={searchedShape}
          onChange={handleSearchShape}
          style={{ backgroundColor: 'white',color:'black', border: '2px solid grey', borderRadius: '5px', padding: '10px 15px', width: '-webkit-fill-available' }}
          placeholder='Search for shape'
        />

        <div style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", marginTop: '10px', marginBottom: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr  1fr', alignItems: 'center', justifyContent: 'center' }}>
          {searchedShape && filteredShapes.map(shape =>
            <div key={shape.id} style={{ padding: '10px 15px' }}>
              {renderShape(shape)}
              {shape.label}
            </div>)}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}
      >
        {shapes.map((shape, i) => (
          <div key={i}>
            {renderShape(shape)}
            {shape.label}
          </div>
        ))}
      </div>
    </div>
  );
};