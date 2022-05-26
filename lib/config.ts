export const config = {
    server: {
        port: Number(process.env.PORT || 8080),
    },
    env: process.env.NODE_ENV,
    database: {
        client: 'sqlite3',
        connection: () => ({
            filename: './dev.sqlite3',
        }),
        useNullAsDefault: true,
    },
    secret: {
        key: 'PUTIN HUILO',
        saltRounds: 4,
    },
    auth: {
        access_token: {
            ttl: 1000 * 60 * 60, // 1 hour
        },
    },
};
