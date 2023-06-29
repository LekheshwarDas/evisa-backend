import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

const router = express.Router();
router.use(express.json());
dotenv.config();

const configuration = new Configuration({
    apiKey: `${process.env.OPEN_AI_KEY}`,
});
const openai = new OpenAIApi(configuration);

// Define the endpoint to handle chatbot requests
router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        // Make a request to the OpenAI API
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        // Extract the generated chatbot response
        const reply = response.data.choices[0].text.trim();
        // Send the reply back as the response
        res.json({ reply });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as contactRoute }
