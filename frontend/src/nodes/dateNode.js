import BaseNode from '../components/BaseNode';

export const DateNode = ({ id, data }) => {
  const format = data?.format || 'ISO';

  return (
    <BaseNode id={id} label="Date" rightHandles={[{ idSuffix: 'value', type: 'source' }] }>
      <div style={{fontSize:12, color:'#475569'}}>Format: {format}</div>
    </BaseNode>
  );
}
