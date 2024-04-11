export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Final Ecommerce",
      version: "1.0.0",
      description: "api de comercio online",
    },
    servers: [
      {
        url: "https://finalecommerce.onrender.com",
        // url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
