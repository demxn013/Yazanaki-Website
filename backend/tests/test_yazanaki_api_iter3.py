"""
Yazanaki Empire API Tests - Iteration 3
Tests the current API surface after alliance application system removal.
Only GET /api/ and GET /api/overview endpoints exist now.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestServiceStatus:
    """Test service health endpoint"""
    
    def test_root_endpoint_returns_ok(self):
        """GET /api/ returns service status"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["service"] == "yazanaki-empire"
        assert data["status"] == "ok"


class TestOverviewEndpoint:
    """Test overview endpoint returns correct empire data"""
    
    def test_overview_returns_empire_name(self):
        """GET /api/overview returns empire name"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["empire"] == "Yazanaki Empire"
    
    def test_overview_returns_core_divisions(self):
        """GET /api/overview returns 5 core divisions"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["core_divisions"] == ["SNU", "ANO", "ONF", "ONA", "KASAII"]
    
    def test_overview_returns_active_alliances(self):
        """GET /api/overview returns Excalibur alliance"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["active_alliances"] == ["Excalibur"]
    
    def test_overview_returns_governance(self):
        """GET /api/overview returns Structured governance"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["governance"] == "Structured"


class TestRemovedEndpoints:
    """Test that removed alliance application endpoints return 404/405"""
    
    def test_apply_endpoint_removed(self):
        """POST /api/alliances/apply should return 404 (endpoint removed)"""
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json={
            "faction_name": "Test Faction",
            "size": "Small (5-15)",
            "specialization": "Combat",
            "alliance_type": "Trade",
            "contribution_capacity": "Low"
        })
        # Should be 404 (Not Found) since endpoint was removed
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    
    def test_applications_list_endpoint_removed(self):
        """GET /api/alliances/applications should return 404 (endpoint removed)"""
        response = requests.get(f"{BASE_URL}/api/alliances/applications")
        # Should be 404 (Not Found) since endpoint was removed
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
