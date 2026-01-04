// llmNode.js

import BaseNode from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  const left = [{ idSuffix: 'system', type: 'target' }, { idSuffix: 'prompt', type: 'target' }];
  const right = [{ idSuffix: 'response', type: 'source' }];

  return (
    <BaseNode id={id} label="LLM" leftHandles={left} rightHandles={right}>
      <div> 
        <div style={{fontSize:12, color:'#475569'}}>This node wraps an LLM model.</div>
      </div>
    </BaseNode>
  );
}
