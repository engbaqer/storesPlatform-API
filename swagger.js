import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stores Platform API",
      version: "1.0.0",
      description: "API documentation for the Stores Platform project",
    },
    servers: [
      {
        url: "http://localhost:3000", // adjust if your port changes
      },
    ],
  },
  apis: ["./Routes/*.js"], // points to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
