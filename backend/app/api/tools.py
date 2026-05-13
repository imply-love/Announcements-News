from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Tool, UserRole
from app.schemas.schemas import ToolCreate, ToolOut
from app.services.permission import check_admin

router = APIRouter(prefix="/tools", tags=["tools"])

@router.get("/", response_model=List[ToolOut])
def get_tools(db: Session = Depends(get_db)):
    # 所有人可见（包括游客）
    return db.query(Tool).all()

@router.post("/", response_model=ToolOut)
def upload_tool(tool_in: ToolCreate, admin=Depends(check_admin), db: Session = Depends(get_db)):
    # 仅管理员可发布
    new_tool = Tool(
        name=tool_in.name,
        description=tool_in.description,
        download_url=tool_in.download_url,
        uploader_id=admin.id
    )
    db.add(new_tool)
    db.commit()
    db.refresh(new_tool)
    return new_tool
