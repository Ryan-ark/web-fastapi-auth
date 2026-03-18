from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from backend.app.models.product import Product


class ProductRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(
        self,
        *,
        page: int,
        page_size: int,
        search: str | None = None,
    ) -> tuple[list[Product], int]:
        query = select(Product).order_by(Product.created_at.desc())
        count_query = select(func.count(Product.id))

        if search:
            pattern = f"%{search.strip()}%"
            query = query.where(Product.name.ilike(pattern))
            count_query = count_query.where(Product.name.ilike(pattern))

        total = self.db.scalar(count_query) or 0
        items = self.db.scalars(
            query.offset((page - 1) * page_size).limit(page_size)
        ).all()
        return items, total

    def get_by_id(self, product_id: UUID) -> Product | None:
        return self.db.get(Product, product_id)

    def create(self, product: Product) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def update(self, product: Product) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def delete(self, product: Product) -> None:
        self.db.delete(product)
        self.db.commit()
