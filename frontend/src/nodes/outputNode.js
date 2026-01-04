// outputNode.js

import { useState } from 'react';
import BaseNode from '../components/BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const updateNodeField = useStore((s) => s.updateNodeField);
  const handleNameChange = (e) => {
    const v = e.target.value;
    setCurrName(v);
    updateNodeField(id, 'outputName', v);
  };
  const handleTypeChange = (e) => {
    const v = e.target.value;
    setOutputType(v);
    updateNodeField(id, 'outputType', v);
  };

  return (
    <BaseNode id={id} label="Output" leftHandles={[{ idSuffix: 'value', type: 'target' }]}>
      <div className="field-row">
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
