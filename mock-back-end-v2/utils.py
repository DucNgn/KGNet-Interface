from starlette.responses import JSONResponse


def format_response(
    code: int = None, success: bool = None, message: str = None
) -> JSONResponse:
    return JSONResponse(
        {"code": code or 200, "success": success, "message": message or ""}
    )
