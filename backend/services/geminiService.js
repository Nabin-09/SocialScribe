import geminiConfig from '../config/gemini.js';
import { PLATFORM_GUIDELINES } from '../utils/constants.js';
import logger from '../utils/logger.js';

class GeminiService {
  async generateContent(platform, tone, topic, constraints = '') {
    try {
      logger.info('Generating content', { platform, tone, topic });

      const { model, modelName } = await geminiConfig.getWorkingModel();

      const prompt = this.buildPrompt(platform, tone, topic, constraints);
      
      logger.debug('Prompt:', prompt);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      logger.success(`Generated ${generatedText.length} characters using ${modelName}`);

      return {
        text: generatedText,
        modelUsed: modelName,
      };
    } catch (error) {
      logger.error('Content generation failed:', error.message);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  buildPrompt(platform, tone, topic, constraints) {
    const guidelines = PLATFORM_GUIDELINES[platform] || '';

    return `You are a professional social media content creator. 

Generate a ${tone.toLowerCase()} social media post for ${platform} about:
"${topic}"

${constraints ? `Additional requirements: ${constraints}` : ''}

Guidelines for ${platform}:
${guidelines}

IMPORTANT: Write ONLY the post content. No explanations, quotes, or meta-commentary.`;
  }
}

export default new GeminiService();
