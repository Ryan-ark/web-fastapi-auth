from fastapi.testclient import TestClient


def test_login_me_refresh_logout_flow(client: TestClient, create_user) -> None:
    create_user(
        email="admin@example.com",
        full_name="Admin User",
        password="ChangeMe123!",
        role="admin",
    )

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "admin@example.com", "password": "ChangeMe123!"},
    )

    assert login_response.status_code == 200
    assert login_response.json()["user"]["role"] == "admin"
    assert "access_token" in client.cookies
    assert "refresh_token" in client.cookies

    me_response = client.get("/api/v1/auth/me")
    assert me_response.status_code == 200
    assert me_response.json()["email"] == "admin@example.com"

    refresh_response = client.post("/api/v1/auth/refresh")
    assert refresh_response.status_code == 200
    assert refresh_response.json()["user"]["email"] == "admin@example.com"

    logout_response = client.post("/api/v1/auth/logout")
    assert logout_response.status_code == 204

    unauthorized_me = client.get("/api/v1/auth/me")
    assert unauthorized_me.status_code == 401


def test_invalid_login_returns_401(client: TestClient, create_user) -> None:
    create_user(
        email="viewer@example.com",
        full_name="Viewer User",
        password="ChangeMe123!",
        role="viewer",
    )

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "viewer@example.com", "password": "WrongPassword123!"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."
