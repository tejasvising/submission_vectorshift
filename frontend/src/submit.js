// submit.js

import { useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (s) => ({ nodes: s.nodes, edges: s.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const doSubmit = useCallback(async () => {
    try {
      const res = await fetch('/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) {
        const txt = await res.text();
        alert(`Submit failed: ${res.status} - ${txt}`);
        return;
      }
      const result = await res.json();
      alert(`Pipeline parsed: nodes=${result.num_nodes}, edges=${result.num_edges}, isDAG=${result.is_dag}`);
    } catch (err) {
      alert('Error submitting pipeline: ' + err.message);
    }
  }, [nodes, edges]);

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <button className="submit-button" type="button" onClick={doSubmit}>Submit Pipeline</button>
    </div>
  );
}
