import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation generated by swagger-jsdoc',
    },
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
