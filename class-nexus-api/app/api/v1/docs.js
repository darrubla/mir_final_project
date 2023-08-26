export const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "Class Nexus API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.API_URL}/v1`,
    },
  ],
};
