from utils import format_response
import uvicorn
from fastapi import FastAPI

from api.companies import companies_router
from api.dog_breeds import dog_breeds_router
from api.sparql_query import sparql_router
from api.udf import udf_router
from api.virtuoso_server import virtuoso_server_router


def attach_routes(app: FastAPI):
    app.include_router(companies_router)
    app.include_router(dog_breeds_router)
    app.include_router(sparql_router)
    app.include_router(udf_router)
    app.include_router(virtuoso_server_router)


def create_app():

    app = FastAPI()
    attach_routes(app)

    @app.get("/")
    def hello_world():
        return format_response(message="Hello, World")

    return app


if __name__ == "__main__":
    app = create_app()
    uvicorn.run(app, host="0.0.0.0", port=5050)
