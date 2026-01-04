// inputNode.js

import { useState } from 'react';
import BaseNode from '../components/BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const updateNodeField = useStore((s) => s.updateNodeField);
  const handleNameChange = (e) => {
    const v = e.target.value;
    setCurrName(v);
    updateNodeField(id, 'inputName', v);
  };
  const handleTypeChange = (e) => {
    const v = e.target.value;
    setInputType(v);
    updateNodeField(id, 'inputType', v);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
      rightHandles={[{ idSuffix: 'value', type: 'source' }]}
    >
      <div className="field-row">
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
