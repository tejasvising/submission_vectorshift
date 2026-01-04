from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Edge]

@app.post('/pipelines/parse')
def parse_pipeline(req: PipelineRequest):
    num_nodes = len(req.nodes or [])
    num_edges = len(req.edges or [])

    # Build adjacency list
    adj = { }
    indeg = { }
    for n in req.nodes:
        nid = n.get('id')
        adj[nid] = []
        indeg[nid] = 0

    for e in req.edges:
        src = e.source
        tgt = e.target
        if src not in adj:
            adj[src] = []
            indeg[src] = indeg.get(src, 0)
        if tgt not in adj:
            adj[tgt] = []
            indeg[tgt] = indeg.get(tgt, 0)
        adj[src].append(tgt)
        indeg[tgt] = indeg.get(tgt, 0) + 1

    # Kahn's algorithm for DAG check
    queue = [n for n, d in indeg.items() if d == 0]
    visited = 0
    while queue:
        cur = queue.pop(0)
        visited += 1
        for nb in adj.get(cur, []):
            indeg[nb] -= 1
            if indeg[nb] == 0:
                queue.append(nb)

    is_dag = (visited == len(indeg))

    return { 'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag }
