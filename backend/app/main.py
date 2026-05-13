from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from app.api import auth, posts, comments, tools
from app.core.database import engine
from app.models.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campus Announcement System")

# --- 解决跨域问题 (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 允许所有来源访问，生产环境应改为具体域名
    allow_credentials=True,
    allow_methods=["*"], # 允许所有 HTTP 方法 (GET, POST, PUT, DELETE 等)
    allow_headers=["*"], # 允许所有请求头
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    print(f"Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        print(f"Completed request: {request.url} in {process_time:.2f}ms - Status: {response.status_code}")
        return response
    except Exception as e:
        print(f"CRITICAL ERROR during request: {str(e)}")
        raise e

app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(tools.router)

@app.get("/")
def root():
    return {"message": "Campus Announcement API is running"}
