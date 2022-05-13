import { Server } from '@hapi/hapi';
// import getUser from './lib/public/user/controllers/get-user';
import postUser from './lib/public/user/controllers/post-user';
// import putUser from './lib/public/user/controllers/put-user';

export const api = {
    name: 'api',
    version: '0.1.0',
    register: async (server: Server) => {
        server.route([postUser]);
    },
};
