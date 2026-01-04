import { useState } from 'react';
import BaseNode from '../components/BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [code, setCode] = useState(data?.code || 'x => x');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode id={id} label="Transform" leftHandles={[{ idSuffix: 'in', type: 'target' }]} rightHandles={[{ idSuffix: 'out', type: 'source' }]}>
      <div>
        <label>
          Fn:
          <input type="text" value={code} onChange={(e) => { setCode(e.target.value); updateNodeField(id, 'code', e.target.value); }} />
        </label>
      </div>
    </BaseNode>
  );
}
