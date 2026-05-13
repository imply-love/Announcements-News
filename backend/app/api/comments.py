from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Comment, UserRole
from app.schemas.schemas import CommentCreate, CommentOut
from app.services.permission import get_current_user

router = APIRouter(prefix="/comments", tags=["comments"])

@router.get("/post/{post_id}", response_model=List[CommentOut])
def get_post_comments(post_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # 游客不可查看回复，由于使用了 get_current_user，未登录用户会自动返回 401
    return db.query(Comment).filter(Comment.post_id == post_id).order_by(Comment.created_at.asc()).all()

@router.post("/", response_model=CommentOut)
def create_comment(comment_in: CommentCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    new_comment = Comment(
        content=comment_in.content,
        post_id=comment_in.post_id,
        user_id=current_user.id,
        is_anonymous=getattr(comment_in, 'is_anonymous', False)
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@router.delete("/{comment_id}")
def delete_comment(comment_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # 管理员或评论者可删
    if current_user.role != UserRole.admin and comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this comment")
    
    db.delete(comment)
    db.commit()
    return {"detail": "Comment deleted successfully"}
