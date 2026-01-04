import BaseNode from '../components/BaseNode';

export const LoggerNode = ({ id, data }) => {
  const level = data?.level || 'info';
  return (
    <BaseNode id={id} label="Logger" leftHandles={[{ idSuffix: 'msg', type: 'target' }]}>
      <div style={{fontSize:12, color:'#475569'}}>Level: {level}</div>
    </BaseNode>
  );
}
