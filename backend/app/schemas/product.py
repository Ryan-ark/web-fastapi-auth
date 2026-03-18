from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=1000)
    price: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=1000)
    price: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    is_active: bool = True


class ProductRead(ProductBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PaginatedProducts(BaseModel):
    items: list[ProductRead]
    total: int
    page: int
    page_size: int
