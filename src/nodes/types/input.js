// inputNode.js

import { useState } from 'react';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(id);
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <>
      <p className="text-center w-full text-[12px] text-black bg-tertiary rounded py-1 border border-tertiary">{id}</p>
      <div>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default InputNode