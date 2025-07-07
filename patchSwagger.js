// patchSwagger.js
import fs from 'fs';

const swagger = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));

for (const path in swagger.paths) {
  const methods = swagger.paths[path];
  if (methods.post) {
    methods.post.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            additionalProperties: true,  
            example: {
              key: "value"
            }
          }
        }
      }
    };
  }
}

fs.writeFileSync('./swagger-output.json', JSON.stringify(swagger, null, 2));
console.log("✅ Patched POST endpoints to allow any JSON body.");
