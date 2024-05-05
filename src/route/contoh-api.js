//src/route/contoh-api.js
import express from "express";
import { contohMiddleware } from "../middleware/contoh-middleware.js";
import contohController from "../controller/contoh-controller.js";


const contohRouter = new express.Router();
contohRouter.use(contohMiddleware);

// contoh API
contohRouter.get('/api/contoh/current', contohController.getContoh);

export {
  contohRouter
}
