import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import winston from 'winston';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true } // Not sure what is this
}));

app.listen(3000, ()=>{
    console.log("Server is listening on 3000");
});