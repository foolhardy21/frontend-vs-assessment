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
      {id}
      <div>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default OutputNode
