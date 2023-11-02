const express = require('express');
const dotenv = require('dotenv');
const router = require('./router');

dotenv.config();

const app = express();
const PORT = process.env.PORT
// app.get('/', (req, res)=>{
//     res.json({
//         success: true,
//         message: "Welcome to my first API!"
//     })
// })

// app.get('/user/:name', (req, res)=>{
//     res.json({
//         success: true,
//         message: `Welcome back ${req.params.name}!`
//     })
// })

app.use('/', router);
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})