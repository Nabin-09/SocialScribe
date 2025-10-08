import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiConfig {
  constructor() {
    this.client = null;
    this.models = [
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-2.5-pro',
      'models/gemini-2.5-flash'
    ];
  }

  initialize() {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not found in environment variables');
      }

      this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      console.log('✅ Gemini AI client initialized');
      return this.client;
    } catch (error) {
      console.error('❌ Gemini AI initialization failed:', error.message);
      throw error;
    }
  }

  async getWorkingModel() {
    if (!this.client) {
      this.initialize();
    }

    for (const modelName of this.models) {
      try {
        console.log(`⏳ Testing model: ${modelName}`);
        const model = this.client.getGenerativeModel({ model: modelName });
        
        // Test with simple prompt
        await model.generateContent('Hello');
        
        console.log(`✅ Using model: ${modelName}`);
        return { model, modelName };
      } catch (error) {
        console.log(`❌ Model ${modelName} unavailable:`, error.message);
        continue;
      }
    }

    throw new Error('No available Gemini model found');
  }

  getClient() {
    if (!this.client) {
      this.initialize();
    }
    return this.client;
  }
}

export default new GeminiConfig();
