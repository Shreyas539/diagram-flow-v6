import { useEffect, useRef, useState } from "react";
import { DropDown } from "./DropDown";
import { ShapePalette } from "./ShapePalette";
const [minWidth, maxWidth, defaultWidth] = [250, 360, 300];


const Sidebar = () => {
    const [width, setWidth] = useState(defaultWidth);
    const isResized = useRef(false);


    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            if (!isResized.current) {
                return;
            }

            setWidth((previousWidth) => {
                const newWidth = previousWidth + e.movementX / 2;

                const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

                return isWidthInRange ? newWidth : previousWidth;
            });
        });

        window.addEventListener("mouseup", () => {
            isResized.current = false;
        });
    }, []);

    return (
        <div className="flex overflow-y-hidden">
            <div style={{ width: `${width / 16}rem`, overflowY: 'scroll', scrollbarWidth: 'none' }} className="bg-[#E3F2FD]">

                <DropDown />
                <ShapePalette />

            </div>

            {/* Handle */}
            <div
                className="w-[3px] cursor-col-resize bg-[#2171b5]"
                onMouseDown={() => {
                    isResized.current = true;
                }}
            >
            </div>

        </div>
    );
}

export default Sidebar;