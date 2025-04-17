from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean,ForeignKey,Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped [str] = mapped_column(nullable=False)
    image_Url: Mapped [str]= mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False,default=True)
    services: Mapped [List["Services"]]= relationship(back_populates="user")
    ratings: Mapped [List["Rating_cliente"]]= relationship(back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

class Services(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped [str] = mapped_column(nullable=False)
    description: Mapped [str] = mapped_column(nullable=False)
    time: Mapped [str] = mapped_column(nullable=False)
    category_id: Mapped [int] = mapped_column(ForeignKey("category.id"))
    price: Mapped [str] = mapped_column(nullable=False)
    user_id: Mapped [int]=mapped_column(ForeignKey("user.id"))
    category: Mapped ["Category"]= relationship(back_populates="services")
    user: Mapped ["User"]= relationship(back_populates="services")

    def __repr__(self):
        return f'<Services {self.name}>'

class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    category: Mapped[str] = mapped_column(nullable=False)
    services: Mapped [List["Services"]]= relationship(back_populates="category")

    def __repr__(self):
        return f'<Category {self.category}>'

class Rating_cliente(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    rating: Mapped[int]= mapped_column(nullable=True)
    user_id: Mapped [int]=mapped_column(ForeignKey("user.id"))
    user: Mapped ["User"]= relationship(back_populates="ratings")

    def __repr__(self):
        return f'<Rating_cliente {self.rating}>'

    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }