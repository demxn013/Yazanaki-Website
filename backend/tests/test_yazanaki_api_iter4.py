"""
Iteration 4 Backend API Tests
Tests:
- GET /api/ - health check
- GET /api/overview - empire data
- POST /api/alliances/apply - should return 404 (removed in iter 3)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBackendAPI:
    """Backend API regression tests for iteration 4"""
    
    def test_api_root_returns_200(self):
        """GET /api/ returns 200 with service info"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["service"] == "yazanaki-empire"
        assert data["status"] == "ok"
        print(f"PASS: GET /api/ returns {data}")
    
    def test_api_overview_returns_200(self):
        """GET /api/overview returns 200 with empire data"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["empire"] == "Yazanaki Empire"
        print(f"PASS: GET /api/overview returns empire={data['empire']}")
    
    def test_api_overview_has_core_divisions(self):
        """GET /api/overview returns correct core_divisions"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        expected_divisions = ["SNU", "ANO", "ONF", "ONA", "KASAII"]
        assert data["core_divisions"] == expected_divisions
        print(f"PASS: core_divisions = {data['core_divisions']}")
    
    def test_api_overview_has_active_alliances(self):
        """GET /api/overview returns active_alliances with Excalibur"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert "Excalibur" in data["active_alliances"]
        print(f"PASS: active_alliances = {data['active_alliances']}")
    
    def test_api_overview_has_governance(self):
        """GET /api/overview returns governance = Structured"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["governance"] == "Structured"
        print(f"PASS: governance = {data['governance']}")
    
    def test_alliances_apply_returns_404(self):
        """POST /api/alliances/apply returns 404 (removed in iter 3)"""
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json={
            "faction_name": "Test Faction",
            "contact": "test@example.com"
        })
        assert response.status_code == 404
        print(f"PASS: POST /api/alliances/apply returns 404 (endpoint removed)")


class TestStaticAssets:
    """Test that static emblem/flag assets are accessible"""
    
    def test_emblem_snu_accessible(self):
        """GET /assets/emblems/snu.png returns 200"""
        response = requests.get(f"{BASE_URL}/assets/emblems/snu.png")
        assert response.status_code == 200
        assert 'image' in response.headers.get('content-type', '')
        print(f"PASS: /assets/emblems/snu.png is accessible (HTTP 200)")
    
    def test_emblem_excalibur_accessible(self):
        """GET /assets/emblems/excalibur.png returns 200"""
        response = requests.get(f"{BASE_URL}/assets/emblems/excalibur.png")
        assert response.status_code == 200
        assert 'image' in response.headers.get('content-type', '')
        print(f"PASS: /assets/emblems/excalibur.png is accessible (HTTP 200)")
