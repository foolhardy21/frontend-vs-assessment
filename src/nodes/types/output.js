// outputNode.js

import { useState } from 'react';

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(id);
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <>
      <p className="text-center w-full text-[12px] text-black bg-tertiary rounded py-1 border border-tertiary">{id}</p>
      <div className="mt-4">
        <label className="text-[12px] text-black flex flex-col">
          Type:
          <select value={outputType} onChange={handleTypeChange} className="border border-gray p-1">
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default OutputNode
