// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div style={{fontWeight:700, fontSize:20}}>Nodes</div>
            <div className="node-palette">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='join' label='Join' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='logger' label='Logger' />
            </div>
        </div>
    );
};
