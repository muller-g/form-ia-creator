import express, { Application } from 'express';
import cors from 'cors';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: '*'
        }));
    }
}

export default new Server().app;