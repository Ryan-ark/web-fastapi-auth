from fastapi.testclient import TestClient


def login(client: TestClient, *, email: str, password: str) -> None:
    response = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200


def test_viewer_cannot_mutate_products(client: TestClient, create_user) -> None:
    create_user(
        email="viewer@example.com",
        full_name="Viewer User",
        password="ChangeMe123!",
        role="viewer",
    )

    login(client, email="viewer@example.com", password="ChangeMe123!")
    response = client.post(
        "/api/v1/products",
        json={
            "name": "Desk Lamp",
            "description": "Warm ambient light for a home office.",
            "price": "49.99",
            "is_active": True,
        },
    )

    assert response.status_code == 403


def test_manager_can_mutate_products(client: TestClient, create_user) -> None:
    create_user(
        email="manager@example.com",
        full_name="Manager User",
        password="ChangeMe123!",
        role="manager",
    )

    login(client, email="manager@example.com", password="ChangeMe123!")
    response = client.post(
        "/api/v1/products",
        json={
            "name": "Desk Lamp",
            "description": "Warm ambient light for a home office.",
            "price": "49.99",
            "is_active": True,
        },
    )

    assert response.status_code == 201


def test_admin_can_manage_users(client: TestClient, create_user) -> None:
    create_user(
        email="admin@example.com",
        full_name="Admin User",
        password="ChangeMe123!",
        role="admin",
    )

    login(client, email="admin@example.com", password="ChangeMe123!")
    list_response = client.get("/api/v1/users")
    assert list_response.status_code == 200

    create_response = client.post(
        "/api/v1/users",
        json={
            "email": "new@example.com",
            "full_name": "New User",
            "password": "ChangeMe123!",
            "role": "viewer",
            "is_active": True,
        },
    )
    assert create_response.status_code == 200


def test_non_admin_cannot_access_users(client: TestClient, create_user) -> None:
    create_user(
        email="manager@example.com",
        full_name="Manager User",
        password="ChangeMe123!",
        role="manager",
    )

    login(client, email="manager@example.com", password="ChangeMe123!")
    response = client.get("/api/v1/users")
    assert response.status_code == 403
