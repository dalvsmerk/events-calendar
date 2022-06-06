# REST API for calendar service

Based on [a test task found on Github](https://github.com/fs/test-tasks/tree/master/ruby#%D0%B2%D1%82%D0%BE%D1%80%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5).

## Requirements

- Node >= 16
- Uses `sqlite3`

## Dependencies

- `typescript`
- `koa`
- `knex`

## Development

```shell
npm ci
npm run migrate
npm run watch
```

## Public endpoints

No authentication is required.

### `POST /api/v1/user`

Register new user.

| Body parameter | Type   | Required |
| -------------- | ------ | -------- |
| email          | string | true     |
| password       | string | true     |

Request:
```json
{
    "email": "stepan.bandera@peremoga.ua",
    "password": "putinposhelnahui666"
}
```
Response:
```json
{
    "success": true,
    "data": {
        "id": "d739d9c0-a6a2-4096-8fb6-e113f2866355",
        "email": "stepan.bandera@peremoga.ua"
    }
}
```

### `POST /api/v1/token`

Obtain authentication token.

| Body parameter | Type   | Required |
| -------------- | ------ | -------- |
| email          | string | true     |
| password       | string | true     |

Request:
```json
{
    "email": "stepan.bandera@peremoga.ua",
    "password": "putinposhelnahui666"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
}
```

## Protected endpoints

Bearer authentication is required.

### `GET /api/v1/calendars`

List calendars.

Response:
```json
{
    "success": true,
    "data": [
        {
            "id": "9d5ac1db-d2c6-4cc0-8c22-4a1900bf621b",
            "name": "stepan.bandera@peremoga.ua calendar",
            "color": "#c2e1c2",
            "owner_id": "a687565b-bdfd-43fc-93ff-777663a23ab3"
        }
    ]
}
```

### `GET /api/v1/events`

List events by date interval.

| Query parameter | Type   | Required |
| --------------- | ------ | -------- |
| from            | string | true     |
| to              | string | true     |

Response:
```json
{
    "success": true,
    "data": [
        {
            "id": "fa565e8c-146b-4ed5-bf14-c9a120c568a9",
            "name": "My Calendar",
            "start_date": "2022-06-01T13:00:00.000Z",
            "end_date": "2022-06-02T13:00:00.000Z",
            "calendar_id": "9d5ac1db-d2c6-4cc0-8c22-4a1900bf621b"
        }
    ]
}
```

### `POST /api/v1/calendars/:calendar_id/event`

Create calendar event.

| Body parameter | Type   | Required |
| -------------- | ------ | -------- |
| name           | string | true     |
| start_date     | string | true     |
| end_date       | string | true     |

Request:
```json
{
    "name": "Meeting",
    "start_date": "2022-06-05T13:00:00.000Z",
    "end_date": "2022-06-05T14:00:00.000Z"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "id": "c3270065-3bb9-405d-ba2a-5403d97836dc",
        "name": "Meeting",
        "start_date": "2022-06-05T13:00:00.000Z",
        "end_date": "2022-06-05T14:00:00.000Z",
        "calendar_id": "211048f7-cec2-4739-b392-e383c2357ef7",
        "owner_id": "ef4bcef1-b3bf-421a-bab5-5e1d1e51a0ec"
    }
}
```

### `PATCH /api/v1/events/:event_id`

Update calendar event. Request must not be empty.

| Body parameter | Type   | Required |
| -------------- | ------ | -------- |
| name           | string | false    |
| start_date     | string | false    |
| end_date       | string | false    |

Request:
```json
{
    "name": "Meeting",
    "start_date": "2022-06-05T13:00:00.000Z",
    "end_date": "2022-06-05T14:00:00.000Z"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "id": "c3270065-3bb9-405d-ba2a-5403d97836dc",
        "name": "Meeting",
        "start_date": "2022-06-05T13:00:00.000Z",
        "end_date": "2022-06-05T14:00:00.000Z",
        "calendar_id": "211048f7-cec2-4739-b392-e383c2357ef7",
        "owner_id": "ef4bcef1-b3bf-421a-bab5-5e1d1e51a0ec"
    }
}
```
