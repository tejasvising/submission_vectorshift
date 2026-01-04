# Backend Changes

## Overview
Updated the FastAPI backend to accept pipeline graphs (nodes and edges) and return basic analysis information.

## Files modified
- `main.py` - Replaced the old `/pipelines/parse` GET handler with a POST endpoint that accepts JSON with `nodes` and `edges` and returns:
```json
{ "num_nodes": 3, "num_edges": 2, "is_dag": true }
```

## Implementation details
- The endpoint expects JSON with the following shape: `{ "nodes": [...], "edges": [...] }`.
- `num_nodes` and `num_edges` are simply the `len()` of the corresponding arrays.
- `is_dag` is computed by constructing a directed graph from the `edges` (using `source` and `target` fields common to React Flow) and checking for any cycles using Kahn's algorithm (topological sort).

## Error handling
- If the input shape is invalid, the endpoint responds with a 400 status and a helpful message.

## How to run backend tests
- Create a virtual environment and install dev dependencies (example):

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
pip install -r requirements.txt || true  # if you have a requirements file for the app
pytest -q
```

## Notes
- No external packages were added; this uses core Python and FastAPI only.
