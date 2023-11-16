import { connect } from 'mongoose'
import APIError from '../utils/apiError.js'

export const connectDB = async(url) =>{
    // try {
        await connect(url)
        console.log('Connection to Database Successful!')
    // } catch (error) {
    //     return APIError.customeError("Error connecting to database");
    // }
}