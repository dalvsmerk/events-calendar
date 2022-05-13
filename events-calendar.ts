import Hapi from '@hapi/hapi';
import { api } from './api';
import { config } from './config';

const init = async () => {
    const server = Hapi.server({
        port: config.server.port,
        host: 'localhost',
    });

    await server.register(api, {
        routes: {
            prefix: '/api',
        },
    });

    await server.start();

    console.log('Server running on ', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);

    process.exit(1);
});

init();
