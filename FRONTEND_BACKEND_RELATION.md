# Frontend / Backend Relation

## Purpose
This document explains how the frontend and backend interact for pipeline submission and validation.

## Flow
1. User creates a pipeline graph in the frontend using React Flow.
2. User clicks the `Submit` button (implemented in `src/submit.js`).
3. Frontend `SubmitButton` collects the current `nodes` and `edges` from the store and sends them as JSON via POST to `/pipelines/parse`.
4. Backend receives `{ nodes, edges }`, computes `num_nodes`, `num_edges`, and whether the graph is a DAG (`is_dag`).
5. Backend responds with `{ num_nodes, num_edges, is_dag }`.
6. Frontend displays an alert to the user summarizing those values.

## Implementation notes
- The frontend uses native `fetch` to POST JSON and displays a readable message on success.
- The backend uses FastAPI to validate input and run a topological check for DAG property.
