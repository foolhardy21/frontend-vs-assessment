// toolbar.js

import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import { DRAGGABLE_NODES } from './utils';

export const PipelineToolbar = () => {

    return (
        <div>
            <div className="py-2 pl-6 pr-3 border-b border-b-[rgba(0,0,0,0.1)] flex items-center justify-between">
                <p className="text-[14px] text-black font-semibold">Pipeline</p>
                <SubmitButton />
            </div>
            <div className="py-5 flex items-center gap-2 px-6 bg-gray-50 border-b border-b-[rgba(0,0,0,0.1)]">
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
