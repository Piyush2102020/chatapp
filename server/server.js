// Do the imports
const { connectDb } = require('./db/db');
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config()

app.use(cors({ origin: "*" })); //CORS policy
app.use(express.json()); //Json parse middleware
app.use(routes);

const startServer = async () => {
    // Start the server
    const isConnected = await connectDb();
    if (isConnected) {
        app.listen(process.env.PORT, () => {
            console.log("Server Succesfully Started");
        });
    }
    else {
        console.log("Enable to start server");
        process.exit(1);
    }
}


startServer();