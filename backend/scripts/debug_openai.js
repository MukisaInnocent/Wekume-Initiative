require('dotenv').config();
const OpenAI = require('openai');

async function testOpenAI() {
    console.log('🔍 Testing OpenAI Configuration...');

    // Check API Key existence
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ ERROR: OPENAI_API_KEY is missing in .env file');
        return;
    }

    console.log('✅ API Key found (starts with: ' + process.env.OPENAI_API_KEY.substring(0, 7) + '...)');

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        console.log('📡 Sending test request to OpenAI...');

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use cheaper model for test
            messages: [{ role: "user", content: "Hello, can you hear me?" }],
            max_tokens: 10
        });

        console.log('✅ SUCCESS! OpenAI responded:');
        console.log('   "' + response.choices[0].message.content + '"');

    } catch (error) {
        console.error('❌ CONNECTION FAILED:');
        console.error('   Type: ' + error.constructor.name);
        console.error('   Message: ' + error.message);

        if (error.status === 401) {
            console.error('   👉 Cause: Invalid API Key. Please check your key.');
        } else if (error.status === 429) {
            console.error('   👉 Cause: Rate limit exceeded or insufficient quota (check billing).');
        }
    }
}

testOpenAI();
