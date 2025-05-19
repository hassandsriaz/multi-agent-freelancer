import pytest
from unittest.mock import patch
from core.tools.upwork_api.client import UpworkAPIClient

def test_get_authorization_url():
    client = UpworkAPIClient()
    with patch.object(client, 'get_authorization_url', return_value=("http://example.com/auth", "state")):
        url, state = client.get_authorization_url()
        assert url == "http://example.com/auth"
        assert state == "state"

def test_store_token():
    client = UpworkAPIClient()
    with patch("psycopg2.connect") as mock_connect:
        mock_cursor = mock_connect.return_value.cursor.return_value
        client.store_token("access_token", "refresh_token", 3600)
        mock_cursor.execute.assert_called_once()

def test_get_valid_token():
    client = UpworkAPIClient()
    with patch("psycopg2.connect") as mock_connect:
        mock_cursor = mock_connect.return_value.cursor.return_value
        mock_cursor.fetchone.return_value = {
            "access_token": "valid_token",
            "refresh_token": "refresh_token",
            "expires_at": "2099-01-01T00:00:00"
        }
        token = client.get_valid_token()
        assert token == "valid_token"