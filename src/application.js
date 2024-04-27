//src/application.js
//a. import library Framework express
import express from "express";
import { publicRouter } from "./route/public-api.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { userRouter } from "./route/api.js";

//b. membuat object app dari express function
export const app = express();

//e. Menjalankan Middleware app.use menangani data json
app.use(express.json());

//f. Membuat Rute >> app.get(Route, callback) >> (req,res) => {...}
//1. Contoh : Endpoint API : GET '/' ========================
app.get('/', (req, res) => {
  console.log('Hello World requested');
  res.send('Hello World!');
});

app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware)