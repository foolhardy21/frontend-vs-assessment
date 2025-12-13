import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

function withBaseNode(NodeComponent, title, handles) {

    return function ({ id, ...props }) {
        const [currentHandles, setCurrentHandles] = useState(handles)
        const { nodes, onConnect } = useStore((state) => ({
            nodes: state.nodes,
            onNodesChange: state.onNodesChange,
            onConnect: state.onConnect,
        }), shallow)

        return (
            <>
                <div style={{ width: 200, border: '1px solid black' }}>
                    <div>
                        <span>{title}</span>
                    </div>
                    <NodeComponent
                        id={id}
                        handles={currentHandles}
                        setHandles={setCurrentHandles}
                        nodes={nodes}
                        onConnect={onConnect}
                        {...props}
                    />
                    {
                        currentHandles.map((handle, idx) => (
                            <Handle
                                key={idx}
                                type={handle.type}
                                id={`${id}-${handle.idSuffix}`}
                                style={handle.style}
                                position={Position[handle.position]}
                            />))
                    }
                </div>
            </>
        )
    }
}

export default withBaseNode