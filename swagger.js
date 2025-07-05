import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Movie Review API',
    description: 'Automatically generated Swagger doc',
  },
  host: 'localhost:5006',
  schemes: ['http'], 
  tags: [
    { name: 'User', description: 'User-related APIs' },
    { name: 'Admin', description: 'Admin APIs' },
    { name: 'movie', description: 'Movie-related APIs' },
  ],
};

const outputFile = './swagger-output.json';       
const endpointsFiles = ['./index.js'];              

const swaggerAutogenInstance = swaggerAutogen();

swaggerAutogenInstance(outputFile, endpointsFiles, doc);
