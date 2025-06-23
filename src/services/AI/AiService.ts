import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

export default class AiService {
    private genAI: GoogleGenerativeAI;
    private preview: string = "Quero que você forneça apenas informações sobre leads, formulários e captação de leads. Vamos ajudar o usuário a criar o melhor formulário possível para captar leads de acordo com as necessidades que ele informar na mensagem a seguir: ";
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
    }

    public async sendModel(input: string) {
        const model = await this.genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(this.preview + ' - ' + input);

        const response = await result.response;
        const text = response.text();
        console.log(text);
    }
}