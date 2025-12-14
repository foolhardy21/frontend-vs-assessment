// textNode.js

import { useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';

const MAX_INPUT_HEIGHT = 150

const TextNode = ({
  id,
  data,
  handles,
  setHandles,
  nodes,
  onConnect,
  setErrors,
}) => {
  const [currText, setCurrText] = useState(data?.text);
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
    const matches = [...text.matchAll(/\{\{([A-Za-z]+-\d*)\}\}/g)]
    const variablesTyped = matches.map(match => match[1])

    const allVariables = nodes
      .filter(node => node.type != "text")
      .map(node => node.data)

    let invalidVariables = []
    // check if typed variable is present in variables list
    const validVariables = variablesTyped.filter(variable => {
      const isVariableValid = allVariables.find(originalVar => originalVar.id === variable)
      if (!isVariableValid) invalidVariables.push(variable)
      return isVariableValid
    })

    if (invalidVariables.length) {
      setErrors(["Please remove Invalid variables: " + invalidVariables.join(", ")])
    } else {
      setErrors([])
    }

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
          sourceHandle: variableId + "-output",
          target: data.id,
          targetHandle: data.id + "-input",
        })
      }
    } else {
      setHandles(handles.filter(handle => handle.type != "target"))
    }
  }

  return (
    <>
      <p className="text-center w-full text-[12px] text-black bg-tertiary rounded py-1 border border-tertiary">{id}</p>
      <div className="mt-4">
        <label className="text-[12px] flex flex-col">
          Text:
          <textarea
            ref={inputRef}
            value={currText}
            onChange={handleTextChange}
            className="border border-gray rounded p-1"
            placeholder="Wrap variables with {{ }}"
          />
        </label>
      </div>
    </>
  );
}

export default TextNode