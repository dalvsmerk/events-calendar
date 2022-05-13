import Koa, { Context } from 'koa';
import { config } from './config'; 
import { init } from './lib/init';

const app = new Koa();

init(app);

const server = app.listen(config.server.port);

app.on('error', (err: Error) => {
    console.error(err);

    process.exit(1);
});

const shutdown = () => {
    console.log('\nShutting down server');
    server.close();
    process.exit(0);
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);

console.info('Server listening to ' + config.server.port);
