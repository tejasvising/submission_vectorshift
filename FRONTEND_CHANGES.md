# Frontend Changes

## Overview
I created a reusable Node abstraction and refactored existing nodes to use it. This simplifies creating new node types and applying consistent styles.

## Files added
- `src/components/BaseNode.js` - Generic node wrapper component that renders the node container, header, content area, and dynamic handles (left/right).
- `src/components/node.css` - Styles for node container, header, inputs, and handles.
- `src/nodes/*` - Refactored existing nodes (`inputNode.js`, `outputNode.js`, `llmNode.js`, `textNode.js`) to use `BaseNode`. Added five example nodes to showcase flexibility.
- `src/submit.js` - Implemented `SubmitButton` to POST nodes and edges to the backend and show an alert with the response.

## Design choices
- BaseNode accepts props for label, leftHandles, rightHandles, children (content), and styling overrides.
- Text node now supports auto-resizing text area and dynamic variable handles (detects `{{ varName }}` patterns and renders input handles for each variable).
- No new dependencies were introduced; styling uses plain CSS for broad compatibility.

## How to add new nodes
1. Create a new file in `src/nodes/` that imports `BaseNode`:
```js
import BaseNode from '../components/BaseNode';
export const MyNode = ({ id, data }) => (
  <BaseNode id={id} label="My" leftHandles={[...]} rightHandles={[...]}>
    {/* Custom content here */}
  </BaseNode>
);
```
2. Register it in `src/ui.js` `nodeTypes` mapping to enable dragging.

## Visual improvements
- Unified visual language for nodes: rounded cards, consistent header style, subtle shadow, and improved spacing.
- Form elements have consistent spacing and fonts.

## How to run frontend tests
- The project comes with React Testing Library. Run:

```bash
cd frontend
npm test -- -u
```

This will run the jest suite and update snapshots if necessary.

## Notes
- Text node variable-detection uses regular expression to find JS-style identifiers inside double curly braces (e.g., `{{ input }}`).
- The Submit button serializes the react-flow `nodes` and `edges` arrays and sends JSON to `/pipelines/parse`.
