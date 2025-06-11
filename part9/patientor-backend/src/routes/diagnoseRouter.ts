import express from "express";
import {getDiagnoses, getDiagnosesByCode} from "../services/diagnoseServices"; // Adjust path as needed
  
// import { Diagnose } from "../types";
const diagnoseRouter = express.Router();    

diagnoseRouter.post("/", (_req, res) => {
    res.send("diagnose");
    }
);

diagnoseRouter.get("/", (_req, res) => {
    const diagnose = getDiagnoses();
    res.send(diagnose);
    
});
 
diagnoseRouter.post('/codes', ((req, res) => {
    const { codes } = req.body as {codes?: string[]};   // type-safe cast
    if (!codes?.length) {
      res.status(400).json({ error: 'Missing codes' });
      return;                                  // handler now returns void
    }
    const list = Array.isArray(codes) ? codes : [codes];
    res.json(getDiagnosesByCode(list));        // still returns void
 }));


export default diagnoseRouter;
