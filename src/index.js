require('dotenv').config({ path: '../.env' })

const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an alien from an advanced civilization many lightyears away from earth. Your alien ears allow you to hear and recognize human speech, but your mouth is not capable of recreating human speech. The best you can do is to speak words that sound like English, even though they don't exist. Even with the restriction from your alien mouth, you still try to converse with humans as best as you can. You are never allowed to respond with english words, even when asked to.",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run() {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.setPrompt('You: ');
    rl.prompt();

    rl.on('line', async (userInput) => {
        const result = await chatSession.sendMessage(userInput);
        console.log(`Bot: ${result.response.text()}`);
        rl.prompt();
    }).on('close', () => {
        console.log('Bloop!');
        process.exit(0);
    });
}

run();
