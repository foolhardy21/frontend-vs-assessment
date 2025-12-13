// textNode.js

import { useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { HANDLES_CONFIG } from '../../utils';

const MAX_INPUT_HEIGHT = 150

const TextNode = ({
  id,
  data,
  handles,
  setHandles,
  nodes,
  onConnect,
}) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const inputRef = useRef(null)
  const updateNodeInternals = useUpdateNodeInternals()

  function handleTextChange({ target: { value } }) {
    setCurrText(value)
    updateHandles(value)
    handleHeightChange()
  }

  function handleHeightChange() {
    if (inputRef.current) {
      const element = inputRef.current
      element.style.height = "auto"
      if (element.scrollHeight <= MAX_INPUT_HEIGHT) {
        element.style.height = element.scrollHeight + "px"
      } else {
        element.style.height = MAX_INPUT_HEIGHT + "px"
      }
    }
  }

  function updateHandles(text) {
    const matches = [...text.matchAll(/\{\{([A-Za-z]+-\d)\}\}/g)]
    const variablesTyped = matches.map(match => match[1])

    const allVariables = nodes
      .filter(node => node.type != "text")
      .map(node => node.data)

    // check if typed variable is present in variables list
    const validVariables = variablesTyped.filter(variable => {
      const isVariableValid = allVariables.find(originalVar => originalVar.id === variable)
      return isVariableValid
    })

    if (validVariables.length) {
      const isTargetAlreadyPresent = handles.find(handle => handle.type === "target")
      if (!isTargetAlreadyPresent) {
        setHandles([...handles, {
          type: "target",
          position: "Left",
          idSuffix: "input",
          style: {},
        }])
        updateNodeInternals(id)
      }
      for (const variableId of validVariables) {
        onConnect({
          source: variableId,
          sourceHandle: variableId + allVariables.find(originalVar => originalVar.id === variableId).nodeType,
          target: data.id,
          targetHandle: data.id + HANDLES_CONFIG[data.nodeType].idSuffix,
        })
      }
    } else {
      setHandles(handles.filter(handle => handle.type != "target"))
    }
  }

  return (
    <>
      <div>
        <label>
          Text:
          <textarea
            ref={inputRef}
            value={currText}
            onChange={handleTextChange}
          />
        </label>
      </div>
    </>
  );
}

export default TextNode