# REST API for calendar events service

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
