from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def make_nodes(n):
    return [{"id": f"node{i}"} for i in range(n)]


def test_parse_dag_true():
    nodes = make_nodes(3)
    edges = [
        {"id": "e1", "source": "node0", "target": "node1"},
        {"id": "e2", "source": "node1", "target": "node2"},
    ]

    resp = client.post('/pipelines/parse', json={"nodes": nodes, "edges": edges})
    assert resp.status_code == 200
    data = resp.json()
    assert data["num_nodes"] == 3
    assert data["num_edges"] == 2
    assert data["is_dag"] is True


def test_parse_cycle_false():
    nodes = make_nodes(3)
    edges = [
        {"id": "e1", "source": "node0", "target": "node1"},
        {"id": "e2", "source": "node1", "target": "node2"},
        {"id": "e3", "source": "node2", "target": "node0"},
    ]

    resp = client.post('/pipelines/parse', json={"nodes": nodes, "edges": edges})
    assert resp.status_code == 200
    data = resp.json()
    assert data["num_nodes"] == 3
    assert data["num_edges"] == 3
    assert data["is_dag"] is False
