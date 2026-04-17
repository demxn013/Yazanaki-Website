import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Yazanaki Empire API")
api = APIRouter(prefix="/api")


class AllianceApplicationIn(BaseModel):
    faction_name: str = Field(..., min_length=1, max_length=120)
    size: str
    specialization: str
    alliance_type: str
    contribution_capacity: str
    notes: Optional[str] = ""


class AllianceApplication(AllianceApplicationIn):
    id: str
    status: str = "pending"
    created_at: str


@api.get("/")
async def root():
    return {"service": "yazanaki-empire", "status": "ok"}


@api.get("/overview")
async def overview():
    return {
        "empire": "Yazanaki Empire",
        "core_divisions": ["SNU", "ANO", "ONF", "ONA", "KASAII"],
        "active_alliances": ["Excalibur"],
        "governance": "Structured",
    }


@api.post("/alliances/apply", response_model=AllianceApplication)
async def apply_for_alliance(payload: AllianceApplicationIn):
    allowed_sizes = {"Small", "Medium", "Large"}
    allowed_specs = {"PvP", "Economy", "Hybrid"}
    allowed_types = {"Non-Aggression", "Trade Partnership", "Full Alliance"}
    allowed_capacity = {"Low", "Moderate", "High", "Strategic"}

    if payload.size not in allowed_sizes:
        raise HTTPException(status_code=400, detail="Invalid size")
    if payload.specialization not in allowed_specs:
        raise HTTPException(status_code=400, detail="Invalid specialization")
    if payload.alliance_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid alliance type")
    if payload.contribution_capacity not in allowed_capacity:
        raise HTTPException(status_code=400, detail="Invalid contribution capacity")

    doc = {
        "id": str(uuid.uuid4()),
        "faction_name": payload.faction_name.strip(),
        "size": payload.size,
        "specialization": payload.specialization,
        "alliance_type": payload.alliance_type,
        "contribution_capacity": payload.contribution_capacity,
        "notes": (payload.notes or "").strip(),
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.alliance_applications.insert_one(doc.copy())
    return AllianceApplication(**doc)


@api.get("/alliances/applications", response_model=List[AllianceApplication])
async def list_applications():
    cursor = db.alliance_applications.find({}, {"_id": 0}).sort("created_at", -1)
    items = await cursor.to_list(length=500)
    return [AllianceApplication(**item) for item in items]


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS_ORIGINS.split(",")] if CORS_ORIGINS != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
