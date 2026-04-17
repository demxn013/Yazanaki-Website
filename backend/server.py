import os

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Yazanaki Empire API")
api = APIRouter(prefix="/api")


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


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS_ORIGINS.split(",")] if CORS_ORIGINS != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
