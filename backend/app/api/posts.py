from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.core.database import get_db
from app.models.models import Post, PostType, UserRole
from app.schemas.schemas import PostCreate, PostOut
from app.services.permission import get_current_user, check_admin

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get("/", response_model=List[PostOut])
def get_posts(type: Optional[PostType] = None, db: Session = Depends(get_db)):
    query = db.query(Post)
    if type:
        query = query.filter(Post.type == type)
    return query.order_by(Post.is_pinned.desc(), Post.created_at.desc()).all()

@router.post("/", response_model=PostOut)
def create_post(post_in: PostCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # 权限检查：公告栏仅限管理员发帖
    if post_in.type == PostType.announcement and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Only administrators can post announcements")
    
    new_post = Post(
        content=post_in.content,
        type=post_in.type,
        is_anonymous=post_in.is_anonymous,
        user_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.delete("/{post_id}")
def delete_post(post_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # 权限检查：管理员可删任何帖，用户仅可删自己的帖
    if current_user.role != UserRole.admin and post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    
    db.delete(post)
    db.commit()
    return {"detail": "Post deleted successfully"}
