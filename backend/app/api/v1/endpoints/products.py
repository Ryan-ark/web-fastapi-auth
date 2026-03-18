from uuid import UUID

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_db
from backend.app.schemas.product import PaginatedProducts, ProductCreate, ProductRead, ProductUpdate
from backend.app.services.product_service import ProductService


router = APIRouter(prefix="/products", tags=["products"])


def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    return ProductService(db)


@router.get("", response_model=PaginatedProducts)
def list_products(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    search: str | None = Query(default=None, min_length=1, max_length=120),
    service: ProductService = Depends(get_product_service),
) -> PaginatedProducts:
    return service.list_products(page=page, page_size=page_size, search=search)


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    service: ProductService = Depends(get_product_service),
) -> ProductRead:
    return service.create_product(payload)


@router.get("/{product_id}", response_model=ProductRead)
def get_product(
    product_id: UUID,
    service: ProductService = Depends(get_product_service),
) -> ProductRead:
    return service.get_product(product_id)


@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: UUID,
    payload: ProductUpdate,
    service: ProductService = Depends(get_product_service),
) -> ProductRead:
    return service.update_product(product_id, payload)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: UUID,
    service: ProductService = Depends(get_product_service),
) -> Response:
    service.delete_product(product_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
