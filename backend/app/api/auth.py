from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.models import User, UserRole
from app.schemas.schemas import UserCreate, UserOut, Token
from app.services.permission import get_current_user

router = APIRouter(prefix="/auth", tags=["authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.get("/me", response_model=UserOut)
def get_current_user_info(user: User = Depends(get_current_user)):
    return user

@router.post("/register", response_model=UserOut)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_in.username).first()
    if user:
        raise HTTPException(status_code=400, detail="用户名已被注册")
    
    hashed_pw = get_password_hash(user_in.password)
    new_user = User(username=user_in.username, password_hash=hashed_pw, role=UserRole.user)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="用户不存在")
    
    import hashlib
    plain_hashed = hashlib.sha256(req.password.encode()).hexdigest()
    
    if user.password_hash == plain_hashed or verify_password(req.password, user.password_hash):
        access_token = create_access_token(data={"sub": user.username})
        return Token(access_token=access_token, token_type="bearer")
    
    raise HTTPException(status_code=400, detail="用户名或密码错误")
