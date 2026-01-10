import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';


const app = express();//app instance

//middlewares
//cors setup
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
// }))

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['set-cookie'],
// }))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
    maxAge:  86400, // Cache preflight for 24 hours
};


app.use(cors(corsOptions));

app.use(express.json({
    limit: '50mb'
}))

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
}))

app.use(cookieParser())

app.use(express.static('public'))
app.use((req, _, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})


//routes
import { userRouter } from './routes/user.routes.js';
import { authRouter } from './routes/auth.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);



//error handler for 404 route not found
app.use((req, res, next) => {
    console.warn(`404 Not Found: ${req.method} ${req.url}`)
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})//next() not called as this is a terminal middleware for handling 404 errors

//global error handler
app.use(errorHandler);


export default app;