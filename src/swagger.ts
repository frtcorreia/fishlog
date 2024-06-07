import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FishLog API",
      version: "1.0.0",
      description: "Descrição da sua API",
    },
    tags: [
      {
        name: "User",
        description: "Endpoints related to user operations",
      },
      {
        name: "Auth",
        description: "Endpoints related to authentication",
      },
      {
        name: "Capture",
        description: "Endpoints related to capture operations",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "FishLog API",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho para os arquivos de rotas onde você documentará sua API
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
