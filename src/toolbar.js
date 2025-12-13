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


/**
 * Each node has it's own:
 * title, icon
 * input fields or content
 * onchange handlers of these inputs
 * handles - their positions, type and unique id
 */

/**
 * All nodes have common:
 * remove btn
 * minimize btn
 * basic styling
 * error state
 * 
 */

/**
 * create one file of a node
 * pass children as jsx with styling. Common jsx and styling will be in that file. individual change handlers, jsx and css will be in
 * the file using the common ndoe file.
 */


/**
 * base node:
 * has id and data which will be needed by the child node component
 * 
 * 
 */