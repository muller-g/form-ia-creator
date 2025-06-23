import { Request, Response } from 'express';
import app from '../../server';
import logger from "../../../services/WinstonLogger";
import AiService from '../../../services/AI/AiService';

export default class FormController {
    constructor() {
        this.initializeRoutes();
    }

    private async initializeRoutes() {
        logger.info("Test routes start");
        
        app.post("/create-form", async (req: Request, res: Response) => {
            try {
                console.log("aqqq")
                const { userMsg } = req.body;
                let aiInstance = new AiService();

                await aiInstance.sendModel(userMsg)
                            
                return res.status(200).json("Test route is working");
            } catch (e){
                return res.status(500).json("Error");
            }
            
        });
    }
}