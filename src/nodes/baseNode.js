import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

function withBaseNode(NodeComponent, title, handles) {

    return function ({ id, ...props }) {
        const [currentHandles, setCurrentHandles] = useState(handles)
        const [errors, setErrors] = useState([])
        const { nodes, edges, onConnect } = useStore((state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onConnect: state.onConnect,
        }), shallow)

        return (
            <>
                <div className={`w-[240px] rounded border transition-all duration-200 p-[4px] bg-white shadow-grey-100 hover:shadow-md ${errors.length > 0 ? "border-[#cc0000]" : "border-[#afb0f6ff]"}`}>
                    <div className="text-[12px] text-black bg-secondary p-1 mb-2 rounded border border-gray">
                        <span>{title}</span>
                    </div>
                    <NodeComponent
                        id={id}
                        handles={currentHandles}
                        setHandles={setCurrentHandles}
                        nodes={nodes}
                        onConnect={onConnect}
                        setErrors={setErrors}
                        {...props}
                    />
                    {
                        currentHandles.map((handle, idx) => {
                            const handleId = `${id}-${handle.idSuffix}`
                            const isConnected = edges.find(edge => edge.targetHandle === handleId || edge.sourceHandle === handleId)
                            return (
                                <Handle
                                    key={handleId}
                                    type={handle.type}
                                    id={handleId}
                                    position={Position[handle.position]}
                                    style={{
                                        ...handle.style,
                                        background: isConnected ? "#989af8ff" : "#fff",
                                        border: "solid thin #989af8ff",
                                        width: "10px",
                                        height: "10px",
                                    }}
                                />)
                        })
                    }
                    {
                        errors.length > 0
                            ? <>
                                <p className="text-[12px] text-[#cc0000] p-1 mb-2 rounded border border-gray mt-2">{errors.join(" ")}</p>
                            </>
                            : <></>
                    }
                </div>
            </>
        )
    }
}

export default withBaseNode