import { Handle, Position } from 'reactflow';

function withBaseNode(NodeComponent, title, handles) {
    return function ({ id, ...props }) {
        return (
            <>
                <div style={{ width: 200, height: 80, border: '1px solid black' }}>
                    <div>
                        <span>{title}</span>
                    </div>
                    <NodeComponent
                        id={id}
                        handles={handles}
                        {...props}
                    />
                    {
                        handles.map((handle, idx) => (<Handle
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