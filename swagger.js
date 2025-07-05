import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Movie Review API',
    description: 'Ithu movie Review OOda APIS irrukum',
  },
  host: 'localhost:5006',
  schemes: ['http'], 
  tags: [
    { name: 'User', description: 'User-related APIs' },
    { name: 'Admin', description: 'Admin APIs' },
    { name: 'Movie', description: 'Movie-related APIs' },
  ],
};

const outputFile = './swagger-output.json';       
const endpointsFiles = ['./index.js'];




const swaggerAutogenInstance = swaggerAutogen();

swaggerAutogenInstance(outputFile, endpointsFiles, doc);
