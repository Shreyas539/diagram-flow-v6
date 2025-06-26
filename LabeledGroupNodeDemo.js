import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { GroupNode } from "@/components/labeled-group-node";

const LabeledGroupNodeDemo = memo(({ selected }) => {
    return <GroupNode selected={selected} label="Label" />;
});

export default LabeledGroupNodeDemo;