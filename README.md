# REST API for calendar service

Based on [a test task found on Github](https://github.com/fs/test-tasks/tree/master/ruby#%D0%B2%D1%82%D0%BE%D1%80%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5).

## Requirements

- Node >= 16
- Uses `sqlite3`

## Dependencies

- `typescript`
- `knex`
- `hapi`

## Development

```shell
npm i
npx knex migrate:latest
npm start
```

## Public endpoints

### `POST /token`

Obtain authentication token.

| Parameter | Type   | Required |
| --------- | ----   | -------- |
| email     | string | true     |
| password  | string | true     |

Request:
```
{
    "email": "stepan.bandera@peremoga.ua",
    "password": "putinposhelnahui666"
}
```

Response:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### `POST /user`

Register new user.

| Parameter | Type   | Required |
| --------- | ----   | -------- |
| email     | string | true     |
| password  | string | true     |

Request:
```
{
    "email": "stepan.bandera@peremoga.ua",
    "password": "putinposhelnahui666"
}
```
Response:
```
{
    "id": "d739d9c0-a6a2-4096-8fb6-e113f2866355",
    "email": "stepan.bandera@peremoga.ua"
}
```
