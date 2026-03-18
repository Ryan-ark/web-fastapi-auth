from decimal import Decimal

from fastapi.testclient import TestClient


def test_product_crud_flow(client: TestClient) -> None:
    create_response = client.post(
        "/api/v1/products",
        json={
            "name": "Desk Lamp",
            "description": "Warm ambient light for a home office.",
            "price": "49.99",
            "is_active": True,
        },
    )

    assert create_response.status_code == 201
    created_product = create_response.json()
    product_id = created_product["id"]

    list_response = client.get("/api/v1/products")
    assert list_response.status_code == 200
    list_payload = list_response.json()
    assert list_payload["total"] == 1
    assert list_payload["items"][0]["name"] == "Desk Lamp"

    detail_response = client.get(f"/api/v1/products/{product_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["price"] == "49.99"

    update_response = client.put(
        f"/api/v1/products/{product_id}",
        json={
            "name": "Desk Lamp Pro",
            "description": "Upgraded light with a dimmer.",
            "price": "59.99",
            "is_active": False,
        },
    )
    assert update_response.status_code == 200
    assert Decimal(update_response.json()["price"]) == Decimal("59.99")
    assert update_response.json()["is_active"] is False

    delete_response = client.delete(f"/api/v1/products/{product_id}")
    assert delete_response.status_code == 204

    final_list_response = client.get("/api/v1/products")
    assert final_list_response.status_code == 200
    assert final_list_response.json()["total"] == 0
