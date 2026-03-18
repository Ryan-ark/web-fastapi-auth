from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.app.models.product import Product
from backend.app.repositories.product_repository import ProductRepository
from backend.app.schemas.product import PaginatedProducts, ProductCreate, ProductRead, ProductUpdate


class ProductService:
    def __init__(self, db: Session) -> None:
        self.repository = ProductRepository(db)

    def list_products(
        self,
        *,
        page: int,
        page_size: int,
        search: str | None,
    ) -> PaginatedProducts:
        items, total = self.repository.list(page=page, page_size=page_size, search=search)
        return PaginatedProducts(
            items=[ProductRead.model_validate(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
        )

    def get_product(self, product_id: UUID) -> ProductRead:
        product = self.repository.get_by_id(product_id)
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
        return ProductRead.model_validate(product)

    def create_product(self, payload: ProductCreate) -> ProductRead:
        product = Product(**payload.model_dump())
        created = self.repository.create(product)
        return ProductRead.model_validate(created)

    def update_product(self, product_id: UUID, payload: ProductUpdate) -> ProductRead:
        product = self.repository.get_by_id(product_id)
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

        for field, value in payload.model_dump().items():
            setattr(product, field, value)

        updated = self.repository.update(product)
        return ProductRead.model_validate(updated)

    def delete_product(self, product_id: UUID) -> None:
        product = self.repository.get_by_id(product_id)
        if product is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")
        self.repository.delete(product)
