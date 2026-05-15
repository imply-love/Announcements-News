from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.models import UserRole, PostType

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    role: UserRole
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class PostBase(BaseModel):
    content: str
    type: PostType
    is_anonymous: bool = False

class PostCreate(PostBase):
    pass

class PostOut(PostBase):
    id: int
    user_id: int
    is_pinned: bool
    created_at: datetime
    # author info will be handled in API to check is_anonymous
    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str
    is_anonymous: bool = False

class CommentCreate(CommentBase):
    post_id: int

class CommentOut(CommentBase):
    id: int
    post_id: int
    user_id: int
    parent_id: Optional[int]
    is_pinned: bool
    created_at: datetime
    class Config:
        from_attributes = True

class ToolBase(BaseModel):
    name: str
    description: Optional[str] = None
    download_url: str

class ToolCreate(ToolBase):
    pass

class ToolOut(ToolBase):
    id: int
    uploader_id: int
    created_at: datetime
    class Config:
        from_attributes = True
