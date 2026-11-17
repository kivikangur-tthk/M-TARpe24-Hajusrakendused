import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
    info: {
        title: "My Games API",
        description: "Description",
        version: "1.0.0"
    },
    host: process.env.HOST+':'+process.env.PORT,
    tags: [{name: 'Games'}, {name: 'Users'}]
};

const outputFile = '../docs/swagger-autogen.json';
const routes = ['../routes/appRoutes.ts']
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);