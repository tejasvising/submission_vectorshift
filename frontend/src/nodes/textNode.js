// textNode.js

import { useEffect, useRef, useState } from 'react';
import BaseNode from '../components/BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variableNames, setVariableNames] = useState([]);
  const txRef = useRef(null);
  const mirrorRef = useRef(null);
  const [size, setSize] = useState({ width: 260, height: 64 });

  // Keep node data updated
  const updateNodeField = useStore((s) => s.updateNodeField);
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  // Robust measurement using a hidden mirror to compute line widths and height
  useEffect(() => {
  const el = txRef.current;
  const mirror = mirrorRef.current;
  if (!el || !mirror) return;

  const style = window.getComputedStyle(el);

  // copy styles
  Object.assign(mirror.style, {
    font: style.font,
    padding: style.padding,
    border: style.border,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    boxSizing: 'content-box'
  });

  const padding = 16;
  const minW = 160;
  const maxW = 400;
  const minH = 32;
  const maxH = 300;

  /* ---------------- WIDTH ---------------- */
  mirror.style.width = 'auto';
  mirror.innerHTML = '';

  let maxLineWidth = 0;
  currText.split('\n').forEach((ln) => {
    const span = document.createElement('span');
    span.style.whiteSpace = 'pre';
    span.textContent = ln || ' ';
    mirror.appendChild(span);
    maxLineWidth = Math.max(
      maxLineWidth,
      span.getBoundingClientRect().width
    );
    mirror.appendChild(document.createElement('br'));
  });

  const newWidth = Math.min(
    maxW,
    Math.max(minW, Math.ceil(maxLineWidth + padding))
  );

  /* ---------------- HEIGHT ---------------- */
  mirror.innerHTML = currText || ' ';
  mirror.style.width = `${newWidth}px`;

  const newHeight = Math.min(
    maxH,
    Math.max(minH, Math.ceil(mirror.scrollHeight))
  );

  el.style.width = `${newWidth}px`;
  el.style.height = `${newHeight}px`;
  setSize({ width: newWidth, height: newHeight });

}, [currText]);



  useEffect(() => {
    // find variables defined like {{ var }} where var is a valid JS identifier
    const regex = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;
    const names = new Set();
    let m;
    while ((m = regex.exec(currText))) {
      names.add(m[1]);
    }
    const arr = Array.from(names).sort();
    setVariableNames(arr);
    // persist variables to node data
    if (arr.length > 0) {
      updateNodeField(id, 'variables', arr);
    } else {
      updateNodeField(id, 'variables', []);
    }
  }, [currText, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      label="Text"
      leftHandles={variableNames.map((n) => ({ idSuffix: `var-${n}`, type: 'target' }))}
      rightHandles={[{ idSuffix: 'output', type: 'source' }]}
      style={{ minWidth: size.width }}

    >
      <div>
        <label style={{ display: 'block' }}>
          <div style={{fontSize:12, color:'#475569', marginBottom:6}}>Text</div>
          <textarea
            ref={txRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={2}
            style={{ resize: 'none', width: `${size.width}px`, height: `${size.height}px`, boxSizing: 'content-box' }}
          />
          {/* hidden mirror used only for measurement */}
          <div ref={mirrorRef} style={{position:'absolute', visibility:'hidden', left:-9999, top:-9999}} aria-hidden="true" />
        </label>
        {variableNames.length > 0 && (
          <div style={{fontSize:12, color:'#64748b'}}>
            Variables: {variableNames.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
