const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to my first API!"
    })
})

router.get('/user/:name', (req, res)=>{
    res.json({
        success: true,
        message: `Welcome back ${req.params.name}!`
    })
})

module.exports = router;