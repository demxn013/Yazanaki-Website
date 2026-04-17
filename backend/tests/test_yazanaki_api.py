"""
Yazanaki Empire API Tests
Tests for: service status, overview, alliance applications CRUD
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestServiceStatus:
    """Test service health and status endpoints"""
    
    def test_api_root_returns_service_status(self):
        """GET /api/ returns service status"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["service"] == "yazanaki-empire"
        assert data["status"] == "ok"


class TestOverview:
    """Test overview endpoint"""
    
    def test_overview_returns_core_divisions(self):
        """GET /api/overview returns core_divisions [SNU, ANO, ONF, ONA, KASAII]"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert "core_divisions" in data
        expected_divisions = ["SNU", "ANO", "ONF", "ONA", "KASAII"]
        assert data["core_divisions"] == expected_divisions
    
    def test_overview_returns_active_alliances(self):
        """GET /api/overview returns active_alliances [Excalibur]"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert "active_alliances" in data
        assert data["active_alliances"] == ["Excalibur"]
    
    def test_overview_returns_empire_name(self):
        """GET /api/overview returns empire name"""
        response = requests.get(f"{BASE_URL}/api/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["empire"] == "Yazanaki Empire"
        assert data["governance"] == "Structured"


class TestAllianceApplications:
    """Test alliance application submission and retrieval"""
    
    def test_apply_valid_payload_returns_200(self):
        """POST /api/alliances/apply with valid payload returns 200 with generated id, status='pending', created_at ISO string"""
        payload = {
            "faction_name": f"TEST_Excalibur_{uuid.uuid4().hex[:8]}",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": "test application"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert isinstance(data["id"], str)
        assert len(data["id"]) > 0
        
        assert data["status"] == "pending"
        assert "created_at" in data
        # Verify ISO format (contains T and timezone info)
        assert "T" in data["created_at"]
        
        # Verify payload data is returned
        assert data["faction_name"] == payload["faction_name"].strip()
        assert data["size"] == payload["size"]
        assert data["specialization"] == payload["specialization"]
        assert data["alliance_type"] == payload["alliance_type"]
        assert data["contribution_capacity"] == payload["contribution_capacity"]
        assert data["notes"] == payload["notes"]
    
    def test_apply_invalid_size_returns_400(self):
        """POST /api/alliances/apply with invalid size returns 400"""
        payload = {
            "faction_name": "TEST_InvalidSize",
            "size": "InvalidSize",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "size" in data["detail"].lower()
    
    def test_apply_invalid_specialization_returns_400(self):
        """POST /api/alliances/apply with invalid specialization returns 400"""
        payload = {
            "faction_name": "TEST_InvalidSpec",
            "size": "Medium",
            "specialization": "InvalidSpec",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "specialization" in data["detail"].lower()
    
    def test_apply_invalid_alliance_type_returns_400(self):
        """POST /api/alliances/apply with invalid alliance_type returns 400"""
        payload = {
            "faction_name": "TEST_InvalidType",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "InvalidType",
            "contribution_capacity": "Moderate",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "alliance type" in data["detail"].lower()
    
    def test_apply_invalid_contribution_capacity_returns_400(self):
        """POST /api/alliances/apply with invalid contribution_capacity returns 400"""
        payload = {
            "faction_name": "TEST_InvalidCapacity",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "InvalidCapacity",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "contribution capacity" in data["detail"].lower()
    
    def test_apply_missing_faction_name_returns_422(self):
        """POST /api/alliances/apply with missing faction_name returns 422"""
        payload = {
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 422
    
    def test_apply_empty_faction_name_returns_422(self):
        """POST /api/alliances/apply with empty faction_name returns 422"""
        payload = {
            "faction_name": "",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": "test"
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 422
    
    def test_list_applications_returns_list_without_mongo_id(self):
        """GET /api/alliances/applications returns list without Mongo _id field"""
        # First create an application
        payload = {
            "faction_name": f"TEST_ListCheck_{uuid.uuid4().hex[:8]}",
            "size": "Small",
            "specialization": "PvP",
            "alliance_type": "Non-Aggression",
            "contribution_capacity": "Low",
            "notes": "test for list"
        }
        create_response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert create_response.status_code == 200
        created_id = create_response.json()["id"]
        
        # Now list applications
        response = requests.get(f"{BASE_URL}/api/alliances/applications")
        assert response.status_code == 200
        data = response.json()
        
        # Verify it's a list
        assert isinstance(data, list)
        
        # Find our created application
        found = False
        for app in data:
            # Verify no _id field
            assert "_id" not in app
            
            # Verify required fields exist
            assert "id" in app
            assert "faction_name" in app
            assert "status" in app
            assert "created_at" in app
            
            if app["id"] == created_id:
                found = True
                assert app["faction_name"] == payload["faction_name"]
        
        assert found, f"Created application with id {created_id} not found in list"
    
    def test_apply_and_verify_persistence(self):
        """Create application and verify it persists in database via GET"""
        unique_name = f"TEST_Persistence_{uuid.uuid4().hex[:8]}"
        payload = {
            "faction_name": unique_name,
            "size": "Large",
            "specialization": "Economy",
            "alliance_type": "Full Alliance",
            "contribution_capacity": "Strategic",
            "notes": "persistence test"
        }
        
        # Create
        create_response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert create_response.status_code == 200
        created_id = create_response.json()["id"]
        
        # Verify via GET
        list_response = requests.get(f"{BASE_URL}/api/alliances/applications")
        assert list_response.status_code == 200
        
        apps = list_response.json()
        found_app = next((a for a in apps if a["id"] == created_id), None)
        
        assert found_app is not None, "Application not found after creation"
        assert found_app["faction_name"] == unique_name
        assert found_app["size"] == "Large"
        assert found_app["specialization"] == "Economy"
        assert found_app["alliance_type"] == "Full Alliance"
        assert found_app["contribution_capacity"] == "Strategic"
        assert found_app["status"] == "pending"


class TestAllEnumValues:
    """Test all valid enum values are accepted"""
    
    @pytest.mark.parametrize("size", ["Small", "Medium", "Large"])
    def test_all_valid_sizes(self, size):
        """Test all valid size values"""
        payload = {
            "faction_name": f"TEST_Size_{size}_{uuid.uuid4().hex[:6]}",
            "size": size,
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": ""
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 200
    
    @pytest.mark.parametrize("spec", ["PvP", "Economy", "Hybrid"])
    def test_all_valid_specializations(self, spec):
        """Test all valid specialization values"""
        payload = {
            "faction_name": f"TEST_Spec_{spec}_{uuid.uuid4().hex[:6]}",
            "size": "Medium",
            "specialization": spec,
            "alliance_type": "Trade Partnership",
            "contribution_capacity": "Moderate",
            "notes": ""
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 200
    
    @pytest.mark.parametrize("alliance_type", ["Non-Aggression", "Trade Partnership", "Full Alliance"])
    def test_all_valid_alliance_types(self, alliance_type):
        """Test all valid alliance_type values"""
        payload = {
            "faction_name": f"TEST_Type_{alliance_type[:4]}_{uuid.uuid4().hex[:6]}",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": alliance_type,
            "contribution_capacity": "Moderate",
            "notes": ""
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 200
    
    @pytest.mark.parametrize("capacity", ["Low", "Moderate", "High", "Strategic"])
    def test_all_valid_contribution_capacities(self, capacity):
        """Test all valid contribution_capacity values"""
        payload = {
            "faction_name": f"TEST_Cap_{capacity}_{uuid.uuid4().hex[:6]}",
            "size": "Medium",
            "specialization": "Hybrid",
            "alliance_type": "Trade Partnership",
            "contribution_capacity": capacity,
            "notes": ""
        }
        response = requests.post(f"{BASE_URL}/api/alliances/apply", json=payload)
        assert response.status_code == 200
