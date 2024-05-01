//src/route/public-api.js
import express from "express";
import userController from "../controller/user-controller.js";
import contohController from "../controller/contoh-controller.js";


const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

//contoh post alur public api
publicRouter.post('/api/contoh/public', contohController.contoh);

export {
  publicRouter
}