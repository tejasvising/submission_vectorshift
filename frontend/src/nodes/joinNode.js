import BaseNode from '../components/BaseNode';

export const JoinNode = ({ id, data }) => {
  const sep = data?.sep || ',';
  return (
    <BaseNode id={id} label="Join" leftHandles={[{ idSuffix: 'left', type: 'target' }, { idSuffix: 'right', type: 'target' }]} rightHandles={[{ idSuffix: 'joined', type: 'source' }]}>
      <div style={{fontSize:12, color:'#475569'}}>Separator: {sep}</div>
    </BaseNode>
  );
}
