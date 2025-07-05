import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './router/user.router.js'
import adminRoute from './router/admin.router.js'
import movieRouter from './router/movieRoutes.js'

dotenv.config()

const app = express()
const PORT  = process.env.PORT
app.use("/uploads",express.static("uploads"))

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use("/user",userRouter)
app.use("/admin",adminRoute)
app.use("/movie",movieRouter)



app.listen(PORT,()=>{
    console.log(`Server is on port  http://localhost:${PORT}`);
    
})