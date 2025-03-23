import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js'
import { authorRouter } from './routes/author.routes.js'
import { bookRouter } from './routes/book.routes.js'

export const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/author', authorRouter)
app.use('/api/book', bookRouter)
