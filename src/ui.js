// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Panel } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import withBaseNode from './nodes/baseNode';
import { AgentNode, FileNode, ImageNode, InputNode, LLMNode, OpenAINode, OutputNode, TextNode, TransformationNode } from './nodes/types';
import { HANDLES_CONFIG } from './utils';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const { input, output, text, image, agent, openai, transformation, llm, file } = HANDLES_CONFIG
const nodeTypes = {
  customInput: withBaseNode(InputNode, "Input", input),
  llm: withBaseNode(LLMNode, "LLM", llm),
  customOutput: withBaseNode(OutputNode, "Output", output),
  text: withBaseNode(TextNode, "Text", text),
  file: withBaseNode(FileNode, "File", file),
  agent: withBaseNode(AgentNode, "Agent", agent),
  image: withBaseNode(ImageNode, "Image", image),
  openai: withBaseNode(OpenAINode, "OpenAI", openai),
  transformation: withBaseNode(TransformationNode, "Transformation", transformation),
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100wv', height: '80vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls
            position={"bottom-right"}
            style={{
              right: "210px",
            }}
          />
          <MiniMap
            nodeColor={"rgb(238,242,255)"}
          />
        </ReactFlow>
      </div>
    </>
  )
}
