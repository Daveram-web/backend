import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './router/user.router.js'
import adminRoute from './router/admin.router.js'
import movieRouter from './router/movieRoutes.js'
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'

const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));

dotenv.config()

const app = express()
const PORT  = process.env.PORT
app.use("/uploads",express.static("uploads"))

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/user",userRouter)
app.use("/admin",adminRoute)
app.use("/movie",movieRouter)



app.listen(PORT,()=>{
    console.log(`Server is on port  http://localhost:${PORT}`);
    
})



// import express from 'express';
// import fs from 'fs';
// import cors from 'cors'
// import swaggerUi from 'swagger-ui-express';
// import userRouter from './router/user.router.js';
// import adminRoute from './router/admin.router.js';
// import movieRouter from './router/movieRoutes.js';

// const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
// const app = express();
// const PORT = process.env.PORT ;

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.use(express.json());
// app.use(cors())

// app.use("/user", userRouter);
// app.use("/admin", adminRoute);
// app.use("/movie", movieRouter);

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//   console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
// });
