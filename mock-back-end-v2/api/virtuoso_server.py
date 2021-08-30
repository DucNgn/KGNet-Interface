from fastapi import APIRouter
from pydantic import BaseModel

from utils import format_response


virtuoso_server_router = APIRouter(
    prefix="/KGNet",
    tags=["virtuoso", "new_case"],
    responses={"404": {"description": "Not found"}},
)


class Procedure(BaseModel):
    SQL: str


@virtuoso_server_router.post("/createVirtuosoProcedure")
async def create_procedure(procedure: Procedure):
    # NOTE: Create stuff here.
    return format_response(message="Procedure Created")


class ProcedurePermission(BaseModel):
    ProcedureName: str
    UserName: str


@virtuoso_server_router.post("/setVirtuosoProcedureExecuteGrant")
async def set_permission(permission_request: ProcedurePermission):
    # NOTE: Set permission here.
    return format_response(message="Permission Updated")


class TTLFileRequest(BaseModel):
    ttlFileUrl: str


@virtuoso_server_router.post("/loadTTLFileToVirtuoso")
async def load_ttl_file(request: TTLFileRequest):
    # NOTE: Load file and process here
    return format_response(message="Graph Loaded")


