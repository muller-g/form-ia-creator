import app from '../src/infra/server';
import FormController from './infra/http/api/FormController';
import logger from "./services/WinstonLogger";

new FormController();

app.listen(3001, () => {
    logger.info(`Express is listening at http://localhost:3001`);
});