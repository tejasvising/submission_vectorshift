import { useState } from 'react';
import BaseNode from '../components/BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expr || 'a + b');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode id={id} label="Math" leftHandles={[{ idSuffix: 'a', type: 'target' }, { idSuffix: 'b', type: 'target' }]} rightHandles={[{ idSuffix: 'result', type: 'source' }]}>
      <div>
        <label>
          Expr:
          <input type="text" value={expr} onChange={(e) => { setExpr(e.target.value); updateNodeField(id, 'expr', e.target.value); }} />
        </label>
      </div>
    </BaseNode>
  );
}
