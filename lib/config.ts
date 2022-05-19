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
};
