// toolbar.js

import { DraggableNode } from './draggableNode';
import { DRAGGABLE_NODES } from './utils';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {
                    DRAGGABLE_NODES.map((nodeObj, idx) => (
                        <DraggableNode
                            key={idx}
                            type={nodeObj.type}
                            label={nodeObj.label}
                        />
                    ))
                }
            </div>
        </div>
    );
};
