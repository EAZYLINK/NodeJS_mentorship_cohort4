import express from 'express'
import dotenv from 'dotenv'
import { accountRoutes } from './routes/account.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to our Note API"
    })
})

app.use('/accounts', accountRoutes)




app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}...`)
})