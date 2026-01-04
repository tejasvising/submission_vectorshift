import React from 'react';
import { Handle, Position } from 'reactflow';
import '../components/node.css';

const BaseNode = ({ id, label, leftHandles = [], rightHandles = [], children, style = {} }) => {
  // leftHandles/rightHandles are arrays of { idSuffix, type = 'target' }

  const renderLeftHandles = () => (
    leftHandles.map((h, idx) => {
      const topPct = ((idx + 1) / (leftHandles.length + 1)) * 100;
      return (
        <Handle
          key={`left-${h.idSuffix}-${id}`}
          type={h.type || 'target'}
          position={Position.Left}
          id={`${id}-${h.idSuffix}`}
          style={{ top: `${topPct}%` }}
        />
      );
    })
  );

  const renderRightHandles = () => (
    rightHandles.map((h, idx) => {
      const topPct = ((idx + 1) / (rightHandles.length + 1)) * 100;
      return (
        <Handle
          key={`right-${h.idSuffix}-${id}`}
          type={h.type || 'source'}
          position={Position.Right}
          id={`${id}-${h.idSuffix}`}
          style={{ top: `${topPct}%` }}
        />
      );
    })
  );

  return (
    <div className="vs-node" style={style} data-nodeid={id}>
      {renderLeftHandles()}
      <div className="vs-node-header">{label}</div>
      <div className="vs-node-content">{children}</div>
      {renderRightHandles()}
    </div>
  );
};

export default BaseNode;
