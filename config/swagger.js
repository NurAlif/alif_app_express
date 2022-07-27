export const swg_options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Alif's Backend App API Documentation",
        version: "0.1.0",
        description:
          "If You run into any problem feel free to contact me:",
        
        contact: {
          name: "Alif",
          email: "nuralif.2020@student.uny.ac.id", 
          phone: "+6281217304001"
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./routes/movies.js","./routes/users.js"],
  };