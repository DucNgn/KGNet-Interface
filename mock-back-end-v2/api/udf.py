from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import JSONResponse

udf_router = APIRouter(
    prefix="/KGNet",
    tags=["udf"],
    responses={"404": {"description": "Not found"}},
)


class SearchRequest(BaseModel):
    query: str


@udf_router.post("/searchUDFsCatalogue")
def search_catalogue(request: SearchRequest):
    # NOTE: Search here
    return JSONResponse(
        {
            "result": [
                {
                    "UDF_Name": "getNormalizedValue",
                    "parameters": "obj1:STRING,emb_method: STRING",
                    "Description": "get normalized value od differnace between two vectors",
                },
                {
                    "UDF_Name": "getHttpResponse",
                    "parameters": "url: STRING",
                    "Description": "make http get request call and return response",
                },
                {
                    "UDF_Name": "getSimilarityScore",
                    "parameters": "obj1: STRING, obj2:STRING, emb_method:STRING",
                    "Description": "get cosine similarity score between two vectors represented as string",
                },
                {
                    "UDF_Name": "getGloveSimilarity",
                    "parameters": "word1: STRING,word2: STRING",
                    "Description": "get Glove embedding Cosine similarity between two words",
                },
                {
                    "UDF_Name": "getFaceNetSimilarity",
                    "parameters": "url1:STRING,url2:STRING",
                    "Description": "get FaceNet embedding Model cosine similarity between two images",
                },
                {
                    "UDF_Name": "getCompanySimilarity",
                    "parameters": "comp1:STRING,comp2:STRING,emb_model:STRING i.e DistMult",
                    "Description": "get cosine similarity between two companies from Forbes2013 dataset",
                },
                {
                    "UDF_Name": "getDOHAttackSimilarityScore",
                    "parameters": "ip1:STRING,ip2:STRING,emb_model:STRING",
                    "Description": "get cosine similarity score between two attacks ",
                },
                {
                    "UDF_Name": "get_doPostJson",
                    "parameters": "url:STRING,json_body:STRING",
                    "Description": "make http dopost request call and return response",
                },
                {
                    "UDF_Name": "getDogSimilarityScore",
                    "parameters": "img_url1:STRING,img_url2:STRING",
                    "Description": "get cosine similarity score between two dogs breeds using dogs images",
                },
                {
                    "UDF_Name": "getSimilarityScore",
                    "parameters": "X: features vector X as String,Y: feature vector Y as String",
                    "Description": "calculate cosine similarity between two vectors",
                },
            ]
        }
    )
