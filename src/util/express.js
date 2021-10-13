const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const routes = require('../routes');
const app = express();

const port = process.env.PORT || 3000;

module.exports.startExpress = () => {

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Little Links',
                version: '1.0',
                description: 'URL Shortener',
                contact: {
                    name: 'Max Rochefort-Shugar',
                    email: 'maxshugar@hotmail.co.uk'
                }
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development'
                }
            ],
        },
        apis: ['./src/routes/**/*.js']
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    app.use(cors({
		origin: true,
		credentials: true
	}));

    app.use(
        `/api/docs`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs)
    );
    app.use(express.json());
    app.use(routes);

    app.listen(port, () => {
        console.log(`Express server listening on port ${port}`);
    });

    return app;
}



