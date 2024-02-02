import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routers/auth.router.js'
import taskRoutes from './routers/task.router.js'
// import { task } from './controllers/task.controller.js'

const app = express()

app.get('/ping', (req,res) => res.send('pong'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api",authRoutes)
app.use("/api",taskRoutes)
export default app