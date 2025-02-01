import express from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import cors from 'cors'
import booksRoute from "./routes/booksRoute.js";
const app = express();
app.use(express.json())

// Middleware for handling CORS policy
// Option 1: Allow All Origin with Default of cors(*)

app.use(cors());

// Option 2: Allow Custom origin
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get("/", (req,res)=>{
    return res.status(234).send("welcome to our book store")
})

app.use('/books', booksRoute);

// establishing connection to mongodb URL using mongoose
mongoose.connect(mongoDBURL).then(()=>{
    console.log(`connected to mongo db`);
    app.listen(PORT, ()=>{
        console.log(`App is listening on ${PORT}`);
        
    })
})
.catch((e)=>{
    console.log(e);
})