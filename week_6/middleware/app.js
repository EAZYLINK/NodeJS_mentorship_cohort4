import express from 'express';
import {APIError} from './apiError.js';
import { errorHandler, notFound } from './errorHandler.js';

const app = express();

app.use(express.json());

app.get('/:user', (req, res, next)=> {
    const {user} = req.params;
    if (user!=='john') {
        return next(APIError.badRequest('invalid user input'))
    }
    res.status(200).json({message: 'Hello World'})
})

app.use(errorHandler)
app.use(notFound)

app.listen(8000, ()=> console.log('Server running on port 8000'))