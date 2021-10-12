from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel
from starlette.responses import JSONResponse

from utils import format_response


sparql_router = APIRouter(
    prefix="/KGNet",
    tags=["sparql"],
    responses={"404": {"description": "Not found"}},
)


class SparqlQueryRequest(BaseModel):
    query: str


@sparql_router.post("/executeSparqlQuery")
async def execute_query(request: SparqlQueryRequest):
    return JSONResponse(
        {
            "result": [
                {
                    "breed_class": "001.Affenpinscher",
                    "min_height": "9.0",
                    "max_height": "12.0",
                    "min_weight": "8",
                    "max_weight": "12",
                    "level_of_obey": "0.7",
                    "min_response_count": "16",
                },
                {
                    "breed_class": "002.Afghan_hound",
                    "min_height": "25.0",
                    "max_height": "27.0",
                    "min_weight": "50",
                    "max_weight": "60",
                    "level_of_obey": "0.6",
                    "min_response_count": "81",
                },
            ]
        }
    )


@sparql_router.post("/searchKGNET_APIsCatalogue")
async def search_apis_catalogues(request: SparqlQueryRequest):
    return JSONResponse(
        {
            "result": [
                {
                    "UDF_Name": "getDogBreedInfo",
                    "URI": "http://localhost:5050/KGNet/getDogBreedInfo/",
                    "parameters": "img_url: url of dog image",
                    "Description": "get breed name of a dog from its image",
                },
                {
                    "UDF_Name": "getDogSimilarTo",
                    "URI": "http://localhost:5050/KGNet/getDogSimilarTo",
                    "parameters": "img_url: dog image url",
                    "Description": "get dogs similar to input dog image",
                },
            ]
        }
    )


@sparql_router.post("/createCustomUsecase")
async def create_custom_use_case(
    file: Optional[UploadFile] = File(None),
    ttlFile: Optional[UploadFile] = File(None),
    ttlFileUri: Optional[str] = Form(None),
    fileUri: Optional[str] = Form(None),
    name: str = Form(...),
    EmbeddingEndpoint: str = Form(...),
):
    # NOTE: Create custom use case
    return format_response(message="Use-case Created")
