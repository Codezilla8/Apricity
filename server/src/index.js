import dotenv from 'dotenv';
import app from './app.js';
import dbConnect from './config/dbConnect.js';
import { createServer } from "http";
import { initializeSocket } from './socket/socket.js';

dotenv.config({
    path: './.env',
})

const httpServer = createServer(app);
initializeSocket(httpServer);

dbConnect()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })    
})
.catch((err) => {
    console.log("Error in connecting to database: ",err);
    throw err;
});

